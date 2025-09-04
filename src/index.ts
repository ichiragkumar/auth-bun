import express, { Request, Response } from "express";
import { ENV } from "./config/env";
import authRoutes from "./routes/auth";
const app = express();



app.use(express.json());
app.use("/auth", authRoutes);


app.get("/health", (req: Request, res: Response) => {
  res.send("🚀 Express running on Bun + TypeScript! 🚀");
});




app.listen(ENV.PORT, () => {
  console.log(`✅ Server running at http://localhost:${ENV.PORT}`);
});
