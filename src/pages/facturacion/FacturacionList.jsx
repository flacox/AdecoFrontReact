import { useEffect, useState } from "react";
import api from "../../api/axios";
import DashboardLayout from "../components/DashBoardLayout";
import Pagination from "../components/Pagination";
import { formatFecha, formatNumber } from "../../utils/formatters";
import ExpenseModalAdd from "./ExpenseModalAdd";

export default function FacturacionList() {
  const [expenses, setExpenses] = useState([]);

  const [searchTerm, setSearchTerm] = useState(""); //  búsqueda
  const [currentPage, setCurrentPage] = useState(1); // paginación
  const itemsPerPage = 10; // límite de registros por página

  const loadExpenses = async () => {
    const res = await api.get("/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  // const handleDelete = async (id) => {
  //   if (window.confirm("Estas seguro que deseas borar esta unidad?")) {
  //     try {
  //       await api.delete(`/condomnios/${id}`);
  //       cargarUnidades();
  //     } catch (error) {
  //       console.error("Error al intentar borrar la unidad", error);
  //     }
  //   }
  // };

  //  Filtro de búsqueda
  const filteredExpenses = expenses.filter((expense) =>
    Object.values(expense).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Paginación
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExpenses = filteredExpenses.slice(
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
          <h2>Gastos</h2>

          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addExpenseModal"
            onClick={() => {loadExpenses()}}
          >
            Agregar Gasto
          </button>

          {/* Modal para agregar usuarios */}
          <ExpenseModalAdd loadExpenses={loadExpenses} />

        </div>

        {/* Barra de búsqueda */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar condominio, monto, cuenta..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // reinicia paginación al buscar
            }}
          />
        </div>

        {/* Tabla de expenses */}
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Condominio</th>
                  <th>Descripcion</th>
                  <th>Monto</th>
                  <th>Tipo de cuente</th>
                  <th>Fuente de Pago</th>
                  <th>Fecha Realizado</th>
                  <th>Fecha Registrado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {paginatedExpenses.length > 0 ? (
                  paginatedExpenses.map((expense, index) => (
                    <tr key={expense.id}>
                      <td>{startIndex + index + 1}</td>
                      <td>{expense.condominio}</td>
                      <td>{expense.description}</td>
                      <td>${formatNumber(expense.amount)}</td>
                      <td>
                        {expense.payment_source_type === "BANK_ACCOUNT"
                          ? "Cuenta Bancaria"
                          : expense.payment_source_type === "PETTY_CASH"
                          ? "Caja Chica"
                          : "N/A"}
                      </td>
                      <td>{expense.payment_source}</td>
                      <td>{formatFecha(expense.date)}</td>
                      <td>{formatFecha(expense.created_at)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#editUnidadModal"
                          // onClick={() => {setUnidadSelected(unidad); loadOwners()}}
                          //   onClick={() => editarUnidad(unidad)}
                        >
                          Editar
                        </button>

                        {/* Modal editar UNidad */}
                        {/* <UnidadesModalEdit
                          unidad={unidadSelected}
                          cargarUnidades={cargarUnidades}
                          condominios={condominios}
                          owners={owners}
                        /> */}

                        <button
                          className="btn btn-danger btn-sm"
                          // onClick={() => handleDelete(unidad.unit_id)}
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

        {/* Controles de paginación */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <p className="mb-0">
            Mostrando {paginatedExpenses.length} de {filteredExpenses.length}{" "}
            unidades
          </p>

          <Pagination
            currentPage={currentPage}
            totalItems={filteredExpenses.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
