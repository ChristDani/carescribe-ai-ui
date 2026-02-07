import { FC, useEffect, useState } from "react";
import { Note } from "../../types/note";
import { Patient } from "../../types/patient";
import { getPatientsById } from "../../api/patient.api";
import NoteDetail from "./note-detail";

interface NoteItemProps {
    note: Note;
}

const NoteItem: FC<NoteItemProps> = ({ note }) => {
    const [patient, setPatient] = useState<Patient>({} as Patient);
    const [detailOpen, setDetailOpen] = useState(false);

    const loadPatient = async () => {
        const result = await getPatientsById(String(note.patient));
        setPatient(result.data[0]);
    }

    const handleOpenDetail = () => {
        setDetailOpen(!detailOpen);
    }

    useEffect(() => {
        loadPatient();
    }, [note]);

    return (
        <>
            <div className="p-4 border rounded mb-2 w-full cursor-pointer hover:bg-gray-200" onClick={handleOpenDetail}>
                <h3 className="text-xl font-semibold mb-2">{patient.fullName} - {note.createdAt}</h3>
                <p>{note.rawInput}</p>
            </div>
            <NoteDetail note={note} patient={patient} open={detailOpen} onClose={handleOpenDetail} />
        </>
    );
}

export default NoteItem;