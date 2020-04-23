import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

import Error from "./Error";
import useMoneda from "../hooks/useMonedas";
import useCriptomoneda from "../hooks/useCriptomoneda";
import axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {
  // state del listado de criptomonedas
  const [listacripto, guardarCriptomonedas] = useState([]);
  const [error, guardarError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dolarde Estados Unidos" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra Esterlina" },
    { codigo: "COD", nombre: "Peso Colombiano" },
  ];

  // utilizar useMoneda con cruston hook
  const [moneda, SelectMonedas, actualizarState] = useMoneda(
    "Elige tu Moneda",
    "",
    MONEDAS
  );
  // ultilizar useCriptomoneda
  const [criptoMoneda, SelectCripto] = useCriptomoneda(
    "Elige tu Criptomoneda",
    "",
    listacripto
  );

  // Ejecutar llamado a la API
  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const resultado = await axios.get(url);

      guardarCriptomonedas(resultado.data.Data);
    };
    consultarAPI();
  }, []);

  // cuando el usuario hace submit
  const cotizarMoneda = (e) => {
    e.preventDefault();

    // validar si ambos campos estan llenos
    if (moneda === "" || criptoMoneda === "") {
      guardarError(true);
      return;
    }
    // Pasar los datos al componente principal
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(criptoMoneda);

  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="calcular" />
    </form>
  );
};

export default Formulario;
