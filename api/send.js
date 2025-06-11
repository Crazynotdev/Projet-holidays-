// /api/send.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Méthode non autorisée');

  const { username, message } = req.body;

  if (!username || !message) return res.status(400).json({ error: 'Champs requis' });

  const filePath = path.join(process.cwd(), 'data', 'messages.json');
  let data = {};

  if (fs.existsSync(filePath)) {
    data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  }

  if (!data[username]) data[username] = [];
  data[username].push(message);

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

  return res.status(200).json({ success: true });
}
