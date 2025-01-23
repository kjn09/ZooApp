const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const dbPath = path.join(__dirname, 'db.json');

const loadDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Fehler beim Laden der DB:', error);
    return { users: [], friendRequests: [] };
  }
};

const saveDB = (db) => {
  try {
    const data = JSON.stringify(db, null, 2);
    fs.writeFileSync(dbPath, data, 'utf8');
  } catch (error) {
    console.error('Fehler beim Speichern der DB:', error);
  }
};

app.post('/send-friend-request', (req, res) => {
  const { userId, friendId } = req.body;

  if (!userId || !friendId) {
    return res.status(400).json({ message: 'Benutzer-ID oder Freund-ID fehlen.' });
  }

  const db = loadDB();

  const userExists = db.users.some(user => user.id === userId);
  const friendExists = db.users.some(user => user.id === friendId);

  if (!userExists || !friendExists) {
    return res.status(400).json({ message: 'Benutzer oder Freund nicht gefunden.' });
  }

  const requestExists = db.friendRequests.some(
    (request) => request.userId === userId && request.friendId === friendId
  );

  if (requestExists) {
    return res.status(400).json({ message: 'Freundschaftsanfrage wurde bereits gesendet.' });
  }

  db.friendRequests.push({ userId, friendId });

  try {
    saveDB(db);
    res.status(201).json({ message: 'Freundschaftsanfrage gesendet.' });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Speichern der Anfrage.' });
  }
});

app.get('/users', (req, res) => {
  const db = loadDB();
  res.json(db.users);
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
