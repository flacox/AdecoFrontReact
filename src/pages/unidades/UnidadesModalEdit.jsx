import { useEffect, useState } from 'react'
import api from "../../api/axios";


export default function UnidadesModalEdit({unidad, cargarUnidades, condominios, owners}) {
    const [form, setForm] = useState(unidad);

    useEffect(() => {
        setForm(unidad);
    }, [unidad]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/unidades/${form.unit_id}`, form);
            cargarUnidades();
        } catch (error) {
            console.error("Error al intentar editar la unidad", error);
        }
    };

  return (
    <div
      className="modal fade"
      id="editUnidadModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Editar Unidad
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
                  <option value="Residente">Selecciona un Condominio</option>
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
                  <strong>Numero</strong>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej: 2A"
                  name="numero"
                  value={form.numero}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Propietario</strong>
                </label>
                <select
                  className="form-control"
                  name="id_owner"
                  value={form.id_owner}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione Propietario</option>
                  {owners.map((owner) => (
                    <option
                      key={owner.id_owner}
                      value={owner.id_owner}
                    >
                      {owner.first_name} {owner.last_name}
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
                  name="tipo"
                  value={form.tipo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un Tipo</option>
                  <option value="Apartamento">Apartamento</option>
                  <option value="Casa">Casa</option>
                  <option value="Local Comercial">Local Comercial</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Area</strong>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ej: 200"
                  name="area"
                  value={form.area}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  <strong>Estado</strong>
                </label>
                <select
                  className="form-control"
                  name="estado"
                  value={form.estado}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona Estado</option>
                  <option value="Ocupada">Ocupado</option>
                  <option value="Vacante">Vacante</option>
                  <option value="En mantenimiento">Mantenimiento</option>
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
  )
}
