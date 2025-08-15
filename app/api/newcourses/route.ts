import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('per_page') || '10';

    const response = await axios.get(`https://staging-api.tadarab.com/api/v1/public/courses?page=${page}&per_page=${perPage}&filters[scope]=new`);

    return NextResponse.json({
      success: true,
      data: (response.data as any).data || [],
      pagination: (response.data as any).pagination || {},
      message: 'تم جلب الدورات الجديدة بنجاح'
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error in new courses route:', error);
    
    if (error.response) {
      return NextResponse.json({
        success: false,
        message: error.response.data.message || 'حدث خطأ أثناء جلب الدورات الجديدة',
        error: error.response.data
      }, { status: error.response.status });
    }

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