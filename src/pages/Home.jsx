import React from "react";
import DashboardLayout from "./components/DashBoardLayout";

export default function Home() {
  // Datos de los cards
  const metrics = [
    { title: 'Total Unidades', value: 120, bg: 'primary' },
    { title: 'Pagos Pendientes', value: 15, bg: 'danger' },
    { title: 'Balance Actual', value: 'RD$ 1,200,000', bg: 'success' },
    { title: 'Empleados Activos', value: 8, bg: 'info' },
  ];

  return (
    <DashboardLayout>
      <h1 className="mb-4">Bienvenido al Dashboard de ADECO</h1>

      <div className="row mb-4">
        {metrics.map((metric, index) => (
          <div className="col-md-3 mb-3" key={index}>
            <div className={`card text-white bg-${metric.bg} h-100`}>
              <div className="card-body">
                <h5 className="card-title">{metric.title}</h5>
                <p className="card-text fs-3">{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">Últimos pagos</div>
        <div className="card-body p-0">
          <table className="table mb-0">
            <thead className="table-light">
              <tr>
                <th>Unidad</th>
                <th>Propietario</th>
                <th>Monto</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A-101</td>
                <td>Jose Pérez</td>
                <td>RD$ 5,000</td>
                <td>2025-08-28</td>
              </tr>
              <tr>
                <td>B-203</td>
                <td>María López</td>
                <td>RD$ 4,500</td>
                <td>2025-08-27</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
