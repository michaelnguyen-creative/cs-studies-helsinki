import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import * as routes from "./routes";

const app = express()
const PORT = 4000;

app.use(cors());
app.use(express.json())

app.get("/api/ping", (_req: Request, res: Response) => {
  res.json({ message: "pong" });
});

app.use('/api/diagnoses', routes.diagnosesRouter)
app.use('/api/patients', routes.patientsRouter)

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
