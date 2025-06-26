import "./Emotionitem.css";
import {getEmotionImage} from "./../util/get-emotion-image";

const Emotionitem = ({emotionId, emotionName, isSelected, onClick}) => {
    return (
        <div onClick={onClick} className={`Emotionitem ${isSelected ? `Emotionitem_on_${emotionId}` : ""}`}>
            <img className="emotion_img" src={getEmotionImage(emotionId)} />
            <div className="emotion_name">{emotionName}</div>
        </div>
    )
};

export default Emotionitem;