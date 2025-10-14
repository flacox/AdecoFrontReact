import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/DashBoardLayout";
import BancoModalAdd from "./BancoModalAdd";
import BancoModalEdit from "./BancoModalEdit";
import CuentaModalAdd from "../bancosCuentas/CuentaModalAdd";
import CuentasModalEdit from "../bancosCuentas/CuentaModalEdit";
import { formatCurrency } from "../../utils/formatters";

export default function BancosList() {
  const [bancos, setBancos] = useState([]);
  const [bancoSelecionado, setBancoSelecionado] = useState([]);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState([]);
  const [condominios, setCondominios] = useState([])

  const [bankAcounts, SetBankAcounts] = useState([]);

  const cargarCuentas = async () => {
    const res = await axios.get("http://localhost:4000/api/cuentas");
    SetBankAcounts(res.data);
  };

  const cargarBancos = async () => {
    const res = await axios.get("http://localhost:4000/api/bancos");
    setBancos(res.data);
  };

  const loadCondominios = async () => {
    const res = await axios.get("http://localhost:4000/api/condominios");
    setCondominios(res.data);
  }

  useEffect(() => {
    cargarBancos();
    cargarCuentas();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Esta seguro que desea eliminar este banco?")) {
      try {
        await axios.delete(`http://localhost:4000/api/bancos/${id}`);
        cargarBancos();
      } catch (error) {
        console.error("Error al intentar borar este registro");
      }
    }
  };

  const handleDeleteCuenta = async (id) => {
    if (window.confirm("Esta seguro que desea eliminar esta cuenta?")) {
      try {
        await axios.delete(`http://localhost:4000/api/cuentas/${id}`);
        cargarCuentas();
      } catch (error) {
        console.error("Error al intentar borar este registro");
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
      {/* Lista de Bancos */}
      <div className="p-2">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Bancos</h2>

          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addBancoModal"
          >
            Agregar Banco
          </button>

          {/* Modal para agregar usuarios */}
          <BancoModalAdd cargarBancos={cargarBancos} />
        </div>

        {/* Tabla de bancos */}
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Contacto</th>
                  <th>Telefono</th>
                  <th>Email</th>
                  <th>RNC</th>
                  <th>Direccion</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {bancos ? (
                  bancos.map((banco, index) => (
                    <tr key={banco.id_bank}>
                      <td>{index + 1}</td>
                      <td>{banco.name}</td>
                      <td>{banco.contact_name}</td>
                      <td>{banco.contact}</td>
                      <td>{banco.email}</td>
                      <td>{banco.rnc}</td>
                      <td>{banco.address}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#editBancoModal"
                          onClick={() => setBancoSelecionado(banco)}
                        >
                          Editar
                        </button>

                        {/* Modal editar Banco */}
                        <BancoModalEdit
                          banco={bancoSelecionado}
                          cargarBancos={cargarBancos}
                        />

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(banco.id_bank)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No hay bancos registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cuentas de Bancos */}
      <div className="p-2">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2>Cuentas Bancarias</h2>

          {/* <!-- Button trigger modal --> */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addCuentaModal"
            onClick={() => loadCondominios()}
          >
            Agregar Cuenta
          </button>

          {/* Modal para agregar usuarios */}
          <CuentaModalAdd bancos={bancos} condominios={condominios} cargarCuentas={cargarCuentas} />
        </div>

        {/* Tabla de bancos */}
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>N. Cuenta</th>
                  <th>Banco</th>
                  <th>Tipo</th>
                  <th>Balance</th>
                  <th>Condominio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {bankAcounts.length ? (
                  bankAcounts.map((account, index) => (
                    <tr key={account.id_account}>
                      <td>{index + 1}</td>
                      <td>{account.account_number}</td>
                      <td>{account.bank_name}</td>
                      <td>{account.account_type}</td>
                      {/* <td>{account.id_bank}</td> */}
                      <td>{formatCurrency(account.balance, account.currency)}</td>
                      <td>{account.condo_nombre}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          data-bs-toggle="modal"
                          data-bs-target="#editCuentaModal"
                          onClick={() => {
                            setCuentaSeleccionada(account)
                            loadCondominios();
                          }}
                          // onClick={() => {console.log(account)}}
                        >
                          Editar
                        </button>

                        {/* Modal editar Banco */}
                        <CuentasModalEdit cuenta={cuentaSeleccionada} cargarCuentas={cargarCuentas} bancos={bancos} condominios={condominios} />

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {handleDeleteCuenta(account.id_account)}}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No hay Cuentas registradas
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
