import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function PettyCashModalEdit({ condominios, caja, cargarCajas }) {
  const [form, setForm] = useState(caja);

  useEffect(() => {
    setForm(caja);
  }, [caja]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/pettycash/${form.id_petty_cash}`, form);
      cargarCajas();
    } catch (error) {
      console.error("Ocurrio un error al intentar editar el registro");
    }
  };

  return (
    <div
      className="modal fade"
      id="editPettyCashModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Editar Caja Chica
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

              <div className="mb-3">
                <label className="form-label">
                  <strong>Balance Inicial</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ej: 20,000.00"
                  name="initial_balance"
                  step="0.01"
                  min="0"
                  value={form.initial_balance}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Balance Inicial</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ej: 20,000.00"
                  name="current_balance"
                  step="0.01"
                  min="0"
                  value={form.current_balance}
                  onChange={handleChange}
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
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
