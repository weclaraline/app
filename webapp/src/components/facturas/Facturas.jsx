import { Container } from "@material-ui/core";
import React from "react";
import ConceptoDeduciblesComponent from "./ConceptoDeduciblesComponent";
import FAQEnlacesComponent from "./FAQEnlacesComponent";

const Facturas = () => {
    return (
        <Container>
            <ConceptoDeduciblesComponent />
            <FAQEnlacesComponent />
        </Container>
    );
}

export default Facturas;