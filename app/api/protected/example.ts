// pages/api/protected/example.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const SECRET_KEY = 'your_secret_key'; // ใช้ค่า Secret ของคุณ

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;

    // ตรวจสอบว่า token มีหรือไม่
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      // ตรวจสอบ JWT
      const decoded = jwt.verify(token, SECRET_KEY);
      // ส่งข้อมูลกลับหาก token ถูกต้อง
      return res.status(200).json({ message: 'Protected data', user: decoded });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
