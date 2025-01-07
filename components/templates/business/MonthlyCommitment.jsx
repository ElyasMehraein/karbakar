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

export default function MonthlyCommitment({ business }) {

  const rows = business.monthlyCommitment.map((product) => {
    const isInSameMonth = product.lastDeliveredMonth === new Date().getMonth() + 1;
    return {
      productName: product.product.productName,
      unitOfMeasurement: product.product.unitOfMeasurement,
      amount: product.amount,
      previousMonthDelivered: isInSameMonth ? product.previousMonthDelivered : 0,
      lastMonthDelivered: isInSameMonth ? product.lastMonthDelivered : 0,
      lastDeliveredMonth: product.lastDeliveredMonth,
    }
  })
  const calculatePercentage = (amount, Delivered = 0) => {
    return (Delivered / amount) * 100;
  };
  const averagePreviousMonth = () => {
    let totalPercentage = 0;
    rows.forEach(product => {
      const percentage = calculatePercentage(product.amount, product.previousMonthDelivered);
      totalPercentage += percentage;
    });
    return totalPercentage / rows.length;
  };

  function getColor(previousMonthDelivered) {
    return previousMonthDelivered < 50 ? 'red' : previousMonthDelivered > 80 ? 'green' : 'Chocolate';
  }
  let captionText = () => {
    if (rows[0].lastDeliveredMonth === new Date().getMonth() + 1 && rows[0].previousMonthDelivered === undefined) {
      return <caption style={{ color: "OrangeRed" }}>لیست تعهدات در ماه جاری بروزرسانی شده است</caption>
    } else if (rows[0].lastDeliveredMonth !== new Date().getMonth() + 1) {
      return <caption style={{ color: "red" }}>از آخرین باری که این کسب و کار به دریافت کنندگان خود محصولی تحویل داده بیش از یک ماه گذشته است</caption>
    } else {
      return (
        <caption>
          <span> میزان عمل به تعهدات در ماه گذشته</span>
          <span style={{ color: getColor(averagePreviousMonth()) }}> {averagePreviousMonth()}%</span>
        </caption>
      )
    }
  }


  return (
    <Container
      sx={{ pb: 2, width: "100%", display: "flex", justifyContent: "center", alignItems: 'center' }}
    >
      {!rows.length ?
        <Typography align='center' color="error">
          این کسب و کار فاقد تعهد ارائه محصول بصورت ماهانه است
        </Typography>
        :
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="caption table">
            <caption style={{ captionSide: 'top', textAlign: 'center', fontWeight: 'bold', padding: '8px' }}>
              تعهدات ماهانه
            </caption>
            {captionText()}
            <TableHead>
              <TableRow>
                <TableCell align="right">نام محصول</TableCell>
                <TableCell align="right">مقدار</TableCell>
                <TableCell align="left">واحد</TableCell>
                <TableCell align="left">تحقق</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => {
                const deliveryPercentage = calculatePercentage(row.amount, row.lastMonthDelivered);
                return (
                  <TableRow key={row.productName}>
                    <TableCell align="right" component="th" scope="row">
                      {row.productName}
                    </TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="left">{row.unitOfMeasurement}</TableCell>
                    <TableCell align="left" style={{ color: getColor(deliveryPercentage) }}>
                      {deliveryPercentage}%
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      }
    </Container>
  );
}