import patientsData from "../../data/patients";
import {
  NewPatientEntry,
  NonSensitivePatientEntry,
  PatientEntry,
} from "../types";
// import { v1 as uuid } from "uuid";

const getEntries = (): PatientEntry[] => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): PatientEntry | undefined => {
  return patientsData.find((patient) => patient.id === id);
};

const addPatientEntry = (entry: NewPatientEntry): PatientEntry => {
  const newId = "sdfasf4564fgasfgfgsfd";
  const newPatient = {
    id: newId,
    ...entry,
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  findById,
  addPatientEntry,
};
