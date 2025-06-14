import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/todos', (req, res) => {
  res.json([{ id: 1, text: 'Learn Vue', completed: false }]);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});