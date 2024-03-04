import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home3';

import { Routes, Route } from "react-router-dom";

function App() {
  return (
  <>
      <Navbar/>
      <Routes>
          <Route path='/' element={<Home/>}/>
      </Routes>
      <Footer/>
  </>
  );
}

export default App;
