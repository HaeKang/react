import "./TodoItem.css"
import {memo} from "react";

const TodoItem =  ({id, isDone, content, date, onUpdate, onDelete}) => {
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


// 교차 컴포넌트 (HOC)
// export default memo(TodoItem, (prevProps, nextProps) => {
//     // 반환값에 따라서 props가 바뀌었는지 판단
//     // T -> 바뀌지 않음 (리렌더링 X)
//     // F -> 바뀜 (리렌더링)

//     if(prevProps.id !== nextProps.id) return false;
//     if(prevProps.isDone !== nextProps.isDone) return false;
//     if(prevProps.content !== nextProps.content) return false;
//     if(prevProps.date !== nextProps.date) return false;

//     return true;
// });
export default memo(TodoItem);