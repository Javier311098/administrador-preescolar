import React, { useState } from "react";
import { useAuthStore } from "../../hooks/useAuthStore";
import { Items } from "../NavItems/Items";
import { NavbarCelular } from "./NavbarCelular";

export const Navbar = () => {
  const [showSide, setShowSide] = useState(false);
  const { user } = useAuthStore();
  const mostrar = () => {
    setShowSide(!showSide);
  };
  const titleCase = (string) => {
    if (string !== undefined) {
      const sentence = string.toLowerCase().split(" ");
      for (let i = 0; i < sentence.length; i++) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1) + " ";
      }
      return sentence;
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
        <div className="container-fluid">
          <p className="text-white texto-center fs-5">
            Bienvenido {titleCase(user.nombre)}
          </p>
          <button
            onClick={mostrar}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Items />
            </ul>
          </div>
        </div>
      </nav>

      {showSide && <NavbarCelular />}
    </>
  );
};
