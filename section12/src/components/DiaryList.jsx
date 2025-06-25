import Button from "./Button";
import "./DiaryList.css";
import DiaryItem from "./DiaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({data}) => {
    const nav = useNavigate();
    const [sortType, setSortType] = useState("latest");

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    };

    const getSortedData = () => {
        return data.toSorted((a, b) => {
            if (sortType == "oldest"){
                return Number(a.createDate)- Number(b.createDate);
            } else {
                return Number(b.createDate) - Number(a.createDate);
            }
        }); // toSorted를 통해 기존 배열 변경 X 새로운 배열 return 
    }

    const sortedData = getSortedData();

    return (
        <div className="DiaryList">
            <div className="menu_bar">
                <select onChange={onChangeSortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된 순</option>
                </select>
                <Button type={"POSITIVE"} text={"새로운 일기 쓰기"} onClick={() => nav("/new")}/>
            </div>
            <div className="list_wrapper">
                {sortedData.map((item) => <DiaryItem key={item.id} {...item}/>)}
            </div>
        </div>
    );
};

export default DiaryList;