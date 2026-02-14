import { FC } from "react";
import ModalBase from "../modals/modal-base"
import { Note } from "../../types/note";
import { Patient } from "../../types/patient";
import { env } from "../../env";

interface NoteDetailProps {
    note: Note;
    patient: Patient;
    open: boolean;
    onClose: () => void;
}

const NoteDetail: FC<NoteDetailProps> = ({ open, onClose, note, patient }) => {
    const baseApiUrl = env.Api_Url
    return (
        <ModalBase open={open} onClose={onClose} title="Detalle de nota">
            <div className="flex h-[60vh] overflow-hidden">
                {/* Columna de datos del paciente */}
                <div className="border-r w-auto pr-4">
                    <h3 className="text-lg font-semibold mb-4">Datos del Paciente</h3>
                    <div className="space-y-3">
                        <p><strong>Nombres:</strong> {patient.firstName}</p>
                        <p><strong>Apellidos:</strong> {patient.lastName}</p>
                        <p><strong>Género:</strong> {patient.gender}</p>
                        <p><strong>Fecha de nacimiento:</strong> {patient.dob}</p>
                        <p><strong>Edad:</strong> {patient.age}</p>
                    </div>
                </div>

                {/* Columna de datos de la nota */}
                <div className="overflow-y-auto pl-4 w-auto max-w-lg">
                    <h3 className="text-lg font-semibold mb-4">Datos de la Nota</h3>
                    <div className="space-y-3">
                        <p><strong>Fecha:</strong> {note.createdAt}</p>
                        
                        <p><strong>Observación:</strong> {note.rawInput}</p>

                        {note.audioUrl && (
                            <div>
                                <p><strong>Audio:</strong></p>
                                <audio controls className="w-full mt-2">
                                    <source src={`${baseApiUrl}${note.audioUrl}`} type="audio/mpeg" />
                                    Tu navegador no soporta el elemento de audio.
                                </audio>
                            </div>
                        )}

                        {note.transcription && (
                            <div>
                                <p><strong>Texto Transcrito:</strong></p>
                                <p className="text-sm text-gray-600 mt-2">{note.transcription}</p>
                            </div>
                        )}

                        {note.aiSummary && (
                            <div>
                                <p><strong>Texto Procesado por IA:</strong></p>
                                <p className="text-sm text-gray-700 mt-2">{note.aiSummary}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ModalBase>
    );
}

export default NoteDetail;