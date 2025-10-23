/**
 * Web Worker utility for heavy calculations
 * Moves computation off main thread to improve INP
 */

export interface CalculationMessage {
  type: 'calculate' | 'result' | 'error';
  id: string;
  data?: any;
  error?: string;
}

export interface NPVCalculationParams {
  payments: Array<{
    amount: number;
    date: Date;
  }>;
  discountRate: number;
  currentDate: Date;
}

export interface NPVResult {
  npv: number;
  calculations: Array<{
    paymentDate: Date;
    amount: number;
    presentValue: number;
    timeInYears: number;
  }>;
}

/**
 * Create a Web Worker for heavy calculations
 */
export function createCalculationWorker() {
  // Create worker URL from inline function
  const workerCode = `
    self.onmessage = function(e) {
      const { type, id, data } = e.data;

      if (type === 'calculate') {
        try {
          const result = calculateNPV(data);
          self.postMessage({
            type: 'result',
            id,
            data: result
          });
        } catch (error) {
          self.postMessage({
            type: 'error',
            id,
            error: error.message
          });
        }
      }
    };

    function calculateNPV(params) {
      const { payments, discountRate, currentDate } = params;
      let totalNPV = 0;
      const calculations = [];

      for (const payment of payments) {
        const paymentDate = new Date(payment.date);
        const timeInYears = (paymentDate - currentDate) / (1000 * 60 * 60 * 24 * 365.25);
        const presentValue = payment.amount / Math.pow(1 + discountRate, timeInYears);

        calculations.push({
          paymentDate,
          amount: payment.amount,
          presentValue,
          timeInYears
        });

        totalNPV += presentValue;
      }

      return {
        npv: totalNPV,
        calculations
      };
    }
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const workerUrl = URL.createObjectURL(blob);
  const worker = new Worker(workerUrl);

  // Clean up the URL when worker is no longer needed
  worker.onmessage = () => {
    URL.revokeObjectURL(workerUrl);
  };

  return worker;
}

/**
 * Calculate NPV using Web Worker
 */
export function calculateNPVWithWorker(params: NPVCalculationParams): Promise<NPVResult> {
  return new Promise((resolve, reject) => {
    const worker = createCalculationWorker();
    const requestId = Math.random().toString(36).substr(2, 9);

    const timeout = setTimeout(() => {
      worker.terminate();
      reject(new Error('Calculation timeout'));
    }, 10000); // 10 second timeout

    worker.onmessage = (e) => {
      clearTimeout(timeout);

      if (e.data.type === 'result') {
        resolve(e.data.data);
      } else if (e.data.type === 'error') {
        reject(new Error(e.data.error));
      }

      worker.terminate();
    };

    worker.onerror = (error) => {
      clearTimeout(timeout);
      worker.terminate();
      reject(error);
    };

    worker.postMessage({
      type: 'calculate',
      id: requestId,
      data: params
    });
  });
}

/**
 * Check if Web Workers are supported
 */
export function isWebWorkerSupported(): boolean {
  return typeof Worker !== 'undefined';
}

/**
 * Fallback calculation if Web Workers are not available
 */
export function calculateNPVDirect(params: NPVCalculationParams): NPVResult {
  const { payments, discountRate, currentDate } = params;
  let totalNPV = 0;
  const calculations = [];

  for (const payment of payments) {
    const paymentDate = new Date(payment.date);
    const timeInYears = (paymentDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
    const presentValue = payment.amount / Math.pow(1 + discountRate, timeInYears);

    calculations.push({
      paymentDate,
      amount: payment.amount,
      presentValue,
      timeInYears
    });

    totalNPV += presentValue;
  }

  return {
    npv: totalNPV,
    calculations
  };
}

/**
 * Smart NPV calculation that uses Web Worker when available
 */
export async function calculateNPVSmart(params: NPVCalculationParams): Promise<NPVResult> {
  if (isWebWorkerSupported() && typeof window !== 'undefined') {
    try {
      // Try Web Worker first (non-blocking)
      return await calculateNPVWithWorker(params);
    } catch (error) {
      console.warn('Web Worker calculation failed, falling back to direct calculation:', error);
      // Fall back to direct calculation if worker fails
      return calculateNPVDirect(params);
    }
  } else {
    // Direct calculation for environments without Web Worker support
    return calculateNPVDirect(params);
  }
}
