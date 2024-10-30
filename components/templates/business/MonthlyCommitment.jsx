"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container, Typography } from '@mui/material';

function createData(productName, unitOfMeasurement, amount,) {
  return { productName, unitOfMeasurement, amount, };
}

export default function MonthlyCommitment({ business }) {

  const rows = business.monthlyCommitment.map((product) => {
    return createData(product.productName, product.unitOfMeasurement, product.amount)
  })

  return (
    <Container
      sx={{ pb: 2, width: "100%", display: "flex", justifyContent: "center", alignItems: 'center' }}
    >
      {!rows[0] ?
        <Typography align='center' color="error">این کسب و کار فاقد تعهد ارائه محصول بصورت ماهانه است </Typography>
        :
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="caption table">
            <caption style={{ captionSide: 'top', textAlign: 'center', fontWeight: 'bold', padding: '8px' }}>
              تعهدات ماهانه
            </caption>
            <TableHead>
              <TableRow>
                <TableCell align="right">نام محصول</TableCell>
                <TableCell align="right">واحد</TableCell>
                <TableCell align="left">مقدار</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.productName}>
                  <TableCell align="right" component="th" scope="row">
                    {row.productName}
                  </TableCell>
                  <TableCell align="right">{row.unitOfMeasurement}</TableCell>
                  <TableCell align="left">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Container>
  );
}