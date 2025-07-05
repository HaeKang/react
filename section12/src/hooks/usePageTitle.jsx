import { useEffect } from "react";

const usePageTitle = (title) => {
    // 타이틀 바꾸깅
    useEffect(() => {
        const $title = document.getElementsByTagName("title")[0];   // dom 요소를 저장하는 변수에는 변수명에 $를 넣는다고 합니다용
        $title.innerText = title;
        
    }, [title]);
}

export default usePageTitle;