import { useEffect, useState } from "react";
import api from "../../api/axios";
import axios from "axios";

export default function ExpenseModalAdd({ loadExpenses }) {
  const [condominios, setCondominios] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [pettyCashList, setPettyCashList] = useState([]);

  const [form, setForm] = useState({
    condo_id: "",
    payment_source_type: "",
    payment_source_id: "",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    cargarCondominios();
  }, []);

  const cargarCondominios = async () => {
    const res = await api.get("/condominios");
    setCondominios(res.data);
  };

  // Cargar cuentas y cajas chicas
  // useEffect(() => {
  //   if (form.condo_id) {
  //     if (form.payment_source_type === "bank") {
  //       axios
  //         .get(`/api/bank-accounts/${form.condo_id}`)
  //         .then((res) => setBankAccounts(res.data));
  //     } else if (form.payment_source_type === "petty_cash") {
  //       axios
  //         .get(`/api/petty-cash/${form.condo_id}`)
  //         .then((res) => setPettyCashList(res.data));
  //     }
  //   }
  // }, [form.condo_id, form.payment_source_type]);

  useEffect(() => {
    if (form.condo_id) {
      axios
        .get(`http://localhost:4000/api/cuentas?condo_id=${form.condo_id}`)
        .then((res) => setBankAccounts(res.data));

      axios
        .get(`http://localhost:4000/api/pettycash?condo_id=${form.condo_id}`)
        .then((res) => setPettyCashList(res.data));
    }
  }, [form.condo_id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/expenses", form);
      setForm({
        condo_id: "",
        payment_source_type: "",
        payment_source_id: "",
        description: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
      });
      loadExpenses();
    } catch (error) {
      console.error("Ocurrio un error al intentar agregar el registro");
    }
  };

  return (
    <div
      className="modal fade"
      id="addExpenseModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Agregar Gasto
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">
                  <strong>Condominio</strong>
                </label>
                <select
                  className="form-control"
                  name="condo_id"
                  value={form.condo_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona Condominio</option>
                  {condominios.map((condominio) => (
                    <option
                      key={condominio.condo_id}
                      value={condominio.condo_id}
                    >
                      {condominio.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo de cuenta */}
              <div className="mb-3">
                <label className="form-label">Tipo de cuenta</label>
                <select
                  className="form-select"
                  name="payment_source_type"
                  value={form.payment_source_type}
                  onChange={(e) => {
                    handleChange(e);
                    setForm((prev) => ({
                      ...prev,
                      payment_source_id: "",
                    }));
                  }}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="BANK_ACCOUNT">Cuenta Bancaria</option>
                  <option value="PETTY_CASH">Caja Chica</option>
                </select>
              </div>

              {/* Seleccionar cuenta o caja */}
              {form.payment_source_type === "BANK_ACCOUNT" && (
                <div className="mb-3">
                  <label className="form-label">Cuenta Bancaria</label>
                  <select
                    className="form-select"
                    name="payment_source_id"
                    value={form.payment_source_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    {bankAccounts.map((acc) => (
                      <option key={acc.id_account} value={acc.id_account}>
                        {acc.bank_name} - {acc.account_number}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {form.payment_source_type === "PETTY_CASH" && (
                <div className="mb-3">
                  <label className="form-label">Caja Chica</label>
                  <select
                    className="form-select"
                    name="payment_source_id"
                    value={form.payment_source_id}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    {pettyCashList.map((pc) => (
                      <option key={pc.id_petty_cash} value={pc.id_petty_cash}>
                        {`Caja chica - ${pc.current_balance} disponibles`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Descripción */}
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Monto */}
              <div className="mb-3">
                <label className="form-label">Monto</label>
                <input
                  type="number"
                  className="form-control"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>

              {/* Fecha */}
              <div className="mb-3">
                <label className="form-label">Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
