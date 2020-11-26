import React from 'react';
import Container from '../../components/Container';
import Graphs from './Graphs';


const Gastos = () => (
  <Container>
    <div data-testid="gastos_page">
      <h1>Página de Gastos.</h1>
      <Graphs />
    </div>
  </Container>
);

export default Gastos;
