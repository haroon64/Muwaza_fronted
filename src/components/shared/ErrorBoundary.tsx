// components/ErrorBoundary.tsx
"use client";
import React, { Component, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: string | null;
    stack?: string | null;
}

export default class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false, error: null, stack: null };

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error: error.message };
    }

    componentDidCatch(error: Error, info: any) {
        console.error("Caught error in ErrorBoundary:", error, info);
        this.setState({ error: error.message, stack: info?.componentStack ?? null });
    }

    render() {
        if (this.state.hasError) {
            const showDetails = process.env.NODE_ENV !== "production";
            return (
                <div style={{ padding: "2rem", textAlign: "center" }}>
                    <h2>Something went wrong.</h2>
                    <p>Please refresh the page or try again later.</p>

                    {this.state.error && (
                        <div style={{ marginTop: 16, textAlign: "left" }}>
                            <strong>Error:</strong>
                            <div>{this.state.error}</div>
                        </div>
                    )}

                    {showDetails && this.state.stack && (
                        <pre style={{ marginTop: 12, textAlign: "left", whiteSpace: "pre-wrap" }}>
                            {this.state.stack}
                        </pre>
                    )}
                </div>
            );
        }

        return this.props.children;
    }
}
