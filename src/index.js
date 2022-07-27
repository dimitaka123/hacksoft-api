import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { userRouter } from './controllers/users-controller.js';
import { postRouter } from './controllers/posts-controller.js';
import { commentRouter } from './controllers/comments-controller.js';

let port = process.env.PORT;

const app = express();

app.use(cors(), helmet(), express.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);


app.listen(port, () => console.log(`App is listening on port ${port}`));

