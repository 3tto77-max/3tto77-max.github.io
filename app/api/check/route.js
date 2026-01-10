import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// إعداد الاتصال بـ Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug'); // استلام الكود المرسل من سكتشوير

  // جلب بيانات الرابط من القاعدة
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ status: "error", message: "الرابط غير موجود" });
  }

  // التحقق من الوقت الحالي مقارنة بوقت الانتهاء
  const now = new Date();
  const expiry = new Date(data.expires_at);

  if (now > expiry || !data.is_active) {
    return NextResponse.json({ status: "expired", message: "انتهت صلاحية الرابط" });
  }

  // إذا كان الرابط صالحاً، نرسل الرابط الأصلي
  return NextResponse.json({ 
    status: "active", 
    url: data.original_url 
  });
}
