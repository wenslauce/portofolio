import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
          <div className="max-w-2xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-lg bg-white/10 rounded-xl p-8 shadow-xl border border-white/20"
            >
              <h1 className="text-3xl font-bold mb-4 text-red-400">Something went wrong</h1>
              <p className="mb-6 text-gray-300">
                An unexpected error has occurred. Please try refreshing the page or navigate back to the home page.
              </p>
              
              <div className="bg-black/30 p-4 rounded-lg mb-6 overflow-auto max-h-40">
                <p className="font-mono text-sm text-red-300">
                  {this.state.error && this.state.error.toString()}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
                >
                  Refresh Page
                </motion.button>
                
                <Link to="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gray-700 hover:bg-gray-800 rounded-lg text-white font-medium transition-colors"
                  >
                    Go to Home
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    // If there's no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary; 