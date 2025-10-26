/**
 * File Watcher Hook - Client-side utilities for knowledge indexing
 *
 * This hook provides client-side utilities to interact with the server-side
 * file watcher system without causing Next.js bundling issues.
 */

import { useState, useEffect } from 'react';

interface FileWatcherStatus {
  isRunning: boolean;
  isIndexing: boolean;
  activeTimers: number;
  config: {
    watchPaths: string[];
    ignorePatterns: string[];
    chunkSize: number;
    debounceMs: number;
    enableInProduction: boolean;
  };
}

interface FileWatcherAPI {
  startWatcher: () => Promise<void>;
  stopWatcher: () => Promise<void>;
  triggerReindex: () => Promise<void>;
  getStatus: () => Promise<FileWatcherStatus>;
}

export const useFileWatcher = (): FileWatcherAPI => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const callAPI = async (action: string, method = 'POST') => {
    if (!isClient) return;

    try {
      const response = await fetch('/api/file-watcher', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: method === 'POST' ? JSON.stringify({ action }) : undefined,
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`File watcher API error (${action}):`, error);
      throw error;
    }
  };

  const startWatcher = async () => {
    await callAPI('start');
  };

  const stopWatcher = async () => {
    await callAPI('stop');
  };

  const triggerReindex = async () => {
    await callAPI('index');
  };

  const getStatus = async (): Promise<FileWatcherStatus> => {
    const response = await callAPI('status', 'GET');
    return response.status;
  };

  return {
    startWatcher,
    stopWatcher,
    triggerReindex,
    getStatus,
  };
};
