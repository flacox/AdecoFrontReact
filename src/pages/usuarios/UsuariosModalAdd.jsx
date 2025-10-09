import React, {useState} from 'react'
import axios from 'axios';

export default function UsuariosModalAdd({cargarUsuarios}) {

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        tel: "",
        rol: "",
        password: "",
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
      await axios.post("http://localhost:4000/api/usuarios", form);
      setForm({ nombre: "", email: "", tel: "", rol: "", password: "" });
      cargarUsuarios();
    } catch (error) {
      console.error("Error al intentar agregar usuario", error);
    }
  };
  return (
    <div
            className="modal fade"
            id="addUserModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Agregar Usuario
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
                        placeholder="Ej: frank"
                        name="nombre"
                        value={form.nombre}
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
                        <strong>Telefono</strong>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Ej: 809-321-6547"
                        name="tel"
                        value={form.tel}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        <strong>Rol</strong>
                      </label>
                      <select
                        className="form-control"
                        name="rol"
                        value={form.rol}
                        onChange={handleChange}
                        required
                      >
                        <option value="Residente">Selecciona un Rol</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Residente">Residente</option>
                        <option value="Propietario">Propietario</option>
                        <option value="Empleado">Empleado</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        <strong>Password</strong>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                      />
                      <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                      </div>
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
