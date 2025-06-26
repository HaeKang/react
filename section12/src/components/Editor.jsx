import "./Editor.css";
import Emotionitem from "./EmotionItem";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const emotionList = [
    {
        emotionId:1,
        emotionName:"완전 좋음"
    },
    {
        emotionId:2,
        emotionName:"좋음"
    },
    {
        emotionId:3,
        emotionName:"그럭저럭"
    },
    {
        emotionId:4,
        emotionName:"나쁨"
    },
    {
        emotionId:5,
        emotionName:"끔찍함"
    },
];

const getStringDate = (targetDate) => {
    // 날짜 -> yyyy-mm-dd 형태의 문자열로 반환
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();

    if (month < 10){
        month = `0${month}`;
    }

    if (date < 10){
        date = `0${date}`;
    }

    return `${year}-${month}-${date}`;
}

const Editor = ({onSubmit}) => {
    const nav = useNavigate();


    const [input, setInput] = useState({
        createDate : new Date(),
        emotionId : 3,
        content : "",
    });

    const onChangeInput = (e) => {
        let name = e.target.name;
        let val = e.target.value;

        if (name === "createDate"){
            val = new Date(val);
        }

        setInput({
            ...input,
            [name] : val,
        })
    };

    const onClickSubmitButton = () => {
        onSubmit(input);
    };

    return (
        <div className="Editor">
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input name="createDate" onChange={onChangeInput} value={getStringDate(input.createDate)} type="date" />
            </section>
            <section className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_list_wrapper">
                    {emotionList.map((item) => 
                        <Emotionitem 
                            onClick = {() => {
                                onChangeInput({
                                    target: {
                                        name: "emotionId",
                                        value : item.emotionId
                                    }
                                })
                            }}
                            key = {item.emotionId} 
                            {...item} 
                            isSelected = {item.emotionId === input.emotionId} 
                        /> 
                    )}
                    {/* <Emotionitem emotionId = {1} emotionName = {"완전좋음"} />
                    <Emotionitem emotionId = {2} emotionName = {"좋음"} />
                    <Emotionitem emotionId = {3} emotionName = {"보통"} />
                    <Emotionitem emotionId = {4} emotionName = {"나쁨"} />
                    <Emotionitem emotionId = {5} emotionName = {"완전나쁨"} /> */}
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <textarea name="content" value={input.content} onChange={onChangeInput} placeholder="오늘은 어땠나요?" ></textarea>
            </section>
            <section className="button_section">
                <Button text={"취소하기"} onClick={() => {nav(-1)}}/>
                <Button text = {"작성완료"} type = {"POSITIVE"} onClick={onClickSubmitButton} />
            </section>
        </div>
    );
};

export default Editor;