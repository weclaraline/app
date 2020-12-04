import { Accordion, AccordionDetails, AccordionSummary, Box, Container, FormControlLabel, Grid, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReceiptIcon from '@material-ui/icons/Receipt';
import React from "react";

const useStyles = makeStyles( () => {
    return {
        orangeBackground: {
            background: "orange",
            width: "100%",
            color: "white",
        },
        borderedContainer: {
            border: "1px solid",
            borderColor: "darkgray",
            padding: "0px"
        }
    }
} );

const ConceptosDeduciblesListComponent = ({conceptosDeducibles}) => {

    const classes = useStyles();

    const noContent = (
        <Typography variant="h6" align="left" gutterBottom>
            No se encontraron resultados
        </Typography>
    );

    const displayAsLabeledList = (label, items) => !items ? noContent :
        <Container maxWidth="xs" className={classes.borderedContainer} >
            <Typography className={classes.orangeBackground}>
            <FormControlLabel label={label} control={<FavoriteIcon />}/>
            </Typography>
            <ul>
                {
                    items.map( (item) => 
                        <Typography key={Math.random()}>
                            <li>
                                {item.description}
                            </li>
                        </Typography> 
                    )
                }
            </ul>
        </Container>

    const listaConceptosDeducibles = (
        <div data-testid='lista_tipo_deducibles'>
             {conceptosDeducibles.map( ({ key, tipo_deduccion, deduction, recommendations, requirements }) => (
                <Accordion key={ `concepto_deducible_${key}`} data-testid={`concepto_deducible_${key}`}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <FormControlLabel label={ deduction } control={<ReceiptIcon />}/>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Grid container spacing={0}  alignContent={"center"} >
                            <Grid item xs={12} md={6} >
                                {
                                    displayAsLabeledList("Recomendaciones", recommendations)
                                }
                            </Grid>
                            <Grid item xs={12} md={6} >
                                {
                                    displayAsLabeledList("Requisitos", requirements)
                                }
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );

    const content = conceptosDeducibles.length ? listaConceptosDeducibles : noContent;

    return <Box mb={2}>
                {content}
            </Box>

}


export default ConceptosDeduciblesListComponent;