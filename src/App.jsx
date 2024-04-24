import { Route, Routes } from "react-router-dom";

import AddMachine from "./components/AddMachine";
import EditMachine from "./components/EditMachine";
import Homepage from "./components/Homepage";
import LandingCertificate from "./components/LandingCertificate";
import Login from './components/Login'
import PrintCertificate from "./components/PrintCertificate";

function App() {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/machines/:id" element={<EditMachine/>} />
        <Route path="/machines" element={<AddMachine/>} />
        <Route path="/pdf" element={<PrintCertificate />} />
        <Route path="/landing/:id" element={<LandingCertificate />} />
      </Routes>
  )
  
}

export default App
