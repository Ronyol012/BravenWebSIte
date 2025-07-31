import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Play, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { 
  testDatabaseConnection, 
  validateDatabaseSchema, 
  fetchProjectsWithValidation,
  fetchFeaturedProjectsWithValidation,
  retryDatabaseOperation
} from '../lib/supabase';
import DatabaseStatus from '../components/DatabaseStatus';

interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'success' | 'error';
  message: string;
  duration?: number;
  details?: any;
}

export default function DatabaseTest() {
  const [tests, setTests] = useState<TestResult[]>([
    { name: 'Connection Test', status: 'pending', message: 'Not started' },
    { name: 'Schema Validation', status: 'pending', message: 'Not started' },
    { name: 'Fetch Projects', status: 'pending', message: 'Not started' },
    { name: 'Fetch Featured Projects', status: 'pending', message: 'Not started' },
    { name: 'Retry Mechanism', status: 'pending', message: 'Not started' }
  ]);

  const [isRunning, setIsRunning] = useState(false);

  const updateTest = (index: number, updates: Partial<TestResult>) => {
    setTests(prev => prev.map((test, i) => 
      i === index ? { ...test, ...updates } : test
    ));
  };

  const runTest = async (index: number, testFunction: () => Promise<any>) => {
    const startTime = Date.now();
    updateTest(index, { status: 'running', message: 'Running...' });

    try {
      const result = await testFunction();
      const duration = Date.now() - startTime;
      
      updateTest(index, {
        status: 'success',
        message: 'Completed successfully',
        duration,
        details: result
      });
      
      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      const message = error instanceof Error ? error.message : 'Unknown error';
      
      updateTest(index, {
        status: 'error',
        message,
        duration,
        details: error
      });
      
      throw error;
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    
    try {
      // Test 1: Connection Test
      await runTest(0, async () => {
        const result = await testDatabaseConnection();
        if (!result.success) {
          throw new Error(result.message);
        }
        return result;
      });

      // Test 2: Schema Validation
      await runTest(1, async () => {
        const result = await validateDatabaseSchema();
        if (!result.success) {
          throw new Error(result.message);
        }
        return result;
      });

      // Test 3: Fetch Projects
      await runTest(2, async () => {
        const projects = await fetchProjectsWithValidation();
        return { count: projects.length, projects: projects.slice(0, 3) };
      });

      // Test 4: Fetch Featured Projects
      await runTest(3, async () => {
        const featured = await fetchFeaturedProjectsWithValidation();
        return { count: featured.length, projects: featured.slice(0, 2) };
      });

      // Test 5: Retry Mechanism
      await runTest(4, async () => {
        let attempts = 0;
        const result = await retryDatabaseOperation(async () => {
          attempts++;
          if (attempts < 2) {
            throw new Error('Simulated failure');
          }
          return { attempts, success: true };
        }, 3, 100);
        return result;
      });

    } catch (error) {
      console.error('Test suite failed:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const resetTests = () => {
    setTests(prev => prev.map(test => ({
      ...test,
      status: 'pending' as const,
      message: 'Not started',
      duration: undefined,
      details: undefined
    })));
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'running':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-300" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'running':
        return 'border-blue-200 bg-blue-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-32 pb-16"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Database className="w-12 h-12 text-reinbou-coral mr-4" />
            <h1 className="text-4xl font-display font-bold text-reinbou-navy">
              Database Connection Test
            </h1>
          </div>
          <p className="text-xl text-gray-600">
            Comprehensive testing suite for Supabase database connectivity
          </p>
        </div>

        {/* Database Status */}
        <div className="mb-8">
          <DatabaseStatus showDetails={true} />
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={runAllTests}
            disabled={isRunning}
            className="flex items-center space-x-2 bg-reinbou-coral text-white px-6 py-3 rounded-lg
              hover:bg-reinbou-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            <span>{isRunning ? 'Running Tests...' : 'Run All Tests'}</span>
          </button>
          
          <button
            onClick={resetTests}
            disabled={isRunning}
            className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg
              hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <AlertTriangle className="w-5 h-5" />
            <span>Reset Tests</span>
          </button>
        </div>

        {/* Test Results */}
        <div className="space-y-4">
          {tests.map((test, index) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`border rounded-lg p-6 ${getStatusColor(test.status)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(test.status)}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {test.name}
                  </h3>
                </div>
                {test.duration && (
                  <span className="text-sm text-gray-500">
                    {test.duration}ms
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 mb-2">{test.message}</p>
              
              {test.details && (
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800">
                    View Details
                  </summary>
                  <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-auto">
                    {JSON.stringify(test.details, null, 2)}
                  </pre>
                </details>
              )}
            </motion.div>
          ))}
        </div>

        {/* Environment Info */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Environment Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Supabase URL:</span>
              <span className="ml-2 text-gray-600 font-mono">
                {import.meta.env.VITE_SUPABASE_URL ? '✅ Configured' : '❌ Missing'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Supabase Key:</span>
              <span className="ml-2 text-gray-600 font-mono">
                {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Configured' : '❌ Missing'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Environment:</span>
              <span className="ml-2 text-gray-600">
                {import.meta.env.DEV ? 'Development' : 'Production'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Mode:</span>
              <span className="ml-2 text-gray-600">
                {import.meta.env.MODE}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}