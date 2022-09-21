import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { BiBot } from "react-icons/bi";
import "./login.css";
import logo from "../../imagenes/unedl.png";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../Chatbot/config";
import MessageParser from "../Chatbot/MessageParser";
import ActionProvider from "../Chatbot/ActionProvider";

export const LoginScreen = () => {
  let navigate = useNavigate();
  const [mostrarBot, setMostrarBot] = useState(false);
  const [formLoginValues, handleLoginInputChange] = useForm({
    email: "",
    password: "",
  });

  const { email, password } = formLoginValues;

  const submit = (e) => {
    e.preventDefault();
    navigate("maestros");
  };

  return (
    <>
      <div className="center">
        <h1>Asesorias Academicas</h1>
        <img className="image-size" src={logo} alt="logo" />

        <form onSubmit={submit} className="form-container">
          <label className="form-label">Correo Electronico</label>
          <input
            title="Tooltip on right"
            type="email"
            className="form-control"
            placeholder="name@example.com"
            name="email"
            value={email}
            onChange={handleLoginInputChange}
          />

          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={handleLoginInputChange}
          />
          <button className="btn btn-primary mt-3" type="submit">
            Iniciar Sesion
          </button>
        </form>
        <button
          className="mt-3 btn btn-primary btn-circle "
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Yo te puedo ayudar"
          onClick={() => setMostrarBot((prev) => !prev)}
        >
          <BiBot size={35} />
        </button>
        {mostrarBot && (
          <div className="chat">
            <Chatbot
              config={config}
              messageParser={MessageParser}
              actionProvider={ActionProvider}
              headerText="UNEDL Chatbot"
              placeholderText="escribe tu pregunta..."
            />
          </div>
        )}
      </div>
    </>
  );
};
