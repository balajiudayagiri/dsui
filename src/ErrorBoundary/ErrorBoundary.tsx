import type { ReactNode, CSSProperties } from "react";
import React, { Component } from "react";
import "./ErrorBoundary.css";

/**
 * Props for the ErrorBoundary component.
 * @typedef {Object} ErrorBoundaryProps
 * @property {ReactNode} children - The children components that will be wrapped by the error boundary.
 * @property {string} [fallbackText] - The text to display in the fallback UI.
 * @property {string} [className] - Optional className for the wrapper div.
 * @property {CSSProperties} [style] - Optional inline styles for the wrapper div.
 * @property {ReactNode} [fallbackComponent] - Optional custom fallback component to render when an error is caught.
 * @property {(error: Error) => void} [onError] - Optional callback function to handle the error.
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackText?: string;
  className?: string;
  style?: CSSProperties;
  fallbackComponent?: ReactNode;
  onError?: (error: Error) => void;
}

/**
 * State for the ErrorBoundary component.
 * @typedef {Object} ErrorBoundaryState
 * @property {boolean} hasError - Indicates whether an error has been caught or not.
 * @property {Error | null} error - The error that was caught, if any.
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * A component that acts as an error boundary to catch JavaScript errors in its child component tree,
 * log those errors, and provide a fallback UI.
 *
 * ### Example usage of the ErrorBoundary component
 * ```tsx
 * import ErrorBoundary from './ErrorBoundary';
 *
 * const App = () => {
 *   return (
 *     <ErrorBoundary fallbackText="Something went wrong!">
 *       <YourComponent />
 *     </ErrorBoundary>
 *   );
 * };
 *
 * export default App;
 * ```
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  /**
   * Constructs the ErrorBoundary component.
   * @param {ErrorBoundaryProps} props - The props for the ErrorBoundary component.
   */
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Initialize the error state to false initially
    this.state = { hasError: false, error: null };
  }

  /**
   * A lifecycle method invoked after an error is thrown in a child component.
   * It updates the state to trigger a fallback UI.
   * @param {Error} error - The error that was thrown.
   * @returns {ErrorBoundaryState} - The updated state.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  /**
   * A lifecycle method invoked after an error has been captured.
   * It can be used for additional error logging or reporting services.
   * @param {Error} error - The error that was thrown.
   * @param {React.ErrorInfo} info - Information about the error.
   */
  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // Log the error to the console for debugging purposes
    console.error(error, info.componentStack);
    // Trigger the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  /**
   * Function to reset the error state.
   */
  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  /**
   * Renders the children components if there's no error, otherwise displays fallback UI.
   * @returns {ReactNode} - The rendered fallback or children components.
   */
  render(): ReactNode {
    // Check if an error has occurred
    if (this.state.hasError) {
      // Render the custom fallback component if provided
      if (this.props.fallbackComponent) {
        return React.cloneElement(
          this.props.fallbackComponent as React.ReactElement,
          { resetError: this.resetError }
        );
      }

      // Provide a default fallback message if not specified in props
      const fallbackText =
        this.props.fallbackText ?? "Oops, there is an error!";

      // Render the fallback UI
      return (
        <div
          className={`error-boundary ${this.props.className}`}
          style={this.props.style}>
          <div className="mb-5 flex items-center gap-3 ">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                width="24px"
                height="24px"
                viewBox="0 0 16 16">
                <title>icn/error</title>
                <path
                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-2A5 5 0 1 0 8 3a5 5 0 0 0 0 10zm0-9a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
                  id="a"
                />
              </svg>
            </div>
            <h2 className="font-bold">{fallbackText}</h2>
          </div>
          <button
            type="button"
            className="bg-red text-white hover:bg-red700 try-again-button"
            onClick={this.resetError}>
            Try again?
          </button>
        </div>
      );
    }

    // Render children components if there's no error
    return this.props.children;
  }
}

export { ErrorBoundary };
