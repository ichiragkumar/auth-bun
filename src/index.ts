import express, { Request, Response } from "express";
import { ENV } from "./config/env";
import authRoutes from "./routes/auth";
const app = express();



app.use(express.json());
app.use("/auth", authRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Express running on Bun + TypeScript!");
});

app.get("/ping", (req: Request, res: Response) => {
  res.json({ message: "pong" });
});


app.listen(ENV.PORT, () => {
  console.log(`✅ Server running at http://localhost:${ENV.PORT}`);
});
