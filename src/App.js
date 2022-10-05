import './App.css';
import {
  Route, Routes
} from "react-router-dom";
import Header from "./components/Header/index"
import Home from "./Pages/Home/index"
import Coin from "./Pages/Coin/index"

function App() {
  return (
      <main>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />} exact/>
          <Route path='/coin/:id' element={<Coin />}/>
        </Routes>
      </main>
  );
}

export default App;
