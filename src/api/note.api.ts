import { Note } from "../types/note";
import { formatDate } from "../utils/date";
import { api } from "./axios";

interface NotesResponse {
  data: Note[];
  success: boolean;
  message?: string;
}

export interface CreateNoteParams {
  nt_patient_id: string;
  nt_raw_input: string;
  nt_audio: File | null;
}

export const InitialValuesCreateNote: CreateNoteParams = {
  nt_patient_id: "",
  nt_raw_input: "",
  nt_audio: null,
};

export const createNote = async (
  params: CreateNoteParams,
): Promise<NotesResponse> => {
  try {
    const formData = new FormData();

    formData.append("nt_patient_id", params.nt_patient_id);
    formData.append("nt_raw_input", params.nt_raw_input);
    if (params.nt_audio) {
      formData.append("nt_audio", params.nt_audio);
    }

    const { data } = await api.post<{
      data: any;
      success: boolean;
      message?: string;
    }>("/notes/setNotes", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: data.success,
      data: getNoteAdapter(data.data),
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: `Error creating note: ${error}`,
    };
  }
};

const getNoteAdapter = (response: any): Note[] => {
  let notes: Note[] = [];
  if (response && Array.isArray(response)) {
    notes = response.map((item: any) => ({
      id: item.nt_id,
      patient: item.nt_patient_id,
      rawInput: item.nt_raw_input,
      transcription: item.nt_transcription,
      aiSummary: item.nt_ai_summary,
      audioUrl: item.nt_audio_url,
      createdAt: formatDate(item.nt_created_at),
    }));
  }
  return notes;
};

export const getNotes = async (
  patientId: string | null,
): Promise<NotesResponse> => {
  try {
    const { data } = await api.post<{
      data: any;
      success: boolean;
      message?: string;
    }>("/notes/getNotes", { patientId });
    return {
      success: data.success,
      data: getNoteAdapter(data.data),
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Failed to fetch notes",
    };
  }
};

export const getNoteById = async (id: string): Promise<NotesResponse> => {
  try {
    const { data } = await api.get<{
      data: any;
      success: boolean;
      message?: string;
    }>(`/notes/getNotes/${id}`);
    return {
      success: data.success,
      data: getNoteAdapter(data.data),
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: "Failed to fetch note",
    };
  }
};
