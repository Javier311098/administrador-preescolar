import { Grid, MenuItem, TextField } from "@mui/material";
import { useRef, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { comenzarEditarAlumno } from "../../store/slicers/alumnosActions";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
const validaciones = {
  nombre: [
    (value) => value.length > 3,
    "El nombre debe tener al menos 4 caracteres",
  ],
  direccion: [(value) => value.length > 8, "Debe ingresar una direccion"],
  telefonoEmergencia: [
    (value) => value.length > 9,
    "Debe ingresar al menos un telefono de emergencia",
  ],
  tipoSangre: [(value) => value.length > 0, "Debe ingresar el tipo de sangre"],
  edad: [(value) => value > 0, "Debe ingresar la edad"],
  grado: [(value) => value > 0, "Debe asignarle un grado"],
};

const tipo = ["A+", "A-", "O+", "O-", "AB+", "AB-", "B+", "B-"];

export const EditarAlumno = ({ cerrarModales }) => {
  registerLocale("es", es);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { listaGrados } = useSelector((state) => state.grados);
  const { alumnoSeleccionado } = useSelector((state) => state.alumnos);
  const fileInputRef1 = useRef();
  const [img1, setImg1] = useState(
    alumnoSeleccionado.foto_usuario !== null
      ? alumnoSeleccionado.foto_usuario
      : ""
  );
  const [fechaNacimiento, setFechaNacimiento] = useState(
    new Date(alumnoSeleccionado.fecha_nacimiento)
  );
  const [formLoginValues, handleLoginInputChange, validacion, isValid] =
    useForm(
      {
        nombre: alumnoSeleccionado.nombre_usuario,
        direccion: alumnoSeleccionado.direccion_residencia,
        telefonoEmergencia: alumnoSeleccionado.telefono_emergencia_1,
        telefonoEmergencia2: alumnoSeleccionado.telefono_emergencia_2,
        tipoSangre: alumnoSeleccionado.tipo_sangre,
        edad: alumnoSeleccionado.edad,
        fechaNacimiento: alumnoSeleccionado.fecha_nacimiento,
        foto: img1,
        grado: alumnoSeleccionado.id_grado,
      },
      validaciones
    );

  const {
    nombre,
    direccion,
    telefonoEmergencia,
    telefonoEmergencia2,
    tipoSangre,
    edad,
    grado,
  } = formLoginValues;

  const {
    nombreValid,
    direccionValid,
    telefonoEmergenciaValid,
    tipoSangreValid,
    edadValid,
    gradoValid,
  } = validacion;
  const dispach = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (isValid) {
      const alumno = {
        nombre_usuario: nombre,
        direccion_residencia: direccion,
        telefono_emergencia_1: telefonoEmergencia,
        telefono_emergencia_2: telefonoEmergencia2,
        tipo_sangre: tipoSangre,
        edad: edad,
        id_rol: 3,
        id_grado: grado,
        fecha_nacimiento: fechaNacimiento,
        foto_usuario: img1,
      };
      dispach(comenzarEditarAlumno(alumno, alumnoSeleccionado.id_usuario));
      cerrarModales();
    }
  };

  const cargarImagen = (e) => {
    if (e.target.files === 0) return;
    const file = new FileReader();
    file.readAsDataURL(e.target.files[0]);
    file.onload = function () {
      setImg1(file.result);
    };
  };

  const handleFechaInicio = (date) => {
    setFechaNacimiento(date);
  };

  return (
    <>
      <form onSubmit={submit} className="form-alumno ">
        <div className="form-alumno ">
          <div className="alumno-form-derecho">
            <Grid container item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Nombre del Alumno"
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
                label="Direccion"
                type="text"
                placeholder="avenida siempre viva 777"
                name="direccion"
                value={direccion}
                fullWidth
                onChange={handleLoginInputChange}
                error={!!direccionValid && formSubmitted}
                helperText={formSubmitted && direccionValid}
              />
            </Grid>

            <Grid container item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Telefono de Emergencia"
                type="text"
                placeholder="33-33-33-33-33"
                name="telefonoEmergencia"
                value={telefonoEmergencia}
                fullWidth
                onChange={handleLoginInputChange}
                error={!!telefonoEmergenciaValid && formSubmitted}
                helperText={formSubmitted && telefonoEmergenciaValid}
              />
            </Grid>
            <Grid container item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Segundo telefono de emergencia"
                type="text"
                placeholder="33-33-33-33-33"
                name="telefonoEmergencia2"
                value={telefonoEmergencia2}
                fullWidth
                onChange={handleLoginInputChange}
              />
            </Grid>
            <Grid container item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Tipo de Sangre"
                select
                type="text"
                placeholder="A+"
                name="tipoSangre"
                value={tipoSangre}
                fullWidth
                onChange={handleLoginInputChange}
                error={!!tipoSangreValid && formSubmitted}
                helperText={formSubmitted && tipoSangreValid}
              >
                {tipo.map((tipo) => (
                  <MenuItem key={tipo} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </TextField>
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
          <div className="alumno-form-izquierdo">
            <Grid container item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Grado"
                select
                type="text"
                name="grado"
                value={grado}
                fullWidth
                onChange={handleLoginInputChange}
                error={!!gradoValid && formSubmitted}
                helperText={formSubmitted && gradoValid}
              >
                {listaGrados.map((grado) => (
                  <MenuItem key={grado.id_grado} value={grado.id_grado}>
                    {grado.nombre_grado}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <FormLabel>Fecha de Nacimiento:</FormLabel>
            <DatePicker
              selected={fechaNacimiento}
              onChange={handleFechaInicio}
              locale="es"
              dateFormat="dd//MM/yyyy"
            />
            <div
              className="imagen-alumno text-center"
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
    </>
  );
};
