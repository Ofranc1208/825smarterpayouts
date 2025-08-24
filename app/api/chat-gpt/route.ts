/**
 * @deprecated This API route is being cleared as part of the systematic deletion of chat components from the app directory.
 * The functionality has been moved to src/components/mint-intelligent-chat/ for better organization.
 * 
 * DO NOT USE - This file will be deleted after system stability is confirmed.
 */

import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ error: 'Chat GPT API deprecated - moved to src/' }, { status: 410 });
} 