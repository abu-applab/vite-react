import React from "react";

interface ErrorBoundaryProps {
    children: any;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: any | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error, errorInfo: null };
    }

    componentDidCatch(_error: Error, errorInfo: any): void {
        this.setState({ errorInfo });
        // You can log error to an error reporting service here
    }

    render(): any {
        const { hasError, error, errorInfo } = this.state;

        if (hasError) {
            return (
                <>
                    <style>{`
.error-boundary-bg {
    background: #eceff4;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.error-boundary-card {
    background: #fff;
    border-radius: 20px;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.08);
    padding: 48px 32px;
    max-width: 720px;
    width: 100%;
    text-align: center;
}

.error-boundary-icon {
    font-size: 64px;
    margin-bottom: 16px;
}

.error-boundary-title {
    font-weight: 700;
    font-size: 2rem;
    margin-bottom: 8px;
    color: #222;
}

.error-boundary-desc {
    color: #555;
    font-size: 1.1rem;
    margin-bottom: 24px;
}

.error-boundary-pre {
    color: #c00;
    background: #f8d7da;
    border-radius: 8px;
    padding: 12px;
    margin-top: 10px;
    font-size: 0.95rem;
    text-align: left;
}

.error-boundary-details {
    white-space: pre-wrap;
    margin-top: 10px;
    text-align: left;
    font-size: 0.9rem;
    color: #444;
}
                    `}</style>
                    <div className="error-boundary-bg">
                        <div className="error-boundary-card">
                            <div className="error-boundary-icon">😞</div>
                            <h2 className="error-boundary-title">Something went wrong</h2>
                            <div className="error-boundary-desc">
                                Sorry, we couldn't load this page.
                            </div>
                            <pre className="error-boundary-pre">
                                {error && error.toString()}
                            </pre>
                            <details className="error-boundary-details">
                                {errorInfo && errorInfo.componentStack}
                            </details>
                        </div>
                    </div>
                </>

            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
