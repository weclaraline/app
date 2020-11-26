import React from 'react';
import Container from '../../components/Container';
import Graphs from './Graphs';
import FileUploader from './FileUploader';


const Gastos = () => (
  <Container>
    <div data-testid="gastos_page">
      <h1>Página de Gastos.</h1>
      <FileUploader></FileUploader>
      <Graphs />
    </div>
  </Container>
);

export default Gastos;
