import express from "express";
import patientService from "../services/patientService";
import patientParser from "../utils/patientParser";
import entryParser from "../utils/entryParser";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  const patients = patientService.getPatients();
  res.status(200).json(patients);
});

patientsRouter.post("/", (req, res) => {
  try {
    const patient = patientParser.getPatientFromRequest(req.body);
    const addedPatient = patientService.addPatient(patient);
    res.status(201).json(addedPatient);
  } catch (error) {
    let errorMessage = "Oops! Something went wrong. ";
    if (error instanceof Error) {
      errorMessage += errorMessage.concat(`Error: ${error.message}`);
    }
    res.status(400).send(errorMessage);
  }
});

patientsRouter.get("/:id", (req, res) => {
  const patientId = req.params.id;
  const patientInfo = patientService.getPatientById(patientId);
  if (!patientInfo) res.status(400).send({ error: "Malformatted id" });
  res.status(200).json(patientInfo);
});

patientsRouter.post("/:id/entries", (req, res) => {
  try {
    const patientId = req.params.id;
    const entry = entryParser.getEntryFromRequest(req.body);
    const createdEntry = patientService.addPatientEntry(patientId, entry);
    res.status(201).json(createdEntry);
  } catch (error) {
    let errorMessage = "Oops! Something went wrong. ";
    if (error instanceof Error) {
      errorMessage += `Error: ${error.message}`
    };
    res.status(400).send({ error: errorMessage });
  }
});

export default patientsRouter;
