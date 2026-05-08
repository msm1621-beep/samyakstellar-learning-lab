import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class WebGLBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL canvas failed to initialize:', error.message);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="w-full h-full min-h-[200px] flex items-center justify-center p-6 text-center">
            <div className="text-white/80 font-fredoka">
              🌌 3D view unavailable on this device.
              <br />
              <span className="text-sm text-white/50">
                Try a different browser or close other tabs to free GPU memory.
              </span>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

export default WebGLBoundary;
