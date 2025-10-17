import api from "../../api/axios";
import { useEffect, useState } from "react";

export default function OwnerModalEdit({ owner, loadOwners }) {
  const [form, setForm] = useState(owner);

  useEffect(() => {
    setForm(owner);
  }, [owner])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/owners/${form.id_owner}`, form);
      loadOwners();
    } catch (error) {
      console.error("Error al intentar actualizar el registro");
    }
  };

  return (
    <div
      className="modal fade"
      id="editOwnerModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Editar Propietario
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
                  <strong>Nombre</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Pedro"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Apellido</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Garcia"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Contacto</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: 809-654-3214"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Ej: pgarcia@cmd.com"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Direccion</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: C/2 #2 Santiago"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Balance</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ej: 5,000.00"
                  name="balance"
                  value={form.balance}
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
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
