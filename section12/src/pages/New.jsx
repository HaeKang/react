import Header from "./../components/Haeder";
import Button from "./../components/Button";
import Editor from "./../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePageTitle";

const New = () => {
    const nav =  useNavigate();
    const {onCreate} = useContext(DiaryDispatchContext);
    usePageTitle('새 일기 쓰기');

    const onSubmit = (input) => {
        onCreate(input.createDate.getTime(), input.emotionId, input.content);
        nav("/", {replace : true}); // 뒤로가기 방지
    };

    return (
    <div>
        <Header title={"새 일기 쓰기"} leftChild={<Button text={("< 뒤로가기")} onClick={()=>{nav(-1)}} />}/>
        <Editor onSubmit={onSubmit} />
    </div>
    );
}

export default New;