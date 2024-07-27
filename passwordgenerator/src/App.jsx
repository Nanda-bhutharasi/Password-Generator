import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()_+-=[]{}|;:',.<>?/";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password).then(
      () => setCopySuccess("Password copied!"),
      () => setCopySuccess("Failed to copy password.")
    );
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <div className="bg-[#ECF0F1] min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-[#2C3E50] mb-4 text-center">
          Password Generator
        </h1>
        <div className="flex items-center shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 border border-gray-300 rounded-l-lg"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className={`bg-[#2C3E50] text-white px-4 py-2 rounded-r-lg hover:bg-[#1A242F] ${
              !password && "opacity-50 cursor-not-allowed"
            }`}
            onClick={copyPasswordToClipboard}
            disabled={!password}
          >
            Copy
          </button>
        </div>
        {copySuccess && (
          <p className="text-[#E74C3C] text-center mb-4">{copySuccess}</p>
        )}
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-2">
            <label className="text-gray-700">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer flex-grow"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="form-checkbox"
            />
            <label htmlFor="numberInput" className="text-gray-700">
              Include Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              checked={characterAllowed}
              id="characterInput"
              onChange={() => setCharacterAllowed((prev) => !prev)}
              className="form-checkbox"
            />
            <label htmlFor="characterInput" className="text-gray-700">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
