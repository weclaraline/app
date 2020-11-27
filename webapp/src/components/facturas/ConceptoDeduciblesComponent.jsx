import { Grid, Typography } from "@material-ui/core";
import propTypes from "prop-types";
import React from "react";

const TipoDeduciblesComponent = () => {
    return (
        <Grid container data-testid="lista_tipo_deducibles">
            <Typography variant="subtitle2">Conceptos</Typography>
        </Grid>
    );
}

TipoDeduciblesComponent.propTypes = {
    tipoDeducibles: propTypes.array
}

export default TipoDeduciblesComponent;