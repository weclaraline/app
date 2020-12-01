import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import Graphs from './Graphs';
import FileUploader from './FileUploader';
import InvoicesList from './InvoicesList/InvoicesList';

const useStyles = makeStyles((theme) => {
    const { main } = theme.palette.primary;
    const { overline, h1 } = theme.typography;
    return {
        detailsContainer: {
            margin: theme.spacing(2),
        },
        headerRow: {
            height: '200px',
            background: main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            alignContent: 'center',
            justifyContent: 'center',
            color: 'white',
            background: 'transparent',
        },
        header: {
            h1,
        },
        overline: {
            overline,
        },
    };
});


function Gastos() {
    const classes = useStyles();

    return (
        <Grid container className={classes.facturasContainer}>
            <Grid
                data-testid="title_banner"
                item
                className={classes.headerRow}
                xs={12}
            >
                <Paper elevation={0} className={classes.paper}>
                    <Typography variant={'h4'}>Mis Gastos y límites</Typography>
                    <Typography variant={'h6'}>
                        Sigue los pasos para que fácilmente...
                    </Typography>
                </Paper>
            </Grid>
            <Grid container spacing={3} className={classes.detailsContainer}>
                <Grid item xs={12} lg={12}>
                    <FileUploader></FileUploader>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <Graphs />
                </Grid>
                <Grid item xs={12} lg={12}>
                    <InvoicesList />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Gastos;