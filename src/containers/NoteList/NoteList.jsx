import s from "./style.module.css"
import {TextCard} from "../../components/TextCard/TextCard";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {NotesApi} from "../../api/notes.api";
import {deleteNote} from "../../store/note/note.slice";

export function NoteList({noteList}) {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    function deleteNote_(note) {
        if (window.confirm("Supprimer la note")) {
            NotesApi.deleteById(note.id)
            dispatch(deleteNote(note))
        }
    }

    return (
        <div className={`row justify-content-center ${s.cards_container}`}>
            {noteList.map((note) => {
                return (
                    <div className={s.card_container}>
                        <TextCard
                            key={note.id}
                            title={note.title}
                            subtitle={note.subtitle}
                            content={note.content}
                            onClickTrash={() => {
                                deleteNote_(note)
                            }}
                            onClick={() => navigate("/note/" + note.id)}
                        />
                    </div>
                )
            })}
        </div>
    )
}
