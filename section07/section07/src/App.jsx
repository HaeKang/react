import "./App.css"
import Viewer from "./components/Viewer"
import Controller from "./components/Controller"
import Even from "./components/Even"
import {useState, useEffect, useRef} from "react"

function App() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");

  const isMount = useRef(false);

  // 1. 마운트 : 탄생
  // deps로 빈 배열을 주면 됨
  useEffect(() => {console.log("mount");}, []);

  // 2. 업데이트 : 변화, 리렌더링
  // deps를 생략하면 됨
  useEffect(() => {
    // 아래 코드 없으면 첫 마운트 시 update도 같이 콘솔 찍힘
    if (!isMount.current){
      isMount.current = true;
      return;
    }
    console.log("update");
  });
  
  // 3. 언마운트 : 주금
  useEffect(() => {
    // 클린업, 정리함수
    return () => {
        console.log("unmount");
    };
}, []);


  const onClickBtn = (value) => {
      setCount(count + value);
  }

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input type="text" value={input} onChange={(e) => {setInput(e.target.value)}} />
      </section>
      <section>
        <Viewer count = {count} />
        {count % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        <Controller onClickBtn = {onClickBtn}/>
      </section>
    </div>
  );
}

export default App
