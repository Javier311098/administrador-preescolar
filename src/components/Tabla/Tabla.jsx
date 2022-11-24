import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { MdVisibility, MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { Modal } from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { ModalEliminar } from "../Modal/ModalEliminar";

export const Tabla = ({
  headers = [],
  data = [],
  buscador,
  navegacion,
  accionVer,
  accionEditar,
  accionEliminar,
  noCrear = false,
  noEditar = false,
  noEliminar = false,
  seleccionar,
  Children,
}) => {
  const [datos, setDatos] = useState([]);
  const [term, setTerm] = useState("");
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [valueSelected, setValueSelected] = useState({});
  const dispatch = useDispatch();
  const modalOpen = () => {
    setModalEditar(false);
    setModalEliminar(false);
  };
  useEffect(() => {
    setDatos(data);
  }, [data]);

  const seleccionEditar = (value) => {
    setModalEditar(true);
    console.log(value);
    localStorage.setItem("actividad", JSON.stringify(value));
    dispatch(seleccionar(value));
  };
  const seleccionEliminar = (value) => {
    setModalEliminar(true);
    setValueSelected(value);
  };

  const searchingTerm = (term) => {
    return function (x) {
      return (
        (x[buscador] &&
          x[buscador].toLowerCase().includes(term.toLowerCase())) ||
        !term
      );
    };
  };
  return (
    <>
      <input
        className="w-50 rounded-2 ms-3 me-3 "
        type="text"
        placeholder={`Buscar actividades...`}
        value={term}
        name="term"
        onChange={({ target }) => setTerm(target.value)}
      />
      <TableContainer component={Paper} className="lista-container">
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {headers.map((columna, index) => (
                <TableCell key={index} scope="col">
                  {columna.replace("_", " ")}
                </TableCell>
              ))}
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {datos.filter(searchingTerm(term)).map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {headers.map((columna, index) => (
                  <TableCell key={index} scope="col">
                    {row[columna.toLowerCase()]}
                  </TableCell>
                ))}
                <TableCell align="left">
                  <Link
                    onClick={() => seleccionEditar(row)}
                    className="btn btn-primary me-2 btn-sm"
                    to={`${navegacion}/${row[headers[0]]}`}
                  >
                    <MdVisibility />
                  </Link>

                  <button
                    className="btn btn-warning me-2 btn-sm"
                    hidden={noEditar}
                    onClick={() => seleccionEditar(row)}
                  >
                    <MdModeEdit />
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    hidden={noEliminar}
                    onClick={() => seleccionEliminar(row)}
                  >
                    <MdDelete />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        show={modalEditar}
        dismiss={modalOpen}
        header={"Editar Actividad"}
        body={Children}
      />

      <ModalEliminar
        show={modalEliminar}
        dismiss={modalOpen}
        accionEliminar={() => {
          dispatch(accionEliminar(valueSelected[headers[0]]));
          modalOpen();
        }}
      />
    </>
  );
};
