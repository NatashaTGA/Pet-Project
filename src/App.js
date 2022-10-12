import './App.css';
import {
  Route, Routes
} from "react-router-dom";
import Header from "./components/Header/index"
import Home from "./Pages/Home/index"
import Coin from "./Pages/Coin/index"
import Dashboard from './components/Dashboard';

function App() {
  return (
      <main>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />} exact/>
          <Route path='/coin/:id' element={<Coin />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
      </main>
  );
}

export default App;
