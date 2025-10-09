import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashBoardLayout";
import UsuariosModalAdd from "./UsuariosModalAdd";
import UsuariosModalEdit from "./UsuariosModalEdit";

export default function UsuariosList() {
  const [usuarios, setUsuarios] = useState(null);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const res = await axios.get("http://localhost:4000/api/usuarios");
    setUsuarios(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Esta seguro que desea eleminar este usuario?")) {
      try {
        await axios.delete(`http://localhost:4000/api/usuarios/${id}`);
        cargarUsuarios();
      } catch (error) {
        console.error("Error al intentar borar el usuario");
      }
    }
  };

  // para resolver error de modal
  window.addEventListener("hide.bs.modal", (event) => {
    event.target.inert = true;
  });

  window.addEventListener("show.bs.modal", (event) => {
    event.target.inert = false;
  });

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Usuarios</h2>

          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addUserModal"
          >
            Agregar Usuario
          </button>

          {/* Modal para agregar usuarios */}
          <UsuariosModalAdd cargarUsuarios={cargarUsuarios} />
        </div>

        {/* Tabla de usuarios */}
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Contacto</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios ? (
                  usuarios.map((usuario, index) => (
                    <tr key={usuario.user_id}>
                      <td>{index + 1}</td>
                      <td>{usuario.nombre}</td>
                      <td>{usuario.email}</td>
                      <td>{usuario.tel}</td>
                      <td>{usuario.rol}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#editUserModal"
                          onClick={() => setUsuarioSeleccionado(usuario)}
                        >
                          Editar
                        </button>
                        
                          {/* Modal editar Usuario */}
                        <UsuariosModalEdit usuario={usuarioSeleccionado} cargarUsuarios={cargarUsuarios}/>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(usuario.user_id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No hay usuarios registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
