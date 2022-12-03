import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import { todoRouter } from './routes/todo.js';
import cors from 'cors';
const server = express();

const PORT = process.env.PORT || 5000;
//Load ENV vars
dotenv.config();
//ConnectDB
connectDB();
//cors enable
server.use(cors());
//usamos el middleware para parsear json en el body
server.use(express.json());
//Routes
server.use('/api/v1/todo', todoRouter);
server.get('/', (req, res) => {
  res.json({ messsage: 'deberias iniciar los request en /api/v1/<entidad> ' });
});

server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
