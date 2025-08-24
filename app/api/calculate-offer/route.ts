import { NextResponse } from 'next/server';

// This function handles POST requests to the /api/calculate-offer endpoint
export async function POST(request: Request) {
  try {
    // 1. Get the non-confidential data from the agent's request body
    const body = await request.json();

    // We expect the agent to send these details
    const {
      amount,
      startDate,
      endDate,
      paymentMode,
      increaseRate,
      isLCP,
      lcpKeys,
    } = body;

    // 2. Basic validation to ensure required fields are present
    if (!amount || !startDate || !endDate || !paymentMode) {
      return NextResponse.json(
        { error: 'Missing required payment details' },
        { status: 400 }
      );
    }

    // 3. Call the secure calculation engine on the server.
    //    The function will automatically use the default confidential rates,
    //    spreads, and adjustments from your npvConfig.ts file.
    // const result = calculateMinMaxNPV({ ... });
    // 4. Return ONLY the final, safe-to-display offer to the agent
    // return NextResponse.json(result);
    return NextResponse.json(
      { error: 'Calculation engine unavailable. npvCalculations module missing.' },
      { status: 500 }
    );

  } catch (error) {
    // Log the full error on the server for debugging
    console.error('API Calculation Error:', error);
    // Return a generic error message to the client
    return NextResponse.json(
      { error: 'An internal error occurred during calculation.' },
      { status: 500 }
    );
  }
} 