"use client";
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// إعداد الاتصال باستخدام القيم التي أضفتها في Vercel
const supabase = createClient(
  'https://dxajdlqhledskrmiyyop.supabase.co',
  'sb_publishable_Zom1Aiy9XoJzYr1-xD9DSA_OHD9fIs3'
);


export default function AdminPanel() {
  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [hours, setHours] = useState(24);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!url || !slug) return alert("يرجى ملء جميع الحقول");
    setLoading(true);

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + parseInt(hours));

    const { error } = await supabase
      .from('links')
      .insert([{ 
        original_url: url, 
        slug: slug, 
        expires_at: expiryDate.toISOString() 
      }]);

    setLoading(false);
    if (error) alert("خطأ: " + error.message);
    else alert("✅ تم إنشاء الرابط بنجاح!");
  };

  return (
    <div style={{ 
      padding: '40px 20px', 
      direction: 'rtl', 
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#121212',
      color: 'white',
      minHeight: '100vh',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#00d1ff' }}>لوحة تحكم الروابط المؤقتة 🛠️</h1>
      <p>مشروع مكس كورة - إدارة البث المباشر</p>
      
      <div style={{ 
        maxWidth: '500px', 
        margin: '30px auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px',
        backgroundColor: '#1e1e1e',
        padding: '25px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
      }}>
        <input 
          placeholder="رابط البث الأصلي (URL)" 
          onChange={(e) => setUrl(e.target.value)} 
          style={inputStyle} 
        />
        <input 
          placeholder="كود الرابط (Slug) - مثلاً: ch1" 
          onChange={(e) => setSlug(e.target.value)} 
          style={inputStyle} 
        />
        <div style={{ textAlign: 'right' }}>
          <label>مدة الصلاحية (بالساعات):</label>
          <input 
            type="number" 
            value={hours} 
            onChange={(e) => setHours(e.target.value)} 
            style={inputStyle} 
          />
        </div>
        
        <button 
          onClick={handleSave} 
          disabled={loading}
          style={{
            padding: '15px',
            backgroundColor: '#00d1ff',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'جاري الحفظ...' : 'إنشاء الرابط المؤقت'}
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #333',
  backgroundColor: '#2a2a2a',
  color: 'white',
  fontSize: '15px',
  outline: 'none'
};
