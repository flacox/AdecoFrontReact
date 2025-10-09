import { useState } from "react";
import axios from "axios";

export default function CuentasModalAdd({ bancos, cargarCuentas }) {
  const [form, setForm] = useState({
    account_number: "",
    id_bank: "",
    account_type: "",
    balance: "",
    currency: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/cuentas", form);
      setForm({
        account_number: "",
        id_bank: "",
        account_type: "",
        balance: "",
        currency: "",
      });
      cargarCuentas();
    } catch (error) {
      console.error("Ocurrio un error al intentar agregar el registro");
    }
  };

  return (
    <div
      className="modal fade"
      id="addCuentaModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Agregar Cuenta
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
                  <strong>N. Cuenta</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ej: 123654789"
                  name="account_number"
                  value={form.account_number}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Banco</strong>
                </label>
                <select
                  className="form-control"
                  name="id_bank"
                  value={form.id_bank}
                  onChange={handleChange}
                  required
                >
                  <option value="Residente">Selecciona un Banco</option>
                  {bancos.map((banco) => (
                    <option key={banco.id_bank} value={banco.id_bank}>
                      {banco.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Tipo</strong>
                </label>
                <select
                  className="form-control"
                  name="account_type"
                  value={form.account_type}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un Tipo</option>
                  <option value="Ahorro">Ahorro</option>
                  <option value="Corriente">Corriente</option>
                  <option value="Empresarial">Empresarial</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Balance</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ej: 20,000.00"
                  name="balance"
                  step="0.01"
                  min="0"
                  value={form.balance}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Moneda</strong>
                </label>
                <select
                  className="form-control"
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona Moneda</option>
                  <option value="RD$">RD$</option>
                  <option value="US$">US$</option>
                  <option value="EU$">EU$</option>
                </select>
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
