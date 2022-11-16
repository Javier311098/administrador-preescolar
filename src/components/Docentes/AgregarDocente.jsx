import React from "react";
import { useForm } from "../../hooks/useForm";

export const AgregarDocente = () => {
  const [formLoginValues, handleLoginInputChange] = useForm({
    nombre: "",
    email: "",
    celular: "",
  });

  const { nombre, email, celular } = formLoginValues;

  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={submit} className="form-container">
      <label className="form-label fs-6 ">Nombre</label>
      <input
        title="Tooltip on right"
        type="email"
        className="form-control"
        name="nombre"
        value={nombre}
        onChange={handleLoginInputChange}
      />

      <label className="form-label fs-6">Correo Electronico</label>
      <input
        title="Tooltip on right"
        type="email"
        className="form-control"
        placeholder="name@example.com"
        name="email"
        value={email}
        onChange={handleLoginInputChange}
      />
      <label className="form-label fs-6">Celular</label>
      <input
        title="Tooltip on right"
        type="text"
        className="form-control"
        name="celular"
        value={celular}
        onChange={handleLoginInputChange}
      />

      <select className="form-select mt-3" aria-label="Default select example">
        <option selected>Grupo</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <button className="btn btn-primary mt-3" type="submit">
        Actualizar
      </button>
    </form>
  );
};
