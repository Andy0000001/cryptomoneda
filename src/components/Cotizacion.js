import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`

color: #FFF;
font-family: Arial, Helvetica, sans-serif;

`
const Info = styled.p`
font-size: 30px;
span{
    font-weight: bold;
}

`
const Precio = styled.p`
font-size: 30px;

`


const Cotizacion = ({resultado}) => {
    if (Object.keys(resultado).length === 0) return null;

    console.log(resultado);

    return ( 
        <ResultadoDiv>
            <Precio>El precio: <span>{resultado.PRICE}</span></Precio>
            <Info>Precio mas alto del Dia: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio mas bajo del Dia: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variacion ultimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Ultima actualizacion: <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
     );
}
 
export default Cotizacion;