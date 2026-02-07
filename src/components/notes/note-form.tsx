import { useRef, useState } from "react";
import ModalBase from "../modals/modal-base";
import { PatientSelect, PatientSelectRef } from "../patients/patient-select";
import { Patient } from "../../types/patient";
import { createNote, InitialValuesCreateNote } from "../../api/note.api";

interface NoteFormProps {
    open: boolean;
    onClose: () => void;
    patients: Patient[];
}

const NoteForm: React.FC<NoteFormProps> = ({ open, onClose, patients }) => {
    const [params, setParams] = useState(InitialValuesCreateNote);
    const modalRef = useRef<PatientSelectRef>(null);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [selectedPatient, setSelectedPatient] = useState<Patient>({} as Patient);

    const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAudioFile(e.target.files[0]);
        }
    };

    const handlePatientSelect = (patient: Patient) => {
        setSelectedPatient(patient);
        setParams({ ...params, nt_patient_id: patient.id });
    };

    const handleClear = () => {
        setAudioFile(null);
        handlePatientSelect({} as Patient);
        setParams(InitialValuesCreateNote);
        const audioInput = document.getElementById("audio-file") as HTMLInputElement;
        if (audioInput) {
            audioInput.value = "";
        }
        if (modalRef.current) {
            modalRef.current.clear();
        }
    };

    const handleChangeTranscription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setParams({ ...params, nt_transcription: e.target.value });
    }

    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setParams({ ...params, nt_raw_input: e.target.value });
    }

    const handleChangeAiProcessedText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setParams({ ...params, nt_ai_summary: e.target.value });
    }

    const handleSubmit = async () => {
        const result = await createNote(params);
        if (result.success) {
            handleClear();
            onClose();
        } else {
            alert("Failed to create note: " + result.message);
        }
    };

    const primaryBtn = {
        text: "Guardar",
        onClick: handleSubmit,
        disabled: !params.nt_raw_input || !selectedPatient.id, // Deshabilitar si no hay descripción, archivo o paciente seleccionado
    };

    const secondaryBtns = [
        {
            text: "Limpiar",
            onClick: handleClear,
            disabled: !params.nt_raw_input && !audioFile && !selectedPatient.id, // Deshabilitar si no hay nada que limpiar
        }
    ];

    return (
        <ModalBase open={open} onClose={onClose} title="Agregar nota" primaryBtn={primaryBtn} secondaryBtn={secondaryBtns}>
            <div className="flex flex-wrap flex-row gap-6 justify-around">
                <div className="w-[45%]">

                    <div className="mb-4">
                        <span className="block text-sm font-medium mb-2">Seleccione al paciente</span>
                        <PatientSelect ref={modalRef} list={patients} selected={selectedPatient} onSelect={handlePatientSelect} />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="audio-file" className="block text-sm font-medium mb-2">
                            Archivo de audio
                        </label>
                        <input
                            id="audio-file"
                            type="file"
                            accept="audio/*"
                            className="w-full border rounded px-3 py-2"
                            onChange={handleAudioChange}
                        />
                        {audioFile && <p className="text-sm text-gray-600 mt-1">Archivo: {audioFile.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="transcription" className="block text-sm font-medium mb-2">
                            Transcripción del audio
                        </label>
                        <textarea
                            id="transcription"
                            placeholder="Ingrese la transcripción del audio aquí..."
                            className="w-full border rounded px-3 py-2"
                            rows={4}
                            value={params.nt_transcription}
                            onChange={handleChangeTranscription}
                        />
                    </div>
                </div>
                <div className="w-[45%]">
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium mb-2">
                            Nota médica
                        </label>
                        <textarea
                            id="description"
                            placeholder="Ingrese la descripción médica aquí..."
                            className="w-full border rounded px-3 py-2"
                            rows={5}
                            value={params.nt_raw_input}
                            onChange={handleChangeDescription}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="aiProcessedText" className="block text-sm font-medium mb-2">
                            Texto procesado por IA
                        </label>
                        <textarea
                            id="aiProcessedText"
                            placeholder="Ingrese el texto procesado por IA aquí..."
                            className="w-full border rounded px-3 py-2"
                            rows={4}
                            value={params.nt_ai_summary}
                            onChange={handleChangeAiProcessedText}
                        />
                    </div>
                </div>
            </div>
        </ModalBase>
    );
}

export default NoteForm;