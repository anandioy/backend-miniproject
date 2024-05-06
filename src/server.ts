import express, { Request, Response, Application } from "express";

const app: Application = express();

const userRouter = require('./routes/userRoute'); 

app.use('/api', userRouter)

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});