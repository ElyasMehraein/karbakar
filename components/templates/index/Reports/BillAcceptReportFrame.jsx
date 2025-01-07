import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import Groups2Icon from '@mui/icons-material/Groups2';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';

export default function BillAcceptReportFrame({ report }) {

  return (
    <Box >
      <Card sx={{ my: 1, bgcolor: "#e3f2fd" }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="body2">
            گزارش تایید فاکتور
          </Typography>
        </CardContent>
        {report.products.map(product => {
          return (
            <Box key={product._id} >
              <Box sx={{ p: 1, m: 1, width: '95%', bgcolor: '#e0e0e0', textAlign: "right", display: 'flex', alignItems: "center", flexDirection: 'row' }} >
                {product.product.isRetail ?
                  <Groups2Icon />
                  :
                  <BusinessRoundedIcon />
                }
                <ListItemText sx={{ m: 2 }} primary={product.product.productName} secondary={`${product.amount} - ${product.product.unitOfMeasurement}`} />
              </Box>
            </Box>
          )
        })
        }
        <CardContent >
          <Typography style={{ whiteSpace: 'pre-wrap' }}>
            دریافت این محصولات توسط دریافت کننده تایید شد
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
