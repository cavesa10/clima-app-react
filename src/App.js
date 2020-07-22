import React, { Fragment, useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Formulario } from "./components/Formulario";
import { Clima } from "./components/Clima";
import { Error } from "./components/Error";

function App() {
  const initialState = {
    ciudad: "",
    pais: "",
  };
  // state del formulario
  const [busqueda, setBusqueda] = useState(initialState);

  const [consulta, setConsulta] = useState(false);

  const [resultado, setResultado] = useState({});

  const [codeError, setCodeError] = useState(false);

  // Extraer ciudad y pais
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consulta) {
        const appId = "e8563ec1e6741253cff456ec9740327b";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado);
        setConsulta(false);

        if (resultado.cod === "404") {
          setCodeError(true);
        } else {
          setCodeError(false);
        }
      }
    };
    consultarAPI();
    // eslint-disable-next-line
  }, [consulta]);

  let componente;

  if (codeError) {
    componente = <Error mensaje="No hay resultado" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }

  return (
    <Fragment>
      <Header titulo="Clima React App" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsulta={setConsulta}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
