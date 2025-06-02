import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/Background';
import Navbar from '../components/Navbar';
import ErrorTest from '../components/ErrorTest';
import SEO from '../components/SEO';

const TestErrorPage = () => {
  return (
    <>
      <SEO 
        title="Test Error Handling | Wenslauce Portfolio" 
        description="A page to test error handling capabilities"
      />
      <Navbar />
      <AnimatedBackground />
      
      <div className="min-h-screen pt-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-lg bg-white/10 rounded-xl p-8 shadow-xl border border-white/20 mb-8"
          >
            <h1 className="text-3xl font-bold mb-6 text-white">Error Handling Test Page</h1>
            
            <div className="space-y-6 text-gray-300">
              <p>
                This page demonstrates the error handling capabilities of the portfolio website.
                You can test both the Error Boundary and the 404 page from here.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10">
                  <h2 className="text-xl font-bold mb-4 text-white">Error Boundary Test</h2>
                  <p className="mb-4">
                    The component below will trigger an error when you click the button.
                    This will be caught by the ErrorBoundary component.
                  </p>
                  <ErrorTest />
                </div>
                
                <div className="backdrop-blur-lg bg-white/5 rounded-xl p-6 border border-white/10">
                  <h2 className="text-xl font-bold mb-4 text-white">404 Page Test</h2>
                  <p className="mb-6">
                    Click the button below to navigate to a non-existent page.
                    This will trigger the 404 Not Found page.
                  </p>
                  
                  <Link to="/this-page-does-not-exist">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
                    >
                      Go to Non-existent Page
                    </motion.button>
                  </Link>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
                  >
                    Back to Home
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <footer>
        <center>
          <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
          <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
            © 2025{" "}
            <a href="https://wenslauce.com/" className="hover:underline">
              Wenslauce™
            </a>
            . All Rights Reserved.
          </span>
        </center>
      </footer>
    </>
  );
};

export default TestErrorPage; 