import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

// 함수명 앞에 use가 붙으면 커스텀훅
const useDiary = (id) => {
    const data = useContext(DiaryStateContext);
    const [curDiaryItem, setCurDiaryItem] = useState();

    const nav = useNavigate();

    // mount 될때, prarms.id가 바뀔때 실행
    useEffect(() => {
        const currentDiaryItem = data.find((item) => String(item.id) === String(id));
    
        if (!currentDiaryItem){
            window.alert("존재하지 않는 일기입니다.");
            nav("/",{ replace: true }); 
        } 
        
        setCurDiaryItem(currentDiaryItem);  // state에 현재 아이템 저장

    }, [id]);

    return curDiaryItem;
};

export default useDiary;