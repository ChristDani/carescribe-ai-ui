import { Patient } from "./patient";

export interface Note {
  id: string;
  patient: Pick<Patient, 'id'>;
  rawInput?: string;
  transcription?: string;
  aiSummary?: string;
  audioUrl?: string;
  createdAt: string;
}