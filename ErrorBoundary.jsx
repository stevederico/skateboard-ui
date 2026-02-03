import React from 'react';
import { Button } from './shadcn/ui/button.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from './shadcn/ui/card.jsx';
import { Alert, AlertDescription } from './shadcn/ui/alert.jsx';
import { Badge } from './shadcn/ui/badge.jsx';

/**
 * Top-level error boundary that catches render errors, unhandled promise
 * rejections, and global errors.
 *
 * Displays a shadcn Card fallback with a destructive Alert showing the
 * error message, plus "Try Again" and "Reload Page" buttons.
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
    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      this.setState({
        hasError: true,
        error: new Error(`Async Error: ${event.reason?.message || String(event.reason)}`)
      });
    };

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
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Something went wrong</CardTitle>
              <CardDescription>An unexpected error occurred in the application.</CardDescription>
            </CardHeader>
            <Alert variant="destructive" className="mx-6">
              <AlertDescription>
                <Badge variant="outline" className="mr-2">Error</Badge>
                {this.state.error?.message || 'Unknown error'}
              </AlertDescription>
            </Alert>
            <CardFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Try Again
              </Button>
              <Button onClick={() => window.location.reload()}>
                Reload Page
              </Button>
            </CardFooter>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
