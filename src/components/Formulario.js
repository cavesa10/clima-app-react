import React, { useState } from "react";
import { Error } from "./Error";
import PropTypes from "prop-types";

export const Formulario = ({ busqueda, setBusqueda, setConsulta }) => {
  // Extraemos los props
  const { ciudad, pais } = busqueda;

  const [error, setError] = useState(false);

  // funcion que cololca los elemetos en el state
  const handleChange = (e) => {
    // actulizar el state
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar
    if (ciudad.trim() === "" || pais.trim() === "") {
      setError(true);
      return null;
    }
    setError(false);

    // Pasarlo al componente principal
    setConsulta(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error ? <Error mensaje="Ambos campos son obligatorios" /> : null}
      <div className="input-field col s12">
        <input
          type="text"
          name="ciudad"
          id="ciudad"
          value={ciudad}
          onChange={handleChange}
        />
        <label htmlFor="ciudad">Ciudad: </label>
      </div>
      <div className="input-field col s12">
        <select name="pais" id="pais" value={pais} onChange={handleChange}>
          <option value="">--Seleccione un País--</option>
          <option value="US">Estados Unidos</option>
          <option value="MX">México</option>
          <option value="AR">Argentina</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="ES">España</option>
          <option value="PE">Perú</option>
        </select>
        <label htmlFor="pais">País: </label>
      </div>
      <div className="input-field col s12">
        <button
          type="submit"
          className="waves-effect waves-light btn-large btn-block"
        >
          Buscar Clima
        </button>
      </div>
    </form>
  );
};

Formulario.propTypes = {
  busqueda: PropTypes.object.isRequired,
  setBusqueda: PropTypes.func.isRequired,
  setConsulta: PropTypes.func.isRequired,
};
