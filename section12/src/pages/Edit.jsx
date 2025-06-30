import Header from "./../components/Haeder";
import Button from "./../components/Button";
import Editor from "./../components/Editor";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const {onUpdate, onDelete} = useContext(DiaryDispatchContext);
    const data = useContext(DiaryStateContext);
    const [curDiaryItem, setCurDiaryItem] = useState();

    // 삭제 버튼
    const onClickDelete = () => {
        if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요")){
            // url 파라미터에서 id 가져옴
            // 일기 삭제 로직
            onDelete(params.id);
            nav("/", {replace : true}); // 뒤로가기 방지
        }
    };

    // mount 될때, prarms.id가 바뀔때 실행
    useEffect(() => {
        const currentDiaryItem = data.find((item) => String(item.id) === String(params.id));
    
        if (!currentDiaryItem){
            window.alert("존재하지 않는 일기입니다.");
            nav("/",{ replace: true }); 
        } 
        
        setCurDiaryItem(currentDiaryItem);  // state에 현재 아이템 저장

    }, [params.id]);

    /*
        nav는 컴포넌트가 mount 된 후에 작동할 수 있음.
        현재 이 라인은 컴포넌트 mount 전에 작동하기때문에 nav 작동 X
        따라서 getCurrentDiaryItem 함수는 useEffect 안에 넣어줘야함.
    */
    // const currentDiaryItem = getCurrentDiaryItem();

    // 수정 버튼
    const onSubmit = (input) => {
        if (window.confirm("일기를 정말 수정할까요?")){
            onUpdate(params.id, input.createDate.getTime(), input.emotionId, input.content);
            nav("/", {replace: true});
        }
    };

    return (
        <div>
           <Header title = {"일기 수정하기"} 
            leftChild={<Button text={("< 뒤로가기")} onClick={() => {nav(-1)}}/>} 
            rightChild={<Button text={("삭제하기")} type = {"NEGATIVE"} onClick={onClickDelete} />} 
           />
           <Editor initData = {curDiaryItem} onSubmit = {onSubmit} />

        </div>
    );
}

export default Edit;