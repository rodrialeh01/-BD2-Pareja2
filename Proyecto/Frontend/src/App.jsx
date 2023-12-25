import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import SearchFriends from "./pages/Friends/SearchFriends";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SearchFriends />
    </>
  );
}

export default App;
