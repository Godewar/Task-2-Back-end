const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://lokeshgodewar607:3W2PXBZMQIbSYur6@cluster0.eam1odx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Schema and Model
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, 'Path `content` is required.']
    },
});

const Note = mongoose.model('Note', noteSchema);

// Routes
app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.post('/notes', async (req, res) => {
    const { content } = req.body;
    const note = new Note({ content });
    await note.save();
    res.json(note);
});

app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.sendStatus(200);
});

// Start Server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
