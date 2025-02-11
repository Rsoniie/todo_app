
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'

const app = express();

// console.log(process.env.MONGO_URI)


const uri = process.env.MONGO_URI;
console.log(uri);
const db_name = "TodoList"

await mongoose.connect(`${uri}/${db_name}`);
console.log("Mongo DB connected successfully");
const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  }
});

const Todo = mongoose.model('Todo', TodoSchema);

app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
    res.status(200).json({message: "Server is running"});
})

app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const newTodo = new Todo({
      text: req.body.text,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.delete('/api/todos/:id', async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
