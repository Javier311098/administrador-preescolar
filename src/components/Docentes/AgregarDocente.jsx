import { Grid, MenuItem, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { comenzarCrearDocente } from "../../store/slicers/docentesActions";

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
    (value) => value.length > 0,
    "Debe ingresar una contraseña",
  ],
  edad: [(value) => value > 0, "Debe ingresar la edad"],
  grado: [(value) => value > 0, "Debe elegir un grado"],
};

export const AgregarDocente = ({ cerrarModales }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { listaGrados } = useSelector((state) => state.grados);
  const fileInputRef1 = useRef();
  const [img1, setImg1] = useState("");
  const [formLoginValues, handleLoginInputChange, validacion, isValid] =
    useForm(
      {
        nombre: "",
        telefono: "",
        correoElectronico: "",
        passwordUsuario: "",
        grado: "",
        edad: 25,
      },
      validaciones
    );

  const { nombre, telefono, correoElectronico, passwordUsuario, grado, edad } =
    formLoginValues;

  const {
    nombreValid,
    telefonoValid,
    correoElectronicoValid,
    passwordUsuarioValid,
    gradoValid,
    edadValid,
  } = validacion;
  const dispach = useDispatch();
  const submit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (isValid) {
      const docente = {
        nombre_usuario: nombre,
        telefono: telefono,
        correo_electronico: correoElectronico,
        password_usuario: passwordUsuario,
        id_rol: 2,
        edad: edad,
        foto_usuario: img1,
        id_grado: grado,
      };

      dispach(comenzarCrearDocente(docente));
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

  return (
    <>
      <form onSubmit={submit} className="form-docente ">
        <div className="form-docente ">
          <div className="docente-form-derecho">
            <Grid container item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Nombre del Docente"
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
          <div className="docente-form-izquierdo">
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

            <div
              className="imagen-docente text-center"
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
              Agregar
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
