import { Accordion, AccordionDetails, AccordionSummary, Box, Container, FormControlLabel, Grid, makeStyles, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ReceiptIcon from '@material-ui/icons/Receipt';
import propTypes from "prop-types";
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
        <Container maxWidth="xs" className={classes.borderedContainer}>
            <Typography className={classes.orangeBackground}>
            <FormControlLabel label={label} control={<FavoriteIcon />}/>
            </Typography>
            <ul>
                {
                    items.map( (item) => 
                        <Typography key={item.description}>
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
             {conceptosDeducibles.map(conceptoDeducible => (
                <Accordion key={conceptoDeducible.tipo_deduccion}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <FormControlLabel label={conceptoDeducible.deduction} control={<ReceiptIcon />}/>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Grid container spacing={0}  alignContent={"center"} >
                            <Grid item xs={12} md={6} >
                                {
                                    displayAsLabeledList("Recomendaciones",conceptoDeducible.recommendations)
                                }
                            </Grid>
                            <Grid item xs={12} md={6} >
                                {
                                    displayAsLabeledList("Requisitos",conceptoDeducible.requirements)
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

ConceptosDeduciblesListComponent.propTypes = {
    conceptosDeducibles :  propTypes.array.isRequired
}

export default ConceptosDeduciblesListComponent;