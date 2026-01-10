import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// وضعنا القيم مباشرة هنا لحل مشكلة Build Failed
const supabase = createClient(
  'https://dxajdlqhledskrmiyyop.supabase.co',
  'sb_publishable_Zom1Aiy9XoJzYr1-xD9DSA_OHD9fIs3'
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug'); 

  if (!slug) {
    return NextResponse.json({ status: "error", message: "Missing slug parameter" });
  }

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
  });
}
