import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Condominios", path: "/condominios" },
    { name: "Unidades", path: "/unidades" },
    { name: "Bancos", path: "/bancos" },
    { name: "Facturación", path: "/facturacion" },
    { name: "Finanzas", path: "/finanzas" },
    { name: "Empleados", path: "/empleados" },
    { name: "Usuarios", path: "/usuarios" },
  ];

  return (
    <div className="bg-dark text-white p-3 vh-100" style={{width: '220px'}}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">Menú</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
          <li key={item.path} className="nav-item">
            <NavLink 
              to={item.path} 
              className={({ isActive }) => `nav-link text-white ${isActive ? 'active bg-primary' : ''}`}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
