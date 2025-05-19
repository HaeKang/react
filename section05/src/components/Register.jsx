import {useState, useRef} from "react";


const Register = () => {

    const [input, setInput] = useState({
        name: "",
        birth: "",
        country: "",
        bio: ""
    });
    const countRef = useRef(0);
    const inputRef = useRef();

    const onChange = (e) => {
        countRef.current++;
        console.log(countRef.current);
        setInput({
            ...input,
            [e.target.name] : e.target.value,
        });
    }

    const onSubmit = () => {
        if (input.name === ""){
            inputRef.current.focus();
        }
    }

    return (
        <div>

            <div>
                <input ref={inputRef} name="name" value={input.name} onChange={onChange} placeholder={"이름"} type="text" />
            </div>
            <div>
                <input name="birth" value = {input.birth} onChange={onChange} type="date" />
            </div>
            <div>
                <select name="country" onChange={onChange} value={input.country}>
                    <option></option>
                    <option value="kr">한국</option>
                    <option>미국</option>
                    <option>영국</option>
                </select>
            </div>
            <div>
                <textarea name="bio" value={input.bio} onChange={onChange} />
            </div>

            <button onClick={onSubmit}>제출</button>
        </div>
    );
}

export default Register;