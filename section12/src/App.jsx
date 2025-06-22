import {Routes, Route, Link, useNavigate} from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Notfound from "./pages/Notfound";

import {getEmotionImage} from "./util/get-emotion-image";

function App() {
  const nav = useNavigate();

  const onClickButton = () => {
    nav("/new");
  };

  return (
    <>
    <div>
      <img src={getEmotionImage(1)} alt="" />
    </div>
    
    <div>
      <Link to={"/"}>Home</Link>
      <Link to={"/new"}>New</Link>
      <Link to={"/diary"}>Diary</Link>
    </div>
    <button onClick={onClickButton}>New 페이지로 이동</button>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/diary/:id" element={<Diary />} />
      <Route path="*" element={<Notfound />} />
    </Routes>
    </>
  );
}

export default App
