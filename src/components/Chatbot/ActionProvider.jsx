import React from "react";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const cargarMensajesAnteriores = (botMessage) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const manejarSaludo = () => {
    const botMessage = createChatBotMessage("dime en que te puedo ayudar");
    cargarMensajesAnteriores(botMessage);
  };

  const manejarInformes = () => {
    const botMessage = createChatBotMessage(
      "en un momento te dare informes... "
    );
    cargarMensajesAnteriores(botMessage);
  };

  const manejarExcepciones = () => {
    const respuestas = [
      "lo siento no comprendi, podrias escribirlo de otra forma? ",
      "puedes repetirlo",
      "ahhh banda se me quema el coco loco",
      "saca de la que fumaste prro",
    ];
    const respuestaRandom =
      respuestas[Math.floor(Math.random() * respuestas.length)];
    const botMessage = createChatBotMessage(respuestaRandom);
    cargarMensajesAnteriores(botMessage);
  };

  const manejarDespedida = () => {
    const botMessage = createChatBotMessage("que tengas un buen dia!");
    cargarMensajesAnteriores(botMessage);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            manejarSaludo,
            manejarInformes,
            manejarExcepciones,
            manejarDespedida,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
