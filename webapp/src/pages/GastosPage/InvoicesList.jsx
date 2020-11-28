import React, { useState, useEffect } from 'react';
import {
    Paper,
    Container,
    Grid,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, 
    TableContainer,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';
import ServiceAPI from '../../api/ServiceAPI';
import {getCurrentLoggedUserInfo} from '../../utils/LogIn'

const useStyles = makeStyles((theme) => {
  const { main } = theme.palette.primary;
  return ({
    container: {
      padding: '30px',
      margin: '15px 0',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
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
    const years = [
        `${new Date().getFullYear()}`,
        `${new Date().getFullYear()-1}`,
    ];
    const months = [
        { label: 'Enero', value: '1' },
        { label: 'Febrero', value: '2' },
        { label: 'Marzo', value: '3' },
        { label: 'Abril', value: '4' },
        { label: 'Mayo', value: '5' },
        { label: 'Junio', value: '6' },
        { label: 'Julio', value: '7' },
        { label: 'Agosto', value: '8' },
        { label: 'Septiembre', value: '9' },
        { label: 'Octubre', value: '10' },
        { label: 'Noviembre', value: '11' },
        { label: 'Diciembre', value: '12' },
    ];

    useEffect(() => {
        const setInitialDate = () => {
            const currentDate = new Date();
            const currentMonth = (currentDate.getMonth()+1).toString();
            const currentYear = currentDate.getFullYear().toString();
            setMonth(months.find(month => month.value === currentMonth).value, 
            setYear(years.find(year => year === currentYear.toString())));
        }
        setInitialDate();
    }, []);

    useEffect(() => {
        getList(month, year);
    }, [month, year])

    const getList = async (month, year) => { 
        let userInfo = await getCurrentLoggedUserInfo();
        api.createRequest().get(`invoices/${month}/${year}`, {
            headers: {
                userId: userInfo.googleId
            }
        }).then((res) => {
            console.log(res.config.url);
            setList(res.data);
        });
    }

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString).toLocaleDateString();
        return date;
    }

    return (
        <Paper className={classes.container}>
            <Container>
                <Grid align="left">
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="month-select-label">Mes</InputLabel>
                        <Select
                            labelId="month-select-label"
                            id="month-select-outlined"
                            value={month}
                            onChange={handleMonthChange}
                            label="Mes"
                        >
                        { months.map((month) => (
                            <MenuItem key={month.label} value={month.value}>{month.label}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="year-select-label">Año</InputLabel>
                        <Select
                            labelId="year-select-label"
                            id="year-select-outlined"
                            value={year}
                            onChange={handleYearChange}
                            label="Año"
                        >
                        { years.map((year) => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
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
  