'use client';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';

import { Business } from '@/types';

interface TableBusinessProps {
  business: Business;
}

export default function TableBusiness({ business }: TableBusinessProps) {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h6">اطلاعات کسب و کار</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h6">مقدار</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>نام کسب و کار</TableCell>
            <TableCell>{business.businessName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>شماره تماس</TableCell>
            <TableCell>{business.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>ایمیل</TableCell>
            <TableCell>{business.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>آدرس</TableCell>
            <TableCell>{business.address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>کد کسب و کار</TableCell>
            <TableCell>{business.businessCode}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
