import { ChangeEvent, useState } from "react";

export function LocalCounter() {
  const [localCount, setLocalCount] = useState(0);
  const [localText, setLocalText] = useState("");

  const handleCount = () => {
    setLocalCount((prevCount) => {
      return prevCount + 1;
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalText(e.target.value);
  };

  return (
    <>
      <h1>Local Count: {localCount}</h1>

      <button onClick={handleCount}>Hit me 😛</button>

      <input type="text" value={localText} onChange={handleChange} />
    </>
  );
}
