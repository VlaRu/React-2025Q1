import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(error: Error): State {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  reloadPage(): void {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Sorry.. there was an error</h1>
          <button onClick={this.reloadPage} className="error-btn">
            return
          </button>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
