import "./Editor.css"
import { useState, useRef, useContext} from "react";
import { TodoDispatchContext } from "../App";

const Editor = () => {
    // TodoContext를 사용하기 위해 useContext 훅을 사용 (구조분해할당)
    const {onCreate} = useContext(TodoDispatchContext);

    const[content, setContent] = useState("");
    const contentRef = useRef();

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }

    const onSubmit = () => {
        if (content === ""){
            contentRef.current.focus();
            return;
        }

        onCreate(content);
        setContent("");
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13){
            onSubmit();
        }
    }

    return (
        <div className="Editor">
            <input onKeyDown={onKeyDown} ref = {contentRef} value = {content} onChange={onChangeContent} type="text" placeholder="새로운 Todo..." name="" id="" />
            <button onClick={onSubmit}>추가</button>
        </div>
    );
};

export default Editor;