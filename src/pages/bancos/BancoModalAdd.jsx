import axios from "axios";
import { useState } from "react";

export default function BancoModalAdd({ cargarBancos }) {
  const [form, setForm] = useState({
    name: "",
    contact_name: "",
    contac: "",
    email: "",
    rnc: "",
    address: "",
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
      await axios.post("http://localhost:4000/api/bancos", form);
      setForm({
        name: "",
        contact_name: "",
        contac: "",
        email: "",
        rnc: "",
        address: "",
      });
      cargarBancos();
    } catch (error) {
      console.error("Error al intentar agregar el registro");
    }
  };

  return (
    <div
      className="modal fade"
      id="addBancoModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Agregar Banco
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
                  placeholder="Ej: Banreservas"
                  name="name"
                  value={form.name}
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
                  placeholder="Ej: Francisco T."
                  name="contact_name"
                  value={form.contact_name}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Telefono</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: 809-321-6543"
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
                  placeholder="Ej: frank@cmd.com"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>RNC</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ej: 32165478910"
                  name="rnc"
                  value={form.rnc}
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
