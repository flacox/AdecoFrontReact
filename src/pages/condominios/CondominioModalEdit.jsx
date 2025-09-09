import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CondominioModalEdit({ condominio, cargarCondominios }) {
  const [form, setForm] = useState(condominio);

  useEffect(() => {
    setForm(condominio);
  }, [condominio]);

  const handleChange = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`http://localhost:4000/api/condominios/${form.condo_id}`, form);
        cargarCondominios();
    } catch (error) {
        console.error("Error al intentar editar condominio", error);
    }
  };

  return (
    <div
      className="modal fade"
      id="editCondoModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Editar Condominio
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
                  placeholder="Ej: Florencia"
                  name="nombre"
                  value={form.nombre}
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
                  placeholder="Ej: AV. Restauracion #22"
                  name="direccion"
                  value={form.direccion}
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
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Num. Unidades</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="num_unidades"
                  value={form.num_unidades}
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
