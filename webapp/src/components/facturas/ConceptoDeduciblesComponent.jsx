import propTypes from "prop-types";
import React from "react";

const TipoDeduciblesComponent = () => {
    return (
        <div data-testid="lista_tipo_deducibles">
            Hola, contendré las recomendaciones.
        </div>
    );
}

TipoDeduciblesComponent.propTypes = {
    tipoDeducibles: propTypes.array
}

export default TipoDeduciblesComponent;