/**
 * Initialize Test Specialists API Endpoint
 * 
 * This endpoint just returns the specialist data.
 * The actual Firebase operations are done client-side to avoid SSR issues.
 * 
 * Usage: GET http://localhost:3000/api/admin/init-specialists
 * 
 * @author SmarterPayouts Team
 * @since Phase 2 - Live Chat Implementation
 */

import { NextResponse } from 'next/server';

// Test specialists data
const TEST_SPECIALISTS = [
  {
    id: 'specialist_sarah_johnson',
    name: 'Sarah Johnson',
    email: 'sarah@smarterpayouts.com',
    status: 'online' as const,
    skills: ['settlements', 'calculations', 'court-approval'],
    maxConcurrentChats: 5,
    currentChats: [],
    responseTime: 45,
    rating: 4.8,
    totalChats: 127,
    languages: ['English', 'Spanish'],
  },
  {
    id: 'specialist_michael_chen',
    name: 'Michael Chen',
    email: 'michael@smarterpayouts.com',
    status: 'online' as const,
    skills: ['settlements', 'legal', 'documentation'],
    maxConcurrentChats: 3,
    currentChats: [],
    responseTime: 60,
    rating: 4.9,
    totalChats: 203,
    languages: ['English', 'Mandarin'],
  },
  {
    id: 'specialist_emily_rodriguez',
    name: 'Emily Rodriguez',
    email: 'emily@smarterpayouts.com',
    status: 'online' as const,
    skills: ['settlements', 'calculations', 'customer-support'],
    maxConcurrentChats: 4,
    currentChats: [],
    responseTime: 30,
    rating: 5.0,
    totalChats: 89,
    languages: ['English', 'Spanish', 'Portuguese'],
  },
];

/**
 * GET /api/admin/init-specialists
 * 
 * Returns specialist data for client-side Firebase registration
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      specialists: TEST_SPECIALISTS,
      message: 'Specialist data ready for registration',
    });
  } catch (error) {
    console.error('❌ [InitSpecialists] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get specialist data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/init-specialists
 * 
 * Returns specialist IDs for client-side removal
 */
export async function DELETE() {
  try {
    return NextResponse.json({
      success: true,
      specialists: TEST_SPECIALISTS.map(s => ({ id: s.id, name: s.name })),
      message: 'Specialist IDs ready for removal',
    });
  } catch (error) {
    console.error('❌ [InitSpecialists] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get specialist data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

