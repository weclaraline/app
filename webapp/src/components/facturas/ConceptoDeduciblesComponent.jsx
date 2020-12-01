import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DeductiblesConceptService } from "../../api/";
import ConceptosDeduciblesListComponent from "../facturas/ConceptosDeducibles/ConceptosDeduciblesListComponent";

const deductiblesConceptService = new DeductiblesConceptService({});

const ConceptoDeduciblesComponent = () => {

    const [conceptosDeducibles, setConceptosDeducibles] = useState([]);
    
    const fetchConceptosDeducibles = async () => {
        const data = await deductiblesConceptService.make();
        setConceptosDeducibles(data);
    }

    useEffect(() => {
        fetchConceptosDeducibles();
    }, []);
 
    return (<Card>
        <CardContent>
            <Grid item xs={12}>
                <Typography 
                    variant="h5" 
                    align="left" 
                    gutterBottom
                >
                    Conceptos
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ConceptosDeduciblesListComponent conceptosDeducibles={conceptosDeducibles}/>
            </Grid>
        </CardContent>
    </Card>);
}

export default ConceptoDeduciblesComponent;