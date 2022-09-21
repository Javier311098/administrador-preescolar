import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [
    createChatBotMessage(
      `Bienvenido al sistema de asesorias academicas en que te puedo ayudar el dia de hoy? :)`
    ),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#0E53D1",
    },
    chatButton: {
      backgroundColor: "#15683E",
    },
  },
};

export default config;
