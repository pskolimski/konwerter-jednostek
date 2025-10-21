import { useEffect, useState } from "react"
import UnitInput from "./components/UnitInput"

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
      <div className="card">
        <h1>📐 Konwerter Jednostek</h1>

        <div className="btn-group mt-3">
          <button
            onClick={() => { setActiveMode(modes[0]); setIsSwapped(false); setInputValue(""); setResultValue(""); }}
            className={activeMode.name === "length" ? "active" : ""}
          >
            Długość
          </button>
          <button
            onClick={() => { setActiveMode(modes[1]); setIsSwapped(false); setInputValue(""); setResultValue(""); }}
            className={activeMode.name === "weight" ? "active" : ""}
          >
            Waga
          </button>
          <button
            onClick={() => { setActiveMode(modes[2]); setIsSwapped(false); setInputValue(""); setResultValue(""); }}
            className={activeMode.name === "temperature" ? "active" : ""}
          >
            Temperatura
          </button>
          <button
            onClick={() => { setActiveMode(modes[3]); setIsSwapped(false); setInputValue(""); setResultValue(""); }}
            className={activeMode.name === "speed" ? "active" : ""}
          >
            Prędkość
          </button>
        </div>

        <UnitInput
          label="Z"
          unit={activeMode.from}
          value={inputValue}
          placeholder="100"
          id="value1"
          onChange={(value) => {
            setIsSwapped(false);
            setInputValue(value);
          }}
        />

        <button className="swap-button" onClick={handleSwapClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m21 16-4 4-4-4" />
            <path d="M17 20V4" />
            <path d="m3 8 4-4 4 4" />
            <path d="M7 4v16" />
          </svg>
        </button>

        <UnitInput
          label="Na"
          unit={activeMode.to}
          value={resultValue}
          placeholder="10000"
          id="value2"
          onChange={(value) => {
            setIsSwapped(true);
            setResultValue(value);
          }}
        />
      </div>
    </div>
  )
}
