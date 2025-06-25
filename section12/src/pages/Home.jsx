import { useState, useContext } from "react";
import {DiaryStateContext} from "./../App";

import Header from "./../components/Haeder";
import Button from "./../components/Button";
import DiaryList from "../components/DiaryList";

// 해당하는 달에 쓴 데이터만 뽑기
const getMonthlyData = (pivotDate, data) => {
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0).getTime();
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1, 0, 23, 59, 59).getTime(); // day를 0으로 하면 이전달의 마지막날로 설정됨
    
    return data.filter((item) => item.createDate >= beginTime && item.createDate <= endTime );
}

const Home = () => {
    const data = useContext(DiaryStateContext); // DiaryStateContext에서 받은 data

    const [pivotDate, setPivotDate] = useState(new Date()); // 날짜 state

    const monthlyData = getMonthlyData(pivotDate, data);    // 필터링이 된 데이터들


    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };

    return (
        <div>
            <Header 
                title = {`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
                leftChild={<Button text={"<"} onClick={onDecreaseMonth}/>}
                rightChild={<Button text={">"} onClick={onIncreaseMonth}/>}
            />
            <DiaryList data={monthlyData} />
        </div>
    );
}

export default Home;