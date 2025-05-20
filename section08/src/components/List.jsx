import "./List.css"
import TodoItem from "./TodoItem"
import { useState, useMemo } from "react";

const List = ({todos, onUpdate, onDelete}) => {
    const [search, setSearch] = useState("");

    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const getFilteredData = () =>{
        if (search === ""){
            return todos;
        }

        return todos.filter((todo) => 
            todo.content.toLowerCase().includes(search.toLowerCase())
        );
    }

    const filteredTodos = getFilteredData();

    // const getAnalyzedData = () => {
    //     const totalCount = todos.length;
    //     const doneCount = todos.filter((todo)=> todo.isDone).length;
    //     const notDoneCount = totalCount - doneCount;

    //     return {
    //         totalCount,
    //         doneCount,
    //         notDoneCount
    //     }
    // }
    // const { totalCount, doneCount, notDoneCount } = getAnalyzedData();

    // deps가 변경될때만 콜백 함수 실행됨!!
    const { totalCount, doneCount, notDoneCount } = useMemo(()=> {
        const totalCount = todos.length;
        const doneCount = todos.filter((todo)=> todo.isDone).length;
        const notDoneCount = totalCount - doneCount;

        return {
            totalCount,
            doneCount,
            notDoneCount
        }
    }, [todos]);


    return (
        <div className="List">
            <h4>Todo List</h4>
            <div>
                <div>Total : {totalCount}</div>
                <div>Done : {doneCount}</div>
                <div>notDone : {notDoneCount}</div>
            </div>
            <input value={search} onChange={onChangeSearch} type="text" placeholder="검색어를 입력하세요" />
            <div className="todos_wrapper">
                {
                    filteredTodos.map((todo) => {
                        return <TodoItem key={todo.id} {...todo} onUpdate = {onUpdate} onDelete = {onDelete}/>;
                    })
                }
            </div>
        </div>
    )
};

export default List;