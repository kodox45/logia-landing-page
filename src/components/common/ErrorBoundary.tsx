import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 bg-brand-accent/10 border border-brand-accent/20 rounded-full flex items-center justify-center mx-auto">
              <span className="text-brand-accent text-2xl font-mono">!</span>
            </div>
            <h1 className="text-3xl font-serif text-white">System Interruption</h1>
            <p className="text-brand-gray font-light leading-relaxed">
              We've encountered an unexpected protocol error. Our agentic systems are already analyzing the logs.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-brand-accent text-white rounded-full text-sm font-semibold hover:bg-brand-accent/80 transition-all"
            >
              Restart Protocols
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
