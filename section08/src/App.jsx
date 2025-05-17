import { useState, useRef, useReducer } from 'react'
import './App.css'
import Header from "./components/Header"
import Editor from "./components/Editor"
import List from "./components/List"

// 재생성 필요없으므로 외부에 
const mockData = [
  {
    id : 0,
    isDone : false,
    content : "React 겅부",
    date : new Date().getTime(),
  },
  {
    id : 1,
    isDone : true,
    content : "React 겅부2",
    date : new Date().getTime(),
  },
  {
    id : 2,
    isDone : false,
    content : "React 겅부3",
    date : new Date().getTime(),
  }
];

function reducer(state, action){
  switch(action.type){
    case 'CREATE':
      return [action.data, ...state]
    case 'UPDATE':
      return state.map((item) => item.id === action.targetId ? {...item, isDone: !item.isDone} : item)
    case 'DELETE':
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  // const [todos, setTodos] = useState(mockData);
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  // const onCreate = (content) => {
  //     const newTodo = {
  //       id : idRef.current++,
  //       isDone : false,
  //       content : content,
  //       date : new Date().getTime()
  //     };

  //     setTodos([newTodo, ...todos]);
  // };
  const onCreate = (content) => {
    dispatch({
        type: "CREATE",
        data : {
          id : idRef.current++,
          isDone : false,
          content : content,
          date : new Date().getTime()
        }
    });
  }

  // const onUpdate = (targetId) => {
  //   // todos State의 값들 중에 targetId와 일치하는 id만 수정

  //   // 인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 바꾼 새로운 배열
  //   setTodos(todos.map((todo) => todo.id === targetId ? {...todo, isDone : !todo.isDone} : todo));
  // }

  const onUpdate = (targetId) => {
    dispatch({
      type : "UPDATE",
      targetId : targetId
    });
  }

  // const onDelete = (targetId) => {
  //   // 인수 : todos 배열에서 targetId와 일치하는 id만 삭제한 새로운 배열
  //   setTodos(todos.filter((todo) => todo.id !== targetId));
  // }
  const onDelete = (targetId) => {
    dispatch({
      type:"DELETE",
      targetId: targetId
    })
  }


  return (
    <div className='App'>
      <Header />
      <Editor onCreate={onCreate} />
      <List todos = {todos} onUpdate = {onUpdate} onDelete = {onDelete}/>
    </div>
  )
}

export default App
