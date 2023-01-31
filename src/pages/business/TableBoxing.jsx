import { Box } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';

const TableBoxing = () => {
    return (

        <Box align='center'
            sx={{ width: "100%", height: 2000 }}
        >

            <Typography sx={{ mt: 5, fontWeight: 'bold' }}>
                محصولاتی که این کسب و کار به دیگران تحویل داده
            </Typography>


        </Box>
    )
}

export default TableBoxing 
