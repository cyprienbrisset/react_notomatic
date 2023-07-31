import s from "./style.module.css"
import {NoteForm} from "../../components/NoteForm/NoteForm";
import {NotesApi} from "../../api/notes.api";
import {useDispatch} from "react-redux";
import {addNote} from "../../store/note/note.slice";
import {useNavigate} from "react-router-dom";

export function NoteCreate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function createNote(formValues) {
        const createdNote = await NotesApi.createNote({...formValues, created_at: new Date().toLocaleDateString()})
        dispatch(addNote(createdNote))
        navigate("/")
    }
    return (
        <NoteForm title={"Create a note"} onSubmit={createNote}/>
    )
}