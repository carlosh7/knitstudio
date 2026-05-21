import { Component, type ReactNode, type ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  name: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class PanelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(`[ErrorBoundary:${this.props.name}]`, error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-900/20 border border-red-700/30 rounded-lg m-2">
          <div className="text-xs text-red-400 font-medium mb-1">Panel Error: {this.props.name}</div>
          <div className="text-xs text-red-300/70 mb-2">{this.state.error?.message}</div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-2 py-1 text-xs bg-red-700 text-white rounded hover:bg-red-600"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
