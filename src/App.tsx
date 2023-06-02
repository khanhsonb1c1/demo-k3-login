import { Route, Routes } from "react-router-dom";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Register from "./features/register";
import "bootstrap/js/index.esm";
import "bootstrap/js/index.umd";
import UpdateUser from "./features/update";
import HomePage from "./features/home";
import Login from "./features/login";


function App() {
  return (
    <div className="App">
      <div>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/update-user" element={<UpdateUser />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
