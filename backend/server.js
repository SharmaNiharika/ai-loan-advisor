import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import advisorRoutes from "./routes/advisor.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "AI Loan Advisor API"
  });
});

app.use("/api/advisor", advisorRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found"
  });
});

app.listen(PORT, () => {
  console.log(`AI Loan Advisor API running on port ${PORT}`);
});