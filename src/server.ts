import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import { prisma } from "./db";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFoundHandler from "./middlewares/notFoundHanlder";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("API is running 😎");
});

app.use(notFoundHandler);
app.use(globalErrorHandler);

app.listen(port, async () => {
  try {
    await prisma.$connect();
    console.log(`[server]: Server is running at http://localhost:${port}`);
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
});
