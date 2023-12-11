import { useCallback, useEffect, useRef, useState, useId } from "react";

function App() {
  const sym = '!@#$%^&*()_{}:";<>?,./';
  const inputId = useId();
  const numId = useId();
  const symId = useId();
  const [length, setlength] = useState(8);
  const [numAllowed, setnumallowed] = useState(false);
  const [charAllowed, setcharallowed] = useState(false);
  const [password, setpassword] = useState('');
  const passref = useRef(null);

  const pwdGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_{}:";<>?,./';

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setpassword(pass);

  }, [length, numAllowed, charAllowed, setpassword])
  const copypasstoclipboard = useCallback(() => {
    passref.current?.select();
    // passref.current?.setSelectionRange(0, 3);
    window.navigator.clipboard.writeText(password);
  }, [password])
  useEffect(() => {
    pwdGen();
  }, [length, numAllowed, charAllowed, pwdGen])
  return (
    <div className="bg-slate-50 px-3 w-screen h-screen">
      <div className="container mx-auto  py-10">
        <h1 className="font-bold text-xl md:text-3xl text-center">Password Generator</h1>
        <div className="w-full">
          <label htmlFor={inputId} className="font-semibold">Generated Password</label>
          <div className="w-full flex flex-col md:flex-row justify-center md:items-center mt-2">
            <input id={inputId} className="border border-slate-300 outline-blue-600 rounded px-2 py-2 flex-grow" type="text" value={password} placeholder="password" ref={passref} readOnly />
            <button className="mt-5 md:mt-0 md:ms-5 border border-slate-300 bg-blue-600 outline-blue-600 text-white rounded px-4 py-2" onClick={copypasstoclipboard}>Copy Password</button>
          </div>
          <p className="font-semibold">No of Characters in Password: <span className="text-xl">{length}</span></p>
        </div>
        <div className=" ">
          <div className="full mt-2">
            <label className="font-semibold">Increase No of Characters in Password:</label>
            <input className="ms-5 w-1/3" type="range" min={4} max={50} value={length} onChange={(e) => { setlength(e.target.value) }} />
            <small className="ms-5 ">(min:4 max:50) </small>
          </div>
          <div className="full mt-2">
            <input
              id={numId}
              type="checkbox"
              defaultChecked={numAllowed}
              onChange={() => {
                setnumallowed((prev) => !prev)
              }} />
            <label htmlFor={numId} className="ms-5 font-semibold">Include Numbers <small className="ms-5 ">(0-9) </small></label>
          </div>
          <div className="full mt-2">
            <input
              id={symId}
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setcharallowed((prev) => { return !prev })
              }}
            />
            <label htmlFor={symId} className="ms-5 font-semibold">Include Symbols <small className="ms-5 ">({sym}) </small></label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
