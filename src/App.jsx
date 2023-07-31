import {Outlet} from "react-router-dom";
import {Header} from "./layout/Header/Header";
import {NotesApi} from "./api/notes.api";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {setNoteList} from "./store/note/note.slice";

import s from "./style.module.css"

export function App() {

    const dispatch = useDispatch()

    async function fetchAllNotes() {
        const noteList = await NotesApi.fetchAll()
        dispatch(setNoteList(noteList))
    }


    useEffect(() => {
        return () => {
            fetchAllNotes()
        };
    }, []);


    return (
        <div className={"container-fluid"}>
            <Header/>
            <div className={s.outlet_container}>
                <Outlet/>
            </div>
        </div>
    );
}
