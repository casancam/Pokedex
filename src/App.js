import "./App.css";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";
import PokeList from "./components/PokeList";

function App() {
  return (
    <>
        <TopBar />
        <PokeList/>
        <BottomBar />
    </>
  );
}

export default App;
