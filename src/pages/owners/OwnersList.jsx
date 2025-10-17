import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../components/DashBoardLayout";
import Pagination from "../components/Pagination";

import { formatNumber, formatFecha } from "../../utils/formatters";

import OwnerModalAdd from "./OwnerModalAdd";
import OwnerModalEdit from "./OwnerModalEdit";

export default function OwnerList() {
  const [owners, setOwners] = useState([]);
  const [ownerSelected, setOwnerSelected] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); //  búsqueda
  const [currentPage, setCurrentPage] = useState(1); // paginación
  const itemsPerPage = 10; // límite de registros por página

  useEffect(() => {
    loadOwners();
  }, []);

  const loadOwners = async () => {
    const res = await api.get("/owners");
    setOwners(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Estas seguro que deseas borrar este registro?")) {
      try {
        await api.delete(`/owners/${id}`);
        loadOwners();
      } catch (error) {
        console.error("Error al intentar borrar este registro", error);
      }
    }
  };

  //  Filtro de búsqueda
  const filteredOwners = owners.filter((owner) =>
    Object.values(owner).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Paginación
  const totalPages = Math.ceil(filteredOwners.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOwners = filteredOwners.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
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
          <h2>Propietarios</h2>

          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addOwnerModal"
            onClick={() => loadOwners()}
          >
            Agregar Propietario
          </button>

          {/* Modal para agregar usuarios */}
          <OwnerModalAdd loadOwners={loadOwners} />

        </div>

        {/* Barra de búsqueda */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar nombre, apellido, email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reinicia paginación al buscar
            }}
          />
        </div>

        {/* Tabla de owners */}
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Telefono</th>
                  <th>Email</th>
                  <th>Direccion</th>
                  <th>Balance</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOwners.length > 0 ? (
                  paginatedOwners.map((owner, index) => (
                    <tr key={owner.id_owner}>
                      <td>{startIndex + index + 1}</td>
                      <td>{owner.first_name}</td>
                      <td>{owner.last_name}</td>
                      <td>{owner.contact}</td>
                      <td>{owner.email}</td>
                      <td>{owner.address}</td>
                      <td
                        className={owner.balance < 0 ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                          ${formatNumber(owner.balance)}
                      </td>
                      <td>{formatFecha(owner.created_at)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#editOwnerModal"
                          onClick={() => setOwnerSelected(owner)}
                        >
                          Editar
                        </button>

                        {/* Modal editar UNidad */}
                        <OwnerModalEdit owner={ownerSelected} loadOwners={loadOwners} />
                        
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(owner.id_owner)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No hay propietarios registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Controles de paginación */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <p className="mb-0">
            Mostrando {paginatedOwners.length} de {filteredOwners.length}{" "}
            regstros
          </p>

          <Pagination
            currentPage={currentPage}
            totalItems={filteredOwners.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
