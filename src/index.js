import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AsesoriasApp from "./AsesoriasApp";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AsesoriasApp />
  </BrowserRouter>
);
