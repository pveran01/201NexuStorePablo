// pages/api/signup.js
import bcrypt from 'bcryptjs';
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { username, password } = req.body;
  const client = await clientPromise;
  const db = client.db('NexuStore');

  const existingUser = await db.collection('Users').findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.collection('Users').insertOne({ username, password: hashedPassword });
  res.status(201).json({ message: 'User created successfully' });
}