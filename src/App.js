import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Usuarios from "./pages/usuarios/UsuariosList";
import Condominios from "./pages/condominios/CondominiosList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/condominios" element={<Condominios />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
