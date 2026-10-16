import Home from "./components/Home";
import Blogs from "./components/Blogs";
import Navbar from "./components/common/Navbar";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from './components/About'
import ContactForm from "./components/ContactForm";

function App() {
  return (
   <div className="px-4 bg-white border rounded-md">
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      <Route path="/blogs" element={<Blogs/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/contactform" element={<ContactForm/>}></Route>
    </Routes>

    </BrowserRouter>
   </div>
  );
}

export default App;
