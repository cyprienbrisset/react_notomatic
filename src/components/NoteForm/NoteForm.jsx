import s from "./style.module.css"
import {PencilFill, Trash, TrashFill} from "react-bootstrap-icons";
import {ButtonPrimary} from "../ButtonPrimary/ButtonPrimary";
import {useState} from "react";
import {ValidatorService} from "../../services/form-validators";
import {FieldError} from "../FieldError/FieldError";


const VALIDATORS = {
    title: (value) => {
        return ValidatorService.min(value, 3) || ValidatorService.max(value, 20)
    },
    content: (value) => {
        return ValidatorService.min(value, 3)
    }
}

export function NoteForm(
    {
        isEditable = true,
        note,
        title,
        onSubmit,
        onClickEdit,
        onClickTrash
    }) {

    const [formValues, setFormValues] = useState({title: note?.title || "", content: note?.content || ""})
    const [formErrors, setFormErrors] = useState({title: note?.title ? undefined : '', content: note?.content ? undefined :''});

    function hasError() {
        return Object.values(formErrors).some(error => error !== undefined)
    }

    function updateFormValues(e) {
        setFormValues({...formValues, [e.target.name]: e.target.value})
        validate(e.target.name, e.target.value)
    }

    function validate(fieldName, fieldValue) {
        setFormErrors({
            ...formErrors,
            [fieldName]: VALIDATORS[fieldName](fieldValue)
        })
    }

    const actionIcons = (
        <>
            <div className={`col-1`}>
                {onClickEdit && <PencilFill onClick={onClickEdit} className={s.icon}/>}
            </div>
            <div className={`col-1`}>
                {onClickTrash && <TrashFill onClick={onClickTrash} className={s.icon}/>}
            </div>
        </>
    )
    const titleInput = (
        <div className={`mb-5`}>
            <label className="form-label">Title</label>
            <input onChange={updateFormValues} type="text" name="title" className="form-control" value={formValues.title}/>
            <FieldError message={formErrors.title}/>
        </div>
    )
    const contentInput = (
        <div className={`mb-5`}>
            <label className="form-label">Content</label>
            <textarea onChange={updateFormValues} name="content" className="form-control" value={formValues.content}/>
            <FieldError message={formErrors.content}/>
        </div>
    )
    const submitButton = (
        <div className={s.submit_button}>
            <ButtonPrimary isDisabled={hasError()} onClick={() => onSubmit(formValues)} children={"Submit"}/>
        </div>
    )

    return (
        <form className={s.container}>
            <div className={`row justify-content-space-between`}>
                <div className={`col-10`}>
                    <h2 className={`mb-3`}>{title}</h2>
                </div>
                {actionIcons}
            </div>
            <div className={`mb-3 ${s.title_input_container}`}>{isEditable && titleInput}</div>
            <div className={`mb-3`}> {isEditable ? contentInput : <pre>{note.content}</pre>}</div>
            {onSubmit && submitButton}
        </form>
    )
}