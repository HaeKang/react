import "./Main.css";

const Main = () => {
    const user = {
        name : "앙이",
        isLogin : true,
    }

    if (user.isLogin){
        return <div style={
            {
                backgroundColor : "black",
                color : "white",
            }
        }>{user.name}님 환영합니다</div>;
    } else {
        return <div className="logout">로그인 해주세요</div>;
    }

    
    // return (
    //     <>
    //         {user.isLogin ? <div>{user.name}님 환영합니다</div> : <div>로그인 해주세요</div>}
    //     </>
    // );

}

export default Main;