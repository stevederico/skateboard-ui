import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  componentDidMount() {
    // Handle unhandled promise rejections (async errors)
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.setState({
        hasError: true,
        error: new Error(`Async Error: ${event.reason?.message || String(event.reason)}`)
      });
    };

    // Handle errors in event handlers and other non-React contexts
    const handleError = (event) => {
      if (event.error && !(this.state.hasError)) {
        console.error('Global error:', event.error);
        this.setState({ hasError: true, error: event.error });
      }
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    this.unsubscribeRejection = () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
    this.unsubscribeError = () => {
      window.removeEventListener('error', handleError);
    };
  }

  componentWillUnmount() {
    if (this.unsubscribeRejection) this.unsubscribeRejection();
    if (this.unsubscribeError) this.unsubscribeError();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center w-full h-screen bg-background">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-4 break-words">{this.state.error?.message || 'Unknown error'}</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
