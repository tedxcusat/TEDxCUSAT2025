import { NextResponse } from 'next/server';
import base from '@/lib/airtable';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!process.env.AIRTABLE_TABLE_NAME) {
    return NextResponse.json(
      { error: 'AIRTABLE_TABLE_NAME is not defined' },
      { status: 500 }
    );
  }

  try {
    const records = await base(process.env.AIRTABLE_TABLE_NAME)
      .select({
        view: 'LeaderBoard', // Corrected view name from user image
        fields: ['Name', 'Coupons Sold', 'Total Amount', 'Department'],
      })
      .all();

    let totalRevenue = 0;

    const participants = records.map((record) => {
      const revenue = (record.get('Total Amount') as number) || 0;
      totalRevenue += revenue;

      return {
        id: record.id,
        name: (record.get('Name') as string) || 'Anonymous',
        couponsSold: (record.get('Coupons Sold') as number) || 0,
        department: (record.get('Department') as string) || '',
        revenue: revenue,
      };
    });

    try {
      // Sort by Coupons Sold descending
      participants.sort((a, b) => b.couponsSold - a.couponsSold);
    } catch (sortError) {
      console.error("Sorting error", sortError);
    }

    return NextResponse.json({
      participants,
      totalRevenue,
      targetRevenue: 75000,
    });
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    // Log environment variable status (don't log the actual key)
    console.log('Env Check:', {
      hasApiKey: !!process.env.AIRTABLE_API_KEY,
      hasBaseId: !!process.env.AIRTABLE_BASE_ID,
      tableName: process.env.AIRTABLE_TABLE_NAME,
      errorDetails: error instanceof Error ? error.message : String(error)
    });

    return NextResponse.json(
      { error: 'Failed to fetch leaderboard data', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
