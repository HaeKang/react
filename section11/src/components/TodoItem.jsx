import "./TodoItem.css"
import {memo, useContext} from "react";
import { TodoDispatchContext } from "../App";

const TodoItem =  ({id, isDone, content, date}) => {
    const {onUpdate, onDelete} = useContext(TodoDispatchContext);

    const onChangeCheckbox = () => {
        onUpdate(id);
    }

    const onClickDeleteBtn = () => {
        onDelete(id)
    }

    return (
        <div className="TodoItem">
            <input onChange={onChangeCheckbox} type="checkbox" checked={isDone}/>
            <div className="content">{content}</div>
            <div className="date">{new Date(date).toLocaleDateString()}</div>
            <button onClick={onClickDeleteBtn}>삭제</button>
        </div>
    );
};


export default memo(TodoItem);