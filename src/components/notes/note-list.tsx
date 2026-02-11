import { FC, useEffect, useState } from "react";
import NoteItem from "./note-item";
import { Note } from "../../types/note";
import { getNotes } from "../../api/note.api";
import { Patient } from "../../types/patient";

interface NoteListProps {
    patient: Patient;
    patients: Patient[];
}

const NoteList: FC<NoteListProps> = ({ patient, patients }) => {
    const [noteList, setNoteList] = useState<Note[]>([]);
    const loadNotes = async () => {
        const result = await getNotes(patient.id);
        setNoteList(result.data);
    }
    useEffect(() => {
        loadNotes();
    }, [patient]);
    return (
        <div className="flex w-full gap-2 flex-col">
            {noteList.length != 0 ? (
                noteList.map((note) => (
                    <NoteItem key={note.id} note={note} patients={patients} />
                ))
            ) : (
                <p>There's no notes available.</p>
            )}
        </div>
    );
}

export default NoteList;