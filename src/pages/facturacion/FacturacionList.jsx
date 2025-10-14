import { useState } from 'react'
import DashboardLayout from '../components/DashBoardLayout';

export default function FacturacioList() {
  const [facturacion, setFacturacion] = useState(null);


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
                      <th>Unidad</th>
                      <th>Fecha</th>
                      <th>Monto</th>
                      <th>Tipo</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facturacion ? (
                      facturacion.map((factura, index) => (
                        <tr key={factura.condo_id}>
                          <td>{index + 1}</td>
                          <td>{factura.nombre}</td>
                          <td>{factura.direccion}</td>
                          <td>{factura.telefono}</td>
                          <td>{factura.num_unidades}</td>
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
                          No hay facturas registradas
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </DashboardLayout>
  )
}
