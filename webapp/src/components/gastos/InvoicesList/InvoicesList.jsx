import React, { useState, useEffect } from 'react';
import {
    Paper,
    Container,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, 
    TableContainer,
} from '@material-ui/core';
import ServiceAPI from '../../../api/ServiceAPI';
import {getCurrentLoggedUserInfo} from '../../../utils/LogIn'
import InvoicesListFilters from './InvoicesListFilters';

const useStyles = makeStyles((theme) => {
  const { main } = theme.palette.primary;
  return ({
    container: {
      padding: '30px',
      margin: '15px 0',
      minHeight: '300px',
    },
    table: {
        margin: theme.spacing(1),
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
    const api = new ServiceAPI();
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [list, setList] = useState([]);

    useEffect(() => {
        if(month && year) {
            getList(month, year);
        }
    }, [month, year])

    const getList = async (month, year) => { 
        let userInfo = await getCurrentLoggedUserInfo();
        api.createRequest(userInfo.googleId)
            .get(`invoices/${month}/${year}`)
            .then((res) => setList(res.data));
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
                        {list.map((row, index) => (
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
  