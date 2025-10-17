import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Usuarios from "./pages/usuarios/UsuariosList";
import Condominios from "./pages/condominios/CondominiosList";
import Unidades from "./pages/unidades/UnidadesList";
import FacturacionList from "./pages/facturacion/FacturacionList";
import Bancos from "./pages/bancos/BancosList";
import Suplidores from "./pages/suplidores/SuplidoresList";
import Propietarios from "./pages/owners/OwnersList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/condominios" element={<Condominios />} />
        <Route path="/unidades" element={<Unidades />} />
        <Route path="/bancos" element={<Bancos />} />
        <Route path="/suplidores" element={<Suplidores />} />
        <Route path="/propietarios" element={<Propietarios />} />
        <Route path="/facturacion" element={<FacturacionList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
