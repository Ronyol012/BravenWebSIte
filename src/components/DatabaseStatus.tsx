import React, { useState, useEffect } from 'react';
import { Database, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { testDatabaseConnection, validateDatabaseSchema } from '../lib/supabase';

interface DatabaseStatusProps {
  showDetails?: boolean;
}

interface ConnectionStatus {
  connected: boolean;
  message: string;
  lastChecked: Date;
  schemaValid: boolean;
  loading: boolean;
}

export default function DatabaseStatus({ showDetails = false }: DatabaseStatusProps) {
  const [status, setStatus] = useState<ConnectionStatus>({
    connected: false,
    message: 'Checking connection...',
    lastChecked: new Date(),
    schemaValid: false,
    loading: true
  });

  const checkConnection = async () => {
    setStatus(prev => ({ ...prev, loading: true }));
    
    try {
      // Test basic connection
      const connectionResult = await testDatabaseConnection();
      
      // Test schema if connection is successful
      let schemaResult = { success: false };
      if (connectionResult.success) {
        schemaResult = await validateDatabaseSchema();
      }

      setStatus({
        connected: connectionResult.success,
        message: connectionResult.message,
        lastChecked: new Date(),
        schemaValid: schemaResult.success,
        loading: false
      });
    } catch (error) {
      setStatus({
        connected: false,
        message: `Connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        lastChecked: new Date(),
        schemaValid: false,
        loading: false
      });
    }
  };

  useEffect(() => {
    checkConnection();
    
    // Check connection every 30 seconds in development
    if (import.meta.env.DEV) {
      const interval = setInterval(checkConnection, 30000);
      return () => clearInterval(interval);
    }
  }, []);

  const getStatusIcon = () => {
    if (status.loading) {
      return <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />;
    }
    
    if (status.connected && status.schemaValid) {
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
    
    if (status.connected && !status.schemaValid) {
      return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
    
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const getStatusColor = () => {
    if (status.loading) return 'border-blue-200 bg-blue-50';
    if (status.connected && status.schemaValid) return 'border-green-200 bg-green-50';
    if (status.connected && !status.schemaValid) return 'border-yellow-200 bg-yellow-50';
    return 'border-red-200 bg-red-50';
  };

  if (!showDetails && status.connected && status.schemaValid) {
    return null; // Don't show if everything is working fine
  }

  return (
    <div className={`border rounded-lg p-4 ${getStatusColor()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Database className="w-5 h-5 text-gray-600" />
          <div>
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <span className="font-medium text-gray-900">
                Database Status
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {status.message}
            </p>
          </div>
        </div>
        
        <button
          onClick={checkConnection}
          disabled={status.loading}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          title="Refresh connection status"
        >
          <RefreshCw className={`w-4 h-4 ${status.loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Connection:</span>
              <span className={`ml-2 ${status.connected ? 'text-green-600' : 'text-red-600'}`}>
                {status.connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Schema:</span>
              <span className={`ml-2 ${status.schemaValid ? 'text-green-600' : 'text-yellow-600'}`}>
                {status.schemaValid ? 'Valid' : 'Invalid'}
              </span>
            </div>
            <div className="col-span-2">
              <span className="font-medium text-gray-700">Last Checked:</span>
              <span className="ml-2 text-gray-600">
                {status.lastChecked.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}