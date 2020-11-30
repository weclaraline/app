import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    Grid,
    makeStyles,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 180,
    },
  })
});

const InvoicesListFilters = ({onUpdateMonth, onUpdateYear}) => {  
    const classes = useStyles();
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
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
        onUpdateMonth(month);
    }, [month])

    useEffect(() => {
        onUpdateYear(year);
    }, [year])

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    return (
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
               
    );
  };
  
  InvoicesListFilters.propTypes = {
    onUpdateMonth: PropTypes.func.isRequired,
    onUpdateYear: PropTypes.func.isRequired
  }

  export default InvoicesListFilters;
  