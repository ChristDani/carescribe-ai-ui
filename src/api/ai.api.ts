import { api } from "./axios";

interface TranscriptionAiResponse {
  data: {text?: string; audioUrl?: string};
  success: boolean;
  message?: string;
}

export const processAudioForTranscription = async (
  audioFile: File,
): Promise<TranscriptionAiResponse> => {
  const formData = new FormData();
  formData.append("file", audioFile);
  try {
    const { data } = await api.post<{
      data: { text?: string; audioUrl?: string };
      success: boolean;
      message?: string;
    }>("/ai/transcription", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (data.success) {
      return {
        data: data.data,
        success: data.success,
        message: data.message,
      };
    } else {
      throw new Error(data.message || "Failed to process audio");
    }
  } catch (error) {
    console.error("Error processing audio for transcription:", error);
    throw error;
  }
};
