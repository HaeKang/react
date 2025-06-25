import {getEmotionImage} from "./../util/get-emotion-image";
import "./DiaryItem.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({id, emotionId, createDate, content}) => {
    const nav = useNavigate();


    return (
        <div className="DiaryItem">
            <div
                onClick={() => nav(`/diary/${id}`)}
                className={`img_section img_section_${emotionId}`}
            >
                <img src={getEmotionImage(emotionId)} />
            </div>
            <div 
                className="info_section"
                onClick={() => nav(`/diary/${id}`)}
            >
                <div className="created_date">
                    {new Date(createDate).toLocaleDateString()}
                </div>
                <div className="content">
                    {content}
                </div>
            </div>
            <div className="button_section">
                <Button text={"수정하기"} onClick={() => nav(`/edit/${id}`)} />
            </div>
        </div>
    );
};

export default DiaryItem;