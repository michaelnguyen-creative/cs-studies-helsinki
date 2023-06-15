import { Router } from "express";
import diagnoses from "../../data/diagnoses";

const diagnosesRouter = Router();

diagnosesRouter.get("/", (_req, res) => {
  res.status(200).json(diagnoses);
});

export default diagnosesRouter;
