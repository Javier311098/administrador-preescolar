import React from "react";
import { useForm } from "../../hooks/useForm";

export const RegistroScreen = () => {
  const [userValues, handleInputChange] = useForm({
    name: "example",
    password: "123456",
    email: "example@example.com",
    role: "Docente",
    materia: "",
  });

  const submit = (e) => {
    e.preventDefault();
    console.log(userValues);
  };

  return (
    <>
      <h1>Registro de Usuarios</h1>
      <form onSubmit={submit}>
        <div className="form-group">
          <label for="exampleInputEmail1">Nombre Completo</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={userValues.name}
            aria-describedby="emailHelp"
            placeholder=""
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Correo Electronico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={userValues.email}
            onChange={handleInputChange}
            aria-describedby="emailHelp"
            placeholder="ejemplo@ejemplo.com"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="*******"
            name="password"
            value={userValues.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label for="rolSelected">Rol</label>
          <select
            className="form-control"
            id="rolSelected"
            name="role"
            value={userValues.role}
            onChange={handleInputChange}
          >
            <option>Administrador</option>
            <option>Docente</option>
            <option>Estudiante</option>
          </select>
        </div>
        {userValues.role === "Estudiante" && (
          <div className="form-group">
            <label for="rolSelected">Materia</label>
            <select
              className="form-control"
              id="rolSelected"
              name="materia"
              value={userValues.materia}
              onChange={handleInputChange}
            >
              <option>Fisica</option>
              <option>Computacion Basica</option>
              <option>Seguridad en Redes</option>
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-3">
          Registrar
        </button>
      </form>
    </>
  );
};
