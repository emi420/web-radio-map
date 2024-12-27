import React from 'react';
import { Alert } from '@hotosm/ui/dist/react';
import "./ErrorBoundary.style.css";

interface ErrorBoundaryProps {
  showError?: boolean;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: object | null | any;
  showDetails: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null, showDetails: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
      showDetails: false,
    });
  }

  render() {
        const { errorInfo, error } = this.state;
        const { children } = this.props;
        if (errorInfo) {
            return (
              <Alert variant="danger" open>
                <h1>Something went wrong 😕</h1>
                <h2 className="errorTitle">{error && error.toString()}</h2>
                <pre>{errorInfo.componentStack}</pre>
              </Alert>
            );
    }
    return children;
   }
}

export default ErrorBoundary;
