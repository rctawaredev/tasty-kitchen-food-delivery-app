import {Route, Routes} from 'react-router-dom'
import Login from './components/Login.jsx'
import Home from "./components/Home.jsx";
import Cart from './components/Cart.jsx';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
  );
}

export default App;