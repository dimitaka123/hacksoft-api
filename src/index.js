import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { userRouter } from './controllers/users-controller.js';
import { postRouter } from './controllers/posts-controller.js';
import { commentRouter } from './controllers/comments-controller.js';



const app = express();

app.use(cors(), helmet(), express.json());

app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/comments', commentRouter);


app.listen(process.env.PORT || 5000, () => console.log(`App is listening on port ${process.env.PORT}`));

