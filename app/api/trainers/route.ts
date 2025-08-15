import { NextRequest, NextResponse } from 'next/server';
import axiosInstance from '@/app/lib/axios';

export async function GET(request: NextRequest) {
  try {
    // Make actual API request
    const response = await axiosInstance.get('https://staging-api.tadarab.com/api/v1/public/tutors?&page=1&per_page=12');

    return NextResponse.json({
      success: true,
      data: response.data,
      message: 'تم جلب المدربين بنجاح'
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error in trainers route:', error);
    
    // Check if it's an Axios error with response
    if (error.response) {
      return NextResponse.json({
        success: false,
        message: error.response.data.message || 'حدث خطأ أثناء جلب المدربين',
        error: error.response.data
      }, { status: error.response.status });
    }

    // Generic error handling
    return NextResponse.json({
      success: false,
      message: 'حدث خطأ غير متوقع',
      error: error.message
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json({
    success: false,
    message: 'الطريقة غير مدعومة'
  }, { status: 405 });
}
