import React, { useContext, useState, useEffect } from "react";
import { SocketContext } from "../../context/SocketContext";
import { fetchSinToken } from "../../helpers/helperFetch";
import { ToastComponent } from "../Toast/Toast";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const MaestroPreguntas = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [ultimaPregunta, setUltimaPregunta] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { socket } = useContext(SocketContext);

  const getPreguntas = async () => {
    const res = await fetchSinToken("preguntas");
    const body = await res.json();
    setPreguntas(body.preguntas.rows);
  };

  useEffect(() => {
    getPreguntas();
  }, []);

  useEffect(() => {
    socket.on("notificar-pregunta", async (pregunta) => {
      setUltimaPregunta(pregunta);
      setShowToast(true);
      await getPreguntas();
    });

    setTimeout(() => {
      setShowToast(false);
    }, 4600);
  }, [showToast]);

  return (
    <>
      {showToast && (
        <ToastComponent mensaje={ultimaPregunta} titulo={"Nueva Pregunta"} />
      )}
      <h1 className="text-center">Preguntas Enviadas por los Padres</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell scope="col">Pregunta</TableCell>
              <TableCell scope="col">Agregar una Respuesta</TableCell>
              <TableCell scope="col">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {preguntas.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.preguntaHecha}</TableCell>
                <TableCell align="left">
                  <input type="text" />
                </TableCell>
                <TableCell align="left">
                  <button className="btn btn-warning me-2 btn-sm">
                    Editar
                  </button>
                  <button className="btn btn-danger btn-sm">Eliminar</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
