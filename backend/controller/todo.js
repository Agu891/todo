import Todo from '../models/Todo.js';

export const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json({ data: todos, message: 'Todos los todos' });
};
export const createTodo = async (req, res) => {
  const { description } = req.body;
  const todo = await Todo.create({ description: description });

  res.json({ data: todo, message: 'Todo creado correctamente' });
};

export const updateTodo = async (req, res) => {
  const { id, isComplete } = req.body;
  const todo = await Todo.findByIdAndUpdate(id, { isComplete }, { new: true });
  res.json({ data: todo, message: 'todo actualizado correctamente' });
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ data: [], message: 'todo eliminiado correctamente' });
};
