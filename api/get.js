// /api/get.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { username } = req.query;
  if (!username) return res.status(400).json({ error: 'Pseudo requis' });

  const filePath = path.join(process.cwd(), 'data', 'messages.json');
  if (!fs.existsSync(filePath)) return res.status(200).json({ messages: [] });

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const messages = data[username] || [];

  return res.status(200).json({ messages });
}
