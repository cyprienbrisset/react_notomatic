import s from "./style.module.css"
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {NoteForm} from "../../components/NoteForm/NoteForm";
import {useState} from "react";
import {NotesApi} from "../../api/notes.api";
import {deleteNote, updateNote} from "../../store/note/note.slice";

export function Note() {

    const { noteId} = useParams()
    const [isEditable, setIsEditable] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const note = useSelector((store) =>
        store.NOTE.noteList.find((note) => note.id === noteId)
    );

    async function submit(formValues) {
        const updatedNote =  await NotesApi.updateNote({...formValues, id: note.id})
        dispatch(updateNote(updatedNote))
        setIsEditable(false)
    }

    function deleteNote_(note) {
        if (window.confirm("Supprimer la note")) {
            NotesApi.deleteById(note.id)
            dispatch(deleteNote(note))
            navigate("/")
        }
    }

    return (
        <>
            {note && (
                <NoteForm
                    isEditable={isEditable}
                    title={isEditable ? "Edit Note" :note.title}
                    note={note}
                    onClickEdit={() => {
                        setIsEditable(!isEditable)
                    }}
                    onClickTrash={() => {
                        deleteNote_(note)
                    }}
                    onSubmit={isEditable && submit}
                />
            )}
        </>
    )
}