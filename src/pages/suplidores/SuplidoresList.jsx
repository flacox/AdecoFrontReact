import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashBoardLayout";
import api from "../../api/axios";
import SupplierModalAdd from "./SupplierModalAdd";
import SupplierModalEdit from "./SupplierModalEdit";

export default function SuplidoresList() {
  const [suppliers, setSuppliers] = useState([]);
  const [supplierSelected, setSupplierSelected] = useState([]);

  const loadSuppliers = async () => {
    const res = await api.get("/suplidores");
    setSuppliers(res.data);
  };

  useEffect(() => {
    loadSuppliers();
  }, []);

  const handleDelete = async (id) => {
    if(window.confirm("Estas seguro de borar este registro?")) {
      try {
        await api.delete(`/suplidores/${id}`);
        loadSuppliers();
      } catch (error) {
        console.error("Error al intentar borar el registro");
      }
    }
  };

  function formatFecha(fecha) {
    if (!fecha) return "Sin Fecha";
    return new Date(fecha).toLocaleDateString("es-DO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Suplidores</h2>

          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addSupplierModal"
          >
            Agregar Suplidor
          </button>

          {/* Modal para agregar usuarios */}
          <SupplierModalAdd loadSuppliers={loadSuppliers} />
        </div>

        {/* Tabla de condominios */}
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre Comp</th>
                  <th>Contacto</th>
                  <th>Telefono</th>
                  <th>Correo</th>
                  <th>Direccion</th>
                  <th>RNC</th>
                  <th>Tipo Serv</th>
                  <th>Estado</th>
                  <th>Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {suppliers ? (
                  suppliers.map((supplier, index) => (
                    <tr key={supplier.supplier_id}>
                      <td>{index + 1}</td>
                      <td>{supplier.company_name}</td>
                      <td>{supplier.contact_name}</td>
                      <td>{supplier.phone}</td>
                      <td>{supplier.email}</td>
                      <td>{supplier.address}</td>
                      <td>{supplier.rnc}</td>
                      <td>{supplier.service_type}</td>
                      {/* <td>{supplier.status}</td> */}
                      <td>
                        {supplier.status === "active" ? (
                          <button className="btn btn-success">Activo</button>
                        ) : (
                          <button className="btn btn-danger">Inactivo</button>
                        )}
                      </td>
                      <td>{formatFecha(supplier.created_at)}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#editSupplierModal"
                          onClick={() => setSupplierSelected(supplier)}
                        >
                          Editar
                        </button>

                        {/* Modal editar Usuario */}
                        <SupplierModalEdit
                          supplier={supplierSelected}
                          loadSuppliers={loadSuppliers}
                        />

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(supplier.supplier_id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No hay suplidores registrados
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
