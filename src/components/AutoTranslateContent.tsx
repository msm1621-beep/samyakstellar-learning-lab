import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { languages } from '@/data/translations';

const TRANSLATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/translate-text`;
const TRANSLATABLE_TEXT = /[A-Za-zÀ-ž\u0370-\u03FF\u0400-\u04FF\u0600-\u06FF\u0900-\u097F\u4E00-\u9FFF]/;
const EXCLUDED_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE']);

const getLanguageName = (code: string) => languages.find((lang) => lang.code === code)?.name ?? 'English';

const AutoTranslateContent = () => {
  const { language } = useLanguage();
  const originalTextRef = useRef(new WeakMap<Text, string>());
  const translationCacheRef = useRef(new Map<string, string>());
  const isApplyingRef = useRef(false);
  const isTranslatingRef = useRef(false);
  const pendingRerunRef = useRef(false);
  const debounceRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const collectTextNodes = () => {
      const nodes: Text[] = [];
      if (!document.body) return nodes;

      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node = walker.nextNode();

      while (node) {
        const textNode = node as Text;
        const parent = textNode.parentElement;
        const rawText = textNode.textContent ?? '';
        const text = rawText.trim();

        if (
          parent &&
          text.length > 1 &&
          TRANSLATABLE_TEXT.test(text) &&
          !EXCLUDED_TAGS.has(parent.tagName) &&
          !parent.closest('[data-no-auto-translate="true"]')
        ) {
          const style = window.getComputedStyle(parent);
          if (style.display !== 'none' && style.visibility !== 'hidden') {
            nodes.push(textNode);
          }
        }

        node = walker.nextNode();
      }

      return nodes;
    };

    const translateBatch = async (texts: string[], signal: AbortSignal) => {
      const response = await fetch(TRANSLATE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          texts,
          targetLanguage: language,
          targetLanguageName: getLanguageName(language),
        }),
        signal,
      });

      if (!response.ok) throw new Error('Translation request failed');
      const data = await response.json();
      return Array.isArray(data.translations) ? data.translations : texts;
    };

    const runTranslation = async () => {
      if (isTranslatingRef.current) {
        pendingRerunRef.current = true;
        return;
      }

      isTranslatingRef.current = true;

      try {
        const nodes = collectTextNodes();
        if (nodes.length === 0) return;

        if (language === 'en') {
          isApplyingRef.current = true;
          nodes.forEach((node) => {
            const original = originalTextRef.current.get(node);
            if (original) node.textContent = original;
          });
          requestAnimationFrame(() => {
            isApplyingRef.current = false;
          });
          return;
        }

        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        const missingTexts: string[] = [];
        const keyFor = (text: string) => `${language}::${text}`;

        nodes.forEach((node) => {
          const current = node.textContent ?? '';
          if (!originalTextRef.current.has(node)) {
            originalTextRef.current.set(node, current);
          }
          const original = originalTextRef.current.get(node) ?? current;
          if (!translationCacheRef.current.has(keyFor(original)) && !missingTexts.includes(original)) {
            missingTexts.push(original);
          }
        });

        const chunkSize = 40;
        for (let i = 0; i < missingTexts.length; i += chunkSize) {
          const chunk = missingTexts.slice(i, i + chunkSize);
          const translated = await translateBatch(chunk, controller.signal);
          chunk.forEach((source, index) => {
            translationCacheRef.current.set(keyFor(source), translated[index] ?? source);
          });
        }

        if (controller.signal.aborted) return;

        isApplyingRef.current = true;
        nodes.forEach((node) => {
          const original = originalTextRef.current.get(node);
          if (!original) return;
          const translated = translationCacheRef.current.get(keyFor(original));
          if (translated) node.textContent = translated;
        });
        requestAnimationFrame(() => {
          isApplyingRef.current = false;
        });
      } catch {
        // ignore abort/translation errors and keep existing content
      } finally {
        isTranslatingRef.current = false;

        if (pendingRerunRef.current) {
          pendingRerunRef.current = false;
          void runTranslation();
        }
      }
    };

    void runTranslation();

    const observer = new MutationObserver(() => {
      if (language === 'en' || isApplyingRef.current) return;
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        void runTranslation();
      }, 220);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
      abortRef.current?.abort();
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [language]);

  return null;
};

export default AutoTranslateContent;
