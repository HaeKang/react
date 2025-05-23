import { useState, useRef, useReducer, useCallback, createContext, useMemo } from 'react'
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

// context 생성 -> 이렇게 컴포넌트 외부에 생성함 (재생성 방지)
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();


function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = useCallback((content) => {
    dispatch({
        type: "CREATE",
        data : {
          id : idRef.current++,
          isDone : false,
          content : content,
          date : new Date().getTime()
        }
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type : "UPDATE",
      targetId : targetId
    });
  }, []);

  // 마운트 될때만 생성(deps가 [] 이므로)
  const onDelete = useCallback((targetId) => {
    dispatch({
      type:"DELETE",
      targetId: targetId
    })
  }, [])

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDelete }
  }, []);

  return (
    <div className='App'>
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  )
}

export default App
