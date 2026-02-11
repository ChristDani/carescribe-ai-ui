import { useEffect, useRef, useState } from "react";
import NoteList from "../components/notes/note-list";
import { PatientSelect, PatientSelectRef } from "../components/patients/patient-select";
import { Patient } from "../types/patient";
import { getPatients } from "../api/patient.api";
import NoteForm from "../components/notes/note-form";

const DashboardPage = () => {
    const [selectedPatient, setSelectedPatient] = useState<Patient>({} as Patient);
    const modalRef = useRef<PatientSelectRef>(null);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isNoteFormOpen, setIsNoteFormOpen] = useState(false);

    const loadPatients = async () => {
        const result = await getPatients();
        setPatients(result.data);
    }

    const handlePatientSelect = (patient: Patient) => {
        setSelectedPatient(patient);
    };

    const handleNoteFormClose = () => {
        setIsNoteFormOpen(!isNoteFormOpen);
        setSelectedPatient({} as Patient);
        if (modalRef.current) {
            modalRef.current.clear();
        }
    }

    useEffect(() => {
        loadPatients();
    }, []);

    return (
        <>
            <div className="flex justify-between items-center">
                <PatientSelect ref={modalRef} list={patients} selected={selectedPatient} onSelect={handlePatientSelect} />
                <span className="btn px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer" onClick={() => setIsNoteFormOpen(true)}>
                    Agregar Nota
                </span>
            </div>
            <div className="flex items-center card mt-4 p-4 rounded bg-gray-50 shadow">
                <NoteList patient={selectedPatient} patients={patients} />
            </div>
            <NoteForm open={isNoteFormOpen} onClose={handleNoteFormClose} patients={patients} />
        </>
    );
}

export default DashboardPage;