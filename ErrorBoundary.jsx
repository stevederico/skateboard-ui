import React from 'react';
import { Button } from './shadcn/ui/button.jsx';
import { Card, CardContent } from './shadcn/ui/card.jsx';

/**
 * Top-level error boundary that catches render errors, unhandled promise
 * rejections, and global errors.
 *
 * Displays a fallback UI with "Try Again" and "Reload Page" buttons.
 * Wrap your app root with this component.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to protect
 * @returns {JSX.Element} Children or error fallback UI
 *
 * @example
 * import ErrorBoundary from '@stevederico/skateboard-ui/ErrorBoundary';
 *
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */
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
          <Card className="max-w-md text-center">
            <CardContent className="flex flex-col items-center gap-4">
              <h1 className="text-2xl font-bold">Something went wrong</h1>
              <p className="text-muted-foreground break-words">{this.state.error?.message || 'Unknown error'}</p>
              <div className="flex gap-2 justify-center">
                <Button
                  variant="secondary"
                  onClick={() => this.setState({ hasError: false, error: null })}
                >
                  Try Again
                </Button>
                <Button
                  variant="default"
                  onClick={() => window.location.reload()}
                >
                  Reload Page
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
