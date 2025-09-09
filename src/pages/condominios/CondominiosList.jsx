import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashBoardLayout";
import CondominioModalAdd from "./CondominioModalAdd";
import CondominioModalEdit from "./CondominioModalEdit";

export default function CondominiosList() {
  const [condominios, setCondominios] = useState(null);
  const [condominioSelected, setCondominioSelected] = useState([]);

  useEffect(() => {
    cargarCondominios();
  }, []);

  const cargarCondominios = async () => {
    const res = await axios.get("http://localhost:4000/api/condominios");
    setCondominios(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Esta seguro que desea eleminar este condominio?")) {
      try {
        await axios.delete(`http://localhost:4000/api/condominios/${id}`);
        cargarCondominios();
      } catch (error) {
        console.error("Error al intentar borrar el condominio", error);
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
          <h2>Condominios</h2>

          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addCondoModal"
          >
            Agregar Condominio
          </button>

          {/* Modal para agregar usuarios */}
          <CondominioModalAdd cargarCondominios={cargarCondominios} />
        </div>

        {/* Tabla de condominios */}
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Direccion</th>
                  <th>Telefono</th>
                  <th>No. Unit</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {condominios ? (
                  condominios.map((condominio, index) => (
                    <tr key={condominio.condo_id}>
                      <td>{index + 1}</td>
                      <td>{condominio.nombre}</td>
                      <td>{condominio.direccion}</td>
                      <td>{condominio.telefono}</td>
                      <td>{condominio.num_unidades}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#editCondoModal"
                          onClick={() => setCondominioSelected(condominio)}
                        >
                          Editar
                        </button>

                        {/* Modal editar Usuario */}
                        <CondominioModalEdit
                          condominio={condominioSelected}
                          cargarCondominios={cargarCondominios}
                        />

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(condominio.condo_id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No hay condominios registrados
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
