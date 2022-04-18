//import logo from './logo.svg';
import "./App.css";
import { Routes, Route,Navigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Operations from "./components/Operations";
import Main from "./components/Main";
import Employee from "./components/Employee";
import Crud from "./components/Crud";
import Firstpage from "./components/Firstpage";
import Final from "./components/Final";


function App() {
  //console.log(data)
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/employees"} />}></Route>
          <Route path="/employees" element={<Main />} />
          <Route path="/employees/add" element={<Crud />} />
          <Route path="/employees/update" element={<Firstpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
