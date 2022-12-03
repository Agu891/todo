import { Router } from 'express';
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from '../controller/todo.js';

const router = Router();
// este va a ser el endpoint raiz /api/v1/todo
router.get('/', getTodos).put('/', updateTodo).post('/', createTodo);
router.delete('/:id', deleteTodo);
export { router as todoRouter };
