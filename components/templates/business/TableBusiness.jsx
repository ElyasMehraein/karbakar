"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { grey, blue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TablePagination from '@mui/material/TablePagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const columns = [
  {
    id: 'size',
    label: 'مقدار',
    minWidth: 17,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'population',
    label: 'واحد اندازه گیری',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'code', label: 'محصول', minWidth: 120 },
  { id: 'name', label: 'مشتری غیرتکراری', minWidth: 100 },

];
export default function TableBusiness({ business }) {

  const rows = business.deliveredProducts.map(product => {
    return { name: product.uniqueCustomer, code: product.productName, population: product.unitOfMeasurement, size: product.totalDelivered }
  });


  // function createData(name, calories, fat, carbs, protein) {
  //   return { name, calories, fat, carbs, protein };
  // }
  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];
  const [alignment, setAlignment] = React.useState('one');



  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const ToggleButtonSx = {
    mb: 1, backgroundColor: grey[50],
    "&.MuiToggleButtonGroup-grouped": {
      borderRadius: "4px !important",
      mx: .1,
      border: "2px solid lightgrey !important"
    }
  }

  return (
    !rows[0] ?
      <Typography align='center' color="error">این کسب و کار تا بحال هیچ محصولی به کسی تحویل نداده است </Typography>
      : 
      <Box
        justifyContent='center'
        sx={{
          p: 1,
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            width: "100%",
            maxWidth: 700,
            // height: 480,
          },
        }}
      >
        <Paper
          sx={{ p: 1, backgroundColor: grey[200], borderRadius: '30px' }}>
          <Typography sx={{ variant: "subtitle2", m: 1, fontWeight: 'bold' }}>
            محصولاتی که این کسب و کار به دیگران تحویل داده
          </Typography>
          {/* <Box
          display="flex"
          justifyContent="space-around"
        >

          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton sx={ToggleButtonSx} value="one">از ابتدای تاسیس</ToggleButton>
            <ToggleButton sx={ToggleButtonSx} value="two">سال گذشته</ToggleButton>
            <ToggleButton sx={ToggleButtonSx} value="three">سال جاری</ToggleButton>
            <ToggleButton sx={ToggleButtonSx} value="four">جدیدترین</ToggleButton>
          </ToggleButtonGroup>
        </Box> */}
          <Paper sx={{ m: 1, overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 500 }}>
              <Table
                sx={{ borderCollapse: 'separate', borderSpacing: '0px 5px ' }}
                stickyHeader aria-label="sticky table">
                <TableHead
                  sx={{
                    "& th": {
                      p: 0,
                      fontSize: ".75rem",
                      textAlign: "center",
                      backgroundColor: grey[200],
                    }

                  }}
                >
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: 80 }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (

                        <TableRow sx={{ backgroundColor: blue[100] }}
                          hover role="checkbox" tabIndex={-1} key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                sx={{ p: 1, textAlign: "center" }}

                                key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Paper>
      </Box>
  );
}


