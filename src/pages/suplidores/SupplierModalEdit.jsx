import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function SupplierModalEdit({ supplier, loadSuppliers }) {
  const [form, setForm] = useState(supplier);

  useEffect(() => {
    setForm(supplier);
  }, [supplier]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/suplidores/${form.supplier_id}`, form);
      loadSuppliers();
    } catch (error) {
      console.error("Error al intentar editar el suplidor", error);
    }
  };

  return (
    <div
      className="modal fade"
      id="editSupplierModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Editar Suplidor
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
                  <strong>Nombre Compañia</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Smart Tech Dom"
                  name="company_name"
                  value={form.company_name}
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
                  placeholder="Ej: Pedro Jose"
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
                  type="tel"
                  className="form-control"
                  placeholder="Ej: 809-321-6547"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Correo</strong>
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Ej: smtd@cmd.com"
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
                  <strong>Tipo de Servicio</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: Electrico"
                  name="service_type"
                  value={form.service_type}
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
