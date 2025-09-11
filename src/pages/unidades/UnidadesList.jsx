import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashBoardLayout";
import UnidadesModalAdd from "./UnidadesModalAdd";
import UnidadesModalEdit from "./UnidadesModalEdit";

export default function UnidadesList() {
  const unitURL = "http://localhost:4000/api/unidades";
  const [unidades, setUnidades] = useState([]);
  const [condominios, setCondominios] = useState([]);
  const [unidadSelected, setUnidadSelected] = useState([]);

  useEffect(() => {
    cargarUnidades();
  }, []);

  const cargarUnidades = async () => {
    const res = await axios.get(unitURL);
    setUnidades(res.data);
  };

  const cargarCondominios = async () => {
    const res = await axios.get("http://localhost:4000/api/condominios");
    setCondominios(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Estas seguro que deseas borar esta unidad?")) {
      try {
        await axios.delete(unitURL + "/" + id);
        cargarUnidades();
      } catch (error) {
        console.error("Error al intentar borrar la unidad", error);
      }
    }
  };

//   const editarUnidad = (unidad) => {
//     setUnidadSelected(unidad);
//     cargarCondominios();
//   }

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
          <h2>Unidades</h2>

          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addUnidadModal"
            onClick={() => cargarCondominios()}
          >
            Agregar Unidad
          </button>

          {/* Modal para agregar usuarios */}
          <UnidadesModalAdd
            cargarUnidades={cargarUnidades}
            condominios={condominios}
          />
        </div>

        {/* Tabla de usuarios */}
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Condominio</th>
                  <th>No.</th>
                  <th>Tipo</th>
                  <th>Area</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {unidades ? (
                  unidades.map((unidad, index) => (
                    <tr key={unidad.unit_id}>
                      <td>{index + 1}</td>
                      <td>{unidad.condominio}</td>
                      <td>{unidad.numero}</td>
                      <td>{unidad.tipo}</td>
                      <td>{unidad.area}</td>
                      <td>{unidad.estado}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#editUnidadModal"
                          onClick={() => setUnidadSelected(unidad)}
                        //   onClick={() => editarUnidad(unidad)}
                        >
                          Editar
                        </button>

                        {/* Modal editar UNidad */}
                        <UnidadesModalEdit unidad={unidadSelected} cargarUnidades={cargarUnidades} condominios={condominios}/>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(unidad.unit_id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No hay unidades registradas
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
