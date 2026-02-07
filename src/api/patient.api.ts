import { Patient } from "../types/patient";
import { formatDate } from "../utils/date";
import { api } from "./axios";

interface PatientsResponse {
  data: Patient[];
  success: boolean;
  message?: string;
}

const calculateAge = (dob: string): number => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const getPatientsAdapter = (response: any): Patient[] => {
  let patients: Patient[] = [];
  if (response && Array.isArray(response)) {
    patients = response.map((item: any) => ({
      id: item.pt_id,
      firstName: item.pt_first_name,
      lastName: item.pt_last_name,
      fullName: `${item.pt_first_name} ${item.pt_last_name}`,
      age: calculateAge(item.pt_dob),
      dob: formatDate(item.pt_dob, "DD/MM/YYYY"),
      gender: item.pt_gender,
      createdAt: formatDate(item.pt_created_at),
    }));
  }
  return patients;
};

export const getPatients = async (): Promise<PatientsResponse> => {
  try {
    const { data } = await api.get<{
      data: any;
      success: boolean;
      message?: string;
    }>("/patients/getPatients");

    return {
      success: data.success,
      data: getPatientsAdapter(data.data),
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: `Error fetching patients: ${error}`,
    };
  }
};

export const getPatientsById = async (
  id: string,
): Promise<PatientsResponse> => {
  try {
    const { data } = await api.post<{
      data: any;
      success: boolean;
      message?: string;
    }>("/patients/getPatient", { id });

    return {
      success: data.success,
      data: getPatientsAdapter(data.data),
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: `Error fetching patients: ${error}`,
    };
  }
};
