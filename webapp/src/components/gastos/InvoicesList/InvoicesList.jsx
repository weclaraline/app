import {
    Container,
    makeStyles, Paper,


    Table,
    TableBody,
    TableCell,


    TableContainer, TableHead,
    TableRow
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { InvoicesService } from "../../../api";
import InvoicesListFilters from './InvoicesListFilters';

const invoicesService = new InvoicesService();

const useStyles = makeStyles((theme) => {
  const { main } = theme.palette.primary;
  return ({
    container: {
      padding: '30px',
      minHeight: '300px',
    },
    table: {
        minWidth: 650,
    },
    tableHead: {
        backgroundColor: main,
        color: theme.palette.common.white,
        fontWeight: 700
      }
  })
});

const InvoicesList = () => {  
    const classes = useStyles();

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        if(month && year) {
            requestInvoicesList(month, year);
        }
    }, [month, year])

    const requestInvoicesList = async (month, year) => { 
        const serviceResponse = await invoicesService.make(month, year);
        setInvoices(serviceResponse);
    }

    const handleMonth = (month) => {
        setMonth(month);
    }

    const handleYear = (year) => {
        setYear(year);
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString).toLocaleDateString();
        return date;
    }

    return (
        <Paper className={classes.container}>
            <Container>
                <InvoicesListFilters onUpdateMonth={handleMonth} onUpdateYear={handleYear}/>
                <TableContainer>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.tableHead} width="300">Concepto</TableCell>
                                <TableCell className={classes.tableHead}>Descripción</TableCell>
                                <TableCell className={classes.tableHead} width="120">Fecha</TableCell>
                                <TableCell className={classes.tableHead} width="120" align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {invoices.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>{row.concept}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{formatDate(row.date)}</TableCell>
                                <TableCell align="right">${row.total}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Paper>
    );
  };
  
  export default InvoicesList;
  