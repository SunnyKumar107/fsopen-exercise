import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatientEntry } from "../utils";
const patientRouter = express.Router();

patientRouter.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

patientRouter.get("/:id", (req, res) => {
  const patient = patientsService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.status(400);
  }
});

patientRouter.post("/", (req, res) => {
  try {
    const newEntry = toNewPatientEntry(req.body);

    const addedEntry = patientsService.addPatientEntry(newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default patientRouter;
