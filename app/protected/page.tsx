// app/protected/page.tsx
'use client'; // เพิ่มบรรทัดนี้เพื่อบอก Next.js ว่าไฟล์นี้เป็น Client Component

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // ใช้ useRouter จาก next/navigation

export default function ProtectedPage() {
  const [message, setMessage] = useState('');
  const router = useRouter(); // ใช้ useRouter ที่มาจาก next/navigation

  useEffect(() => {
    // ตัวอย่างการใช้งาน useEffect
    fetch('/api/protected')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch(() => router.push('/login')); // ถ้าไม่ได้รับข้อมูลให้ไปที่หน้า login
  }, [router]);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>{message}</p>
    </div>
  );
}
