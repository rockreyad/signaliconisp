import express, { type Request, type Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import bkashPaymentRoute from './routes/bkashPayment.routes';
import userRoute from './routes/user.routes';
import packageRoute from './routes/package.routes';
import subscriptionRoute from './routes/subscription.routes';
import { requestLogger } from './middleware/requestLogger';
import { logger } from './utils/logger';
import { env } from './utils/env';

const app = express();

//middleware
app.use(requestLogger);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/api/bkash', bkashPaymentRoute);
app.use('/api/users', userRoute);
app.use('/api/packages', packageRoute);
app.use('/api/subscriptions', subscriptionRoute);

app.get('/', (req: Request, res: Response) => {
  try {
    res.send('<h1>Hello I am from Bkash Server</h1>');
  } catch (e) {
    console.log(e);
  }
});

//Server setup
app.listen(env.PORT, () => {
  logger.success(`Server is running on port:${env.PORT}`);
});
