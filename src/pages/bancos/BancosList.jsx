import { useState, useEffect } from "react";
import api from "../../api/axios";
import DashboardLayout from "../components/DashBoardLayout";
import { formatCurrency, formatNumber, formatFecha } from "../../utils/formatters";
import BancoModalEdit from "./BancoModalEdit";
import BancoModalAdd from "./BancoModalAdd";
import CuentasModalEdit from "../bancosCuentas/CuentaModalEdit";
import CuentasModalAdd from "../bancosCuentas/CuentaModalAdd";
import PettyCashModalAdd from "../pettyCash/PettyCashModalAdd";
import PettyCashModalEdit from "../pettyCash/PettyCashModalEdit";

export default function FinanzasCondominio() {
  const [bancos, setBancos] = useState([]);
  const [bancoSelecionado, setBancoSelecionado] = useState([]);

  const [cuentas, setCuentas] = useState([]);
  const [cuentaSeleccionada, setCuentaSeleccionada] = useState([]);

  const [pettyCash, setPettyCash] = useState([]);
  const [pettyCashSelected, setPettyCashSelected] = useState([]);

  const [condominios, setCondominios] = useState([]);

  // Cargar datos
  useEffect(() => {
    cargarBancos();
    cargarCuentas();
    cargarCajas();
  }, []);

  const cargarBancos = async () => {
    const res = await api.get("/bancos");
    setBancos(res.data);
  };

  const cargarCuentas = async () => {
    const res = await api.get("/cuentas");
    setCuentas(res.data);
  };

  const cargarCajas = async () => {
    const res = await api.get("/pettycash");
    setPettyCash(res.data);
  };

  const loadCondominios = async () => {
    const res = await api.get("/condominios");
    setCondominios(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Esta seguro que desea eliminar este banco?")) {
      try {
        await api.delete(`/bancos/${id}`);
        cargarBancos();
      } catch (error) {
        console.error("Error al intentar borrar este registro");
      }
    }
  };

  const handleDeleteCuenta = async (id) => {
    if (window.confirm("Esta seguro que desea eliminar esta cuenta?")) {
      try {
        await api.delete(`/cuentas/${id}`);
        cargarCuentas();
      } catch (error) {
        console.error("Error al intentar borrar este registro");
      }
    }
  };

  const handleDeletePettyCash = async (id) => {
    if(window.confirm("Esta seguro que desea eliminar esta caja chica?")){
      try {
        await api.delete(`/pettycash/${id}`);
        cargarCajas();
      } catch (error) {
        console.error("Error al intentar borrar el registro");
      }
    }
  }

  // para resolver error de modal
  window.addEventListener("hide.bs.modal", (event) => {
    event.target.inert = true;
  });

  window.addEventListener("show.bs.modal", (event) => {
    event.target.inert = false;
  });

  const totalBancos = bancos.length;
  const totalCuentas = cuentas.length;
  const totalCajas = pettyCash.length;

  return (
    <DashboardLayout>
      <div className="container-fluid">
        {/* Título */}
        <h2 className="mb-4">Finanzas ADECO</h2>

        {/* RESUMEN GRID */}
        <div className="row text-center mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm border-primary">
              <div className="card-body">
                <h5 className="card-title">🏦 Cuentas Bancarias</h5>
                <p className="display-6 fw-bold text-primary">{totalCuentas}</p>
                <small> cuentas registradas</small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-success">
              <div className="card-body">
                <h5 className="card-title">💰 Cajas Chicas</h5>
                <p className="display-6 fw-bold text-success">{totalCajas}</p>
                <small>cajas activas</small>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-secondary">
              <div className="card-body">
                <h5 className="card-title">🏢 Bancos</h5>
                <p className="display-6 fw-bold text-secondary">
                  {totalBancos}
                </p>
                <small>Bancos registrados</small>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN DETALLADA CON TABS */}
        <div className="card shadow-sm">
          <ul className="nav nav-tabs" id="finanzasTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="cuentas-tab"
                data-bs-toggle="tab"
                data-bs-target="#cuentas"
                type="button"
                role="tab"
              >
                Cuentas Bancarias
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="cajas-tab"
                data-bs-toggle="tab"
                data-bs-target="#cajas"
                type="button"
                role="tab"
              >
                Cajas Chicas
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="bancos-tab"
                data-bs-toggle="tab"
                data-bs-target="#bancos"
                type="button"
                role="tab"
              >
                Bancos
              </button>
            </li>
          </ul>

          <div className="tab-content mt-3">
            <div
              className="tab-pane fade show active m-2 "
              id="cuentas"
              role="tabpanel"
            >
              {/* boton agregar cuenta */}
              <button
                type="button"
                className="btn btn-primary mb-2"
                data-bs-toggle="modal"
                data-bs-target="#addCuentaModal"
                onClick={() => loadCondominios()}
              >
                Agregar Cuenta
              </button>

              <CuentasModalAdd
                bancos={bancos}
                condominios={condominios}
                cargarCuentas={cargarCuentas}
              />

              {/* tabla de cuentas bancarias */}
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Cuentas Bancarias</h5>
                </div>

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
                      {cuentas.length ? (
                        cuentas.map((account, index) => (
                          <tr key={account.id_account}>
                            <td>{index + 1}</td>
                            <td>{account.account_number}</td>
                            <td>{account.bank_name}</td>
                            <td>{account.account_type}</td>
                            {/* <td>{account.id_bank}</td> */}
                            <td
                              className={
                                account.balance < 0
                                  ? "text-danger fw-bold"
                                  : "text-success fw-bold"
                              }
                            >
                              {formatCurrency(
                                account.balance,
                                account.currency
                              )}
                            </td>
                            <td>{account.condo_nombre}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-warning btn-sm me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#editCuentaModal"
                                onClick={() => {
                                  setCuentaSeleccionada(account);
                                  loadCondominios();
                                }}
                                // onClick={() => {console.log(account)}}
                              >
                                Editar
                              </button>

                              {/* Modal editar Banco */}
                              <CuentasModalEdit
                                cuenta={cuentaSeleccionada}
                                cargarCuentas={cargarCuentas}
                                bancos={bancos}
                                condominios={condominios}
                              />

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  handleDeleteCuenta(account.id_account);
                                }}
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

            {/* Tabla cajas chicas */}
            <div className="tab-pane fade m-2" id="cajas" role="tabpanel">
              {/* boton agregar caja chica */}
              <button
                type="button"
                className="btn btn-success mb-2"
                data-bs-toggle="modal"
                data-bs-target="#addPettyCashModal"
                onClick={() => loadCondominios()}
              >
                Agregar Caja
              </button>

              <PettyCashModalAdd condominios={condominios} cargarCajas={cargarCajas} />

              {/* tabla de cajas chicas */}
              <div className="card shadow-sm">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">Cajas Chicas</h5>
                </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Condominio</th>
                        <th>Balance Inicial</th>
                        <th>Balance Actual</th>
                        <th>Creada</th>
                        <th>Ultima actualizacion</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pettyCash.length ? (
                        pettyCash.map((caja, index) => (
                          <tr key={caja.id_petty_cash}>
                            <td>{index + 1}</td>
                            <td>{caja.condominio}</td>
                            <td>{formatNumber(caja.initial_balance)}</td>
                            <td
                              className={
                                caja.current_balance < 0
                                  ? "text-danger fw-bold"
                                  : "text-success fw-bold"
                              }
                            >
                              {formatNumber(
                                caja.current_balance
                              )}
                            </td>
                            <td>{formatFecha(caja.created_at)}</td>
                            <td>{formatFecha(caja.updated_at)}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-warning btn-sm me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#editPettyCashModal"
                                onClick={() => {
                                  setPettyCashSelected(caja);
                                  loadCondominios();
                                }}
                              >
                                Editar
                              </button>

                              {/* Modal editar caja chica */}
                              <PettyCashModalEdit caja={pettyCashSelected} cargarCajas={cargarCajas} condominios={condominios} />

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeletePettyCash(caja.id_petty_cash)}
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

            <div className="tab-pane fade m-2" id="bancos" role="tabpanel">
              <button
                type="button"
                className="btn btn-secondary mb-2"
                data-bs-toggle="modal"
                data-bs-target="#addBancoModal"
              >
                Agregar Banco
              </button>

              <BancoModalAdd cargarBancos={cargarBancos} />

              {/* Aquí tabla de bancos */}
              <div className="card shadow-sm">
                <div className="card-header bg-secondary text-white">
                  <h5 className="mb-0">Bancos</h5>
                </div>
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
