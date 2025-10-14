import { useEffect, useState } from "react";
import DashboardLayout from "./components/DashBoardLayout";
import api from "../api/axios";

export default function Home() {
  const [metrics, setMetrics] = useState({
    total_condominios: 0,
    total_unidades: 0,
    total_usuarios: 0,
    total_balance: 0,
  });

  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const fetchResumen = async () => {
    const res = await api.get("/home");
    setMetrics(res.data[0]);
  };

  useEffect(() => {
    fetchResumen();
  }, [metrics]);

  return (
    <DashboardLayout>
      <h1 className="mb-4">Bienvenido al Dashboard de ADECO</h1>

      <div className="row mb-4">
        {/* Total Condominios */}
        <div className="col-md-3 mb-3">
          <div className={`card text-white bg-primary h-100`}>
            <div className="card-body">
              <h5 className="card-title">Total Condominios</h5>
              <p className="card-text fs-3">
                {metrics ? metrics.total_condominios : "loading"}
              </p>
            </div>
          </div>
        </div>

        {/* Total Unidades */}
        <div className="col-md-3 mb-3">
          <div className={`card text-white bg-secondary h-100`}>
            <div className="card-body">
              <h5 className="card-title">Total Unidades</h5>
              <p className="card-text fs-3">{metrics.total_unidades}</p>
            </div>
          </div>
        </div>

        {/* Total Balance */}
        <div className="col-md-3 mb-3">
          <div className={`card text-white bg-success h-100`}>
            <div className="card-body">
              <h5 className="card-title">Balance</h5>
              <p className="card-text fs-3">{formatNumber(metrics.total_balance)}</p>
            </div>
          </div>
        </div>

        {/* Total Empleados */}
        <div className="col-md-3 mb-3">
          <div className={`card text-white bg-danger h-100`}>
            <div className="card-body">
              <h5 className="card-title">Total Empleados</h5>
              <p className="card-text fs-3">{metrics.total_empleados}</p>
            </div>
          </div>
        </div>
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
