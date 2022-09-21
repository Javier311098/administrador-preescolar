import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const lowercase = message.toLowerCase();
    if (
      lowercase.includes("hola") ||
      lowercase.includes("hey") ||
      lowercase.includes("kiubo")
    )
      actions.manejarSaludo();
    else if (
      lowercase.includes("quiero informes") ||
      lowercase.includes("informes") ||
      lowercase.includes("asesorias") ||
      lowercase.includes("asesoria") ||
      lowercase.includes("academicas") ||
      lowercase.includes("quiero asesoria")
    )
      actions.manejarInformes();
    else if (
      lowercase.includes("adios") ||
      lowercase.includes("nada") ||
      lowercase.includes("goodbye") ||
      lowercase.includes("sale") ||
      lowercase.includes("nos vemos") ||
      lowercase.includes("camara")
    )
      actions.manejarDespedida();
    else actions.manejarExcepciones();
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
