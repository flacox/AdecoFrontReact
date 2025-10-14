import { useState } from "react";
import DashboardLayout from "../components/DashBoardLayout";

export default function SuplidoresList() {
  const suppliers = [
    {
      supplier_id: 1,
      company_name: "Gomez Electrical Services",
      contact_name: "Jose Gomez",
      phone: "809-555-1234",
      email: "info@gomezelectrical.com",
      address: "45 Duarte Ave, Santiago",
      rnc: "131231231",
      service_type: "Electrical",
      status: "active",
      created_at: "12-10-2025",
    },
    {
      supplier_id: 1,
      company_name: "Perez Electrical Services",
      contact_name: "Jose Gomez",
      phone: "809-555-1234",
      email: "info@gomezelectrical.com",
      address: "45 Duarte Ave, Santiago",
      rnc: "131231231",
      service_type: "Electrical",
      status: "inactive",
      created_at: "12-10-2025",
    },
    {
      supplier_id: 1,
      company_name: "Gonzalez Electrical Services",
      contact_name: "Jose Gomez",
      phone: "809-555-1234",
      email: "info@gomezelectrical.com",
      address: "45 Duarte Ave, Santiago",
      rnc: "131231231",
      service_type: "Electrical",
      status: "active",
      created_at: "12-10-2025",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Facturacion</h2>

          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addCondoModal"
          >
            Agregar Factura
          </button>

          {/* Modal para agregar usuarios */}
          {/* <CondominioModalAdd cargarCondominios={cargarCondominios} /> */}
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
                        {supplier.status === 'active' ? (
                            <button className="btn btn-success">Activo</button>
                        ) : (
                            <button className="btn btn-danger">Inactivo</button>
                        )}
                      </td>
                      <td>{supplier.created_at}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#editCondoModal"
                          // onClick={() => setFacturaSelected(factura)}
                        >
                          Editar
                        </button>

                        {/* Modal editar Usuario */}
                        {/* <CondominioModalEdit
                              condominio={condominioSelected}
                              cargarCondominios={cargarCondominios}
                            /> */}

                        <button
                          className="btn btn-danger btn-sm"
                          // onClick={() => handleDelete(condominio.condo_id)}
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
