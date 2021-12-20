// Import External Resources
import { useState } from "react";

// useVisualMode custom hook
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition function
  function transition(mode, replace = false) {
    if (replace === false) {
      setMode(mode)
      setHistory([...history, mode])
    } else {
      setMode(mode);
    }
  }

  // Back/Return function
  function back() {
    if (history.length > 1) {
      history.pop()
      setMode(history[history.length - 1])
    }
    setMode(history[history.length - 1])
  }

  return { mode, transition, back };
}

