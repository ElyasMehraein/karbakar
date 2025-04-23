'use client';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Business } from '@/types';

import { useSnackbar } from './SnackbarProvider';


interface ProductBasketProps {
  business: Business;
}

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ProductBasket({ business }: ProductBasketProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `/api/business/${business.businessCode}/basket`
        );
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          showSnackbar('خطا در دریافت سبد خرید', 'error');
        }
      } catch (error) {
        console.error('Error fetching basket:', error);
        showSnackbar('خطا در ارتباط با سرور', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [business.businessCode, showSnackbar]);

  const handleRemoveProduct = async (productId: number) => {
    try {
      const response = await fetch(
        `/api/business/${business.businessCode}/basket/${productId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId));
        showSnackbar('محصول با موفقیت حذف شد', 'success');
      } else {
        showSnackbar('خطا در حذف محصول', 'error');
      }
    } catch (error) {
      console.error('Error removing product:', error);
      showSnackbar('خطا در ارتباط با سرور', 'error');
    }
  };

  const calculateTotal = () => {
    return products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  if (loading) {
    return <Typography>در حال بارگذاری سبد خرید...</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        سبد خرید
      </Typography>

      {products.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          سبد خرید خالی است
        </Typography>
      ) : (
        <>
          <List>
            {products.map((product) => (
              <ListItem key={product.id}>
                <ListItemText
                  primary={product.name}
                  secondary={`قیمت: ${product.price} تومان - تعداد: ${product.quantity}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          <Box
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h6">
              مجموع: {calculateTotal()} تومان
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => showSnackbar('در حال پردازش درخواست...', 'info')}
            >
              پرداخت
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
