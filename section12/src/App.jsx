import {Routes, Route, Link, useNavigate} from "react-router-dom";
import { useReducer, useRef, createContext, useEffect, useState } from "react";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit"
import Notfound from "./pages/Notfound";


// const mockData = [
//   {
//     id : 1,
//     createDate : new Date("2025-06-25").getTime(),
//     emotionId : 1,
//     content : "1번 일기 내용"
//   },
//   {
//     id : 2,
//     createDate : new Date("2025-06-24").getTime(),
//     emotionId : 2,
//     content : "2번 일기 내용"
//   },
//   {
//     id : 3,
//     createDate : new Date("2025-04-22").getTime(),
//     emotionId : 3,
//     content : "3번 일기 내용"
//   },
// ];

function reducer(state, action){
  let nextState;

  switch(action.type){
    case "INIT":
      return action.data;

    case "CREATE":
      { 
        nextState = [action.data, ...state];
        break;
      }
    case "UPDATE":
      { 
        nextState = state.map((item) => String(item.id) === String(action.data.id) ? action.data : item);
        break;
      }
    case "DELETE":
      { 
        nextState = state.filter((item) => String(item.id) !== String(action.id));
        break;
      }

    default:
      { nextState = state;}
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}


export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData){
      setIsLoading(false);
      return ;
    }
    
    // 저장된 아이템으로 초기화 
    const parsedData = JSON.parse(storedData);
    if (!Array.isArray(parsedData)){
      setIsLoading(false);
      return ;
    }

    // useRef인 idRef 갱신
    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId){
        maxId = Number(item.id);
      }
    });
    idRef.current = maxId + 1;

    dispatch({
      type : "INIT",
      data : parsedData
    });

    // 로딩종료
    setIsLoading(false);

  }, []);

  /*
    localStorage.setItem("person", JSON.stringify({'name' : '앙이'}));  
    if (localStorage.getItem("person") != undefined){
      JSON.parse(localStorage.getItem("person")); 
    } 
    localStorage.removeItem("person");
    */

  // 새로운 일기 추가
  const onCreate = (createDate, emotionId, content) => {
    dispatch({
      type : "CREATE",
      data : {
        id : idRef.current++,
        createDate : createDate,
        emotionId : emotionId,
        content : content,
      }
    })
  };

  // 일기 수정
  const onUpdate = (id, createDate, emotionId, content) => {
    dispatch({
      type : "UPDATE",
      data : {
        id,
        createDate,
        emotionId,
        content
      }
    })
  };

  // 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type : "DELETE",
      id
    })
  };

  if(isLoading){
    return <div>데이터 로딩중입니다.</div>;
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate, onUpdate, onDelete}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App
