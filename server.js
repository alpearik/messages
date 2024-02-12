require('dotenv').config();
const express = require('express');
const app = express();
const Message = require('./messageModel');
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//Create
app.post('/messages', async (req, res) => {
  try {
    const id = await Message.create(req.body);
    const message = await Message.findById(id); // Assuming you have implemented findById
    res.status(201).json(message);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update
app.put('/messages/:id', async (req, res) => {
  try {
    await Message.findByIdAndUpdate(req.params.id, req.body);
    const updatedMessage = await Message.findById(req.params.id);
    if (!updatedMessage) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json(updatedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete
app.delete('/messages/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
