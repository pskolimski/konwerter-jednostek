import { useEffect, useState } from "react"

const modes = [
  { name: "length", from: "Metry", to: "Centymetry" },
  { name: "weight", from: "Kilogramy", to: "Gramy" },
  { name: "temperature", from: "Celsjusz", to: "Fahrenheit" },
  { name: "speed", from: "Kilometry na godzinę", to: "Metry na sekundę" },
]

export default function App() {
  const [activeMode, setActiveMode] = useState(modes[0]);
  const [inputValue, setInputValue] = useState("");
  const [resultValue, setResultValue] = useState("");
  const [isSwapped, setIsSwapped] = useState(false);

  const handleSwapClick = () => {
    const swappedMode = {
      ...activeMode,
      from: activeMode.to,
      to: activeMode.from,
    };
    setActiveMode(swappedMode);
    setInputValue(resultValue);
    setIsSwapped((prev) => !prev);
  }

  useEffect(() => {
    if (!isSwapped) {
      handleConvert(inputValue, false);
    } else {
      handleConvert(resultValue, true);
    }
    // eslint-disable-next-line
  }, [activeMode, inputValue, resultValue, isSwapped]);

  const handleConvert = (value: string, reverse: boolean) => {
    if (value === "") {
      if (!reverse) setResultValue("");
      else setInputValue("");
      return;
    }

    const num = Number(value);
    let result = 0;

    switch (activeMode.name) {
      case "length":
        if (!reverse) {
          result = activeMode.from === "Metry" ? num * 100 : num / 100;
          setResultValue(result.toString());
        } else {
          result = activeMode.from === "Metry" ? num / 100 : num * 100;
          setInputValue(result.toString());
        }
        break;
      case "weight":
        if (!reverse) {
          result = activeMode.from === "Kilogramy" ? num * 1000 : num / 1000;
          setResultValue(result.toString());
        } else {
          result = activeMode.from === "Kilogramy" ? num / 1000 : num * 1000;
          setInputValue(result.toString());
        }
        break;
      case "temperature":
        if (!reverse) {
          result = activeMode.from === "Celsjusz"
            ? (num * 9 / 5) + 32
            : (num - 32) * 5 / 9;
          setResultValue(result.toString());
        } else {
          result = activeMode.from === "Celsjusz"
            ? (num - 32) * 5 / 9
            : (num * 9 / 5) + 32;
          setInputValue(result.toString());
        }
        break;
      case "speed":
        if (!reverse) {
          result = activeMode.from === "Kilometry na godzinę"
            ? num / 3.6
            : num * 3.6;
          setResultValue(result.toString());
        } else {
          result = activeMode.from === "Kilometry na godzinę"
            ? num * 3.6
            : num / 3.6;
          setInputValue(result.toString());
        }
        break;
      default:
        break;
    }
  }

  return (
    <div className="container">
      <div className="card px-3 py-5 mt-3 d-flex flex-column align-items-center">
        <h1>📐 Konwerter jednostek</h1>

        <div className="my-3 btn-group">
          <button onClick={() => { setActiveMode(modes[0]); setIsSwapped(false); setInputValue(""); setResultValue(""); }} className={`btn ${activeMode.name === "length" ? "btn-primary" : "btn-secondary"}`}>Długość</button>
          <button onClick={() => { setActiveMode(modes[1]); setIsSwapped(false); setInputValue(""); setResultValue(""); }} className={`btn ${activeMode.name === "weight" ? "btn-primary" : "btn-secondary"}`}>Waga</button>
          <button onClick={() => { setActiveMode(modes[2]); setIsSwapped(false); setInputValue(""); setResultValue(""); }} className={`btn ${activeMode.name === "temperature" ? "btn-primary" : "btn-secondary"}`}>Temperatura</button>
          <button onClick={() => { setActiveMode(modes[3]); setIsSwapped(false); setInputValue(""); setResultValue(""); }} className={`btn ${activeMode.name === "speed" ? "btn-primary" : "btn-secondary"}`}>Prędkość</button>
        </div>

        <div className="p-3 w-100">
          <label htmlFor="value1" className="form-label">Z: {activeMode.from}</label>
          <input
            className="form-control"
            placeholder={activeMode.from}
            type="number"
            id="value1"
            value={inputValue}
            onChange={(e) => {
              setIsSwapped(false);
              setInputValue(e.target.value);
            }}
          />
        </div>

        <button className="btn btn-primary btn-small" onClick={handleSwapClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-down-icon lucide-arrow-up-down"><path d="m21 16-4 4-4-4" /><path d="M17 20V4" /><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /></svg>
        </button>

        <div className="p-3 w-100">
          <label htmlFor="value2" className="form-label">Na: {activeMode.to}</label>
          <input
            className="form-control"
            placeholder={activeMode.to}
            value={resultValue}
            type="number"
            id="value2"
            onChange={(e) => {
              setIsSwapped(true);
              setResultValue(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  )
}
