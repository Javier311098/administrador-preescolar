import { Grid, MenuItem, TextField } from "@mui/material";
import { useEffect } from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import {
  comenzarEditarPadre,
  obtenerRelacionPadre,
} from "../../store/slicers/padreActions";
import { Spinner } from "../Spinner/Spinner";

const validaciones = {
  nombre: [
    (value) => value.length > 3,
    "El nombre debe tener al menos 4 caracteres",
  ],
  telefono: [(value) => value.length > 8, "Debe ingresar un telefono"],

  correoElectronico: [
    (value) => value.length > 6,
    "Debe ingresar un correo valido",
  ],
  passwordUsuario: [
    (value) => value.length > 5,
    "Debe ingresar una contraseña",
  ],
  edad: [(value) => value > 0, "Debe ingresar la edad"],
  alumno: [(value) => value > 0, "Debe elegir un alumno"],
};

export const EditarPadre = ({ cerrarModales }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { listaAlumnos } = useSelector((state) => state.alumnos);
  const { padreSeleccionado, alumnoSeleccionado, isLoadingData } = useSelector(
    (state) => state.padres
  );
  const fileInputRef1 = useRef();
  const [img1, setImg1] = useState(
    padreSeleccionado.foto_usuario !== null
      ? padreSeleccionado.foto_usuario
      : ""
  );

  const [formLoginValues, handleLoginInputChange, validacion, isValid] =
    useForm(
      {
        nombre: padreSeleccionado.nombre_usuario,
        telefono: padreSeleccionado.telefono,
        correoElectronico: padreSeleccionado.correo_electronico,
        passwordUsuario: "",
        alumno: alumnoSeleccionado.id_usuario,
        edad: 20,
      },
      validaciones
    );

  const { nombre, telefono, correoElectronico, passwordUsuario, alumno, edad } =
    formLoginValues;

  const {
    nombreValid,
    telefonoValid,
    correoElectronicoValid,
    passwordUsuarioValid,
    alumnoValid,
    edadValid,
  } = validacion;
  const dispach = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (isValid) {
      const padre = {
        nombre_usuario: nombre,
        telefono: telefono,
        correo_electronico: correoElectronico,
        password_usuario: passwordUsuario,
        id_rol: 4,
        edad: edad,
        foto_usuario: img1,
      };
      const idAlumno = alumno;
      dispach(
        comenzarEditarPadre(padre, padreSeleccionado.id_usuario, idAlumno)
      );
      cerrarModales();
    }
  };

  useEffect(() => {
    dispach(obtenerRelacionPadre(padreSeleccionado.id_usuario));
  }, []);

  const cargarImagen = (e) => {
    if (e.target.files === 0) return;
    const file = new FileReader();
    file.readAsDataURL(e.target.files[0]);
    file.onload = function () {
      setImg1(file.result);
    };
  };

  return (
    <>
      {isLoadingData ? (
        <Spinner />
      ) : (
        <form onSubmit={submit} className="form-padre ">
          <div className="form-padre ">
            <div className="padre-form-derecho">
              <Grid container item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Nombre del Padre o tutor"
                  type="text"
                  placeholder="juan perez perez"
                  name="nombre"
                  value={nombre}
                  fullWidth
                  onChange={handleLoginInputChange}
                  error={!!nombreValid && formSubmitted}
                  helperText={formSubmitted && nombreValid}
                />
              </Grid>
              <Grid container item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Telefono"
                  type="text"
                  placeholder="33-33-33-33-33"
                  name="telefono"
                  value={telefono}
                  fullWidth
                  onChange={handleLoginInputChange}
                  error={!!telefonoValid && formSubmitted}
                  helperText={formSubmitted && telefonoValid}
                />
              </Grid>

              <Grid container item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Correo Electronico"
                  type="email"
                  placeholder="juan@example.com"
                  name="correoElectronico"
                  value={correoElectronico}
                  fullWidth
                  onChange={handleLoginInputChange}
                  error={!!correoElectronicoValid && formSubmitted}
                  helperText={formSubmitted && correoElectronicoValid}
                />
              </Grid>
              <Grid container item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Contraseña"
                  type="password"
                  placeholder="*********"
                  name="passwordUsuario"
                  value={passwordUsuario}
                  fullWidth
                  onChange={handleLoginInputChange}
                  error={!!passwordUsuarioValid && formSubmitted}
                  helperText={formSubmitted && passwordUsuarioValid}
                />
              </Grid>
              <Grid container item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Edad"
                  type="number"
                  placeholder="5"
                  name="edad"
                  value={edad}
                  fullWidth
                  onChange={handleLoginInputChange}
                  error={!!edadValid && formSubmitted}
                  helperText={formSubmitted && edadValid}
                />
              </Grid>
            </div>
            <div className="padre-form-izquierdo">
              <Grid container item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label="Alumno"
                  select
                  type="text"
                  name="alumno"
                  value={alumno}
                  fullWidth
                  onChange={handleLoginInputChange}
                  error={!!alumnoValid && formSubmitted}
                  helperText={formSubmitted && alumnoValid}
                >
                  {listaAlumnos.map((alumno) => (
                    <MenuItem key={alumno.id_usuario} value={alumno.id_usuario}>
                      {alumno.nombre_usuario}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <div
                className="imagen-padre text-center"
                onClick={() => fileInputRef1.current.click()}
              >
                {img1.length > 0 ? (
                  <img src={img1} alt="img" className="imagen-preview" />
                ) : (
                  " Agregar imagen"
                )}
              </div>
              <input
                className="mt-2 "
                type="file"
                accept="image/*"
                ref={fileInputRef1}
                onChange={cargarImagen}
                style={{ display: "none" }}
              />

              <button className="btn btn-primary mt-5" type="submit">
                Editar
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
