import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React from "react";
import ConceptoDeduciblesComponent from "../facturas/ConceptoDeduciblesComponent";
import FAQEnlacesComponent from "../facturas/FAQEnlacesComponent";

const useStyles = makeStyles( (theme) => {
    const { main } = theme.palette.primary;
    const { overline, h1 } = theme.typography;
    return (
        {
            headerRow: {
                height: "200px",
                background: main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            },
            paper: {
                alignContent: "center",
                justifyContent: "center",
                color: "white",
                background: "transparent"
            },
            header: {
                h1
            },
            overline: {
                overline,
            },
        }
    )
});

const Facturas = () => {

    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid 
                data-testid="title_banner" 
                item 
                className={classes.headerRow}
                xs={12}
            >
                <Paper elevation={0} className={classes.paper}>
                    <Typography variant={"h4"}>
                        Guía para solicitar facturas.
                    </Typography>
                    <Typography variant={"h6"}>
                        Sigue los pasos para que fácilmente...
                    </Typography>
                </Paper>
            </Grid>
            <Grid item xs={8}>
                <ConceptoDeduciblesComponent />
            </Grid>
            <Grid item xs={4}>
                <FAQEnlacesComponent />
            </Grid>    
        </Grid>
    );
}

export default Facturas;