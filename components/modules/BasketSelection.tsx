"use client"
import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from './SnackbarProvider';
import { Business } from '@/types';

interface BasketSelectionProps {
  business: Business;
  onSelectionComplete: () => void;
}

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function BasketSelection({ business, onSelectionComplete }: BasketSelectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/business/${business.businessCode}/products`);
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          showSnackbar('خطا در دریافت محصولات', 'error');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        showSnackbar('خطا در ارتباط با سرور', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [business.businessCode, showSnackbar]);

  const handleAddProduct = (product: Product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(selectedProducts.filter(product => product.id !== productId));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/business/${business.businessCode}/basket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ products: selectedProducts }),
      });

      if (response.ok) {
        showSnackbar('سبد خرید با موفقیت ثبت شد', 'success');
        onSelectionComplete();
      } else {
        showSnackbar('خطا در ثبت سبد خرید', 'error');
      }
    } catch (error) {
      console.error('Error submitting basket:', error);
      showSnackbar('خطا در ارتباط با سرور', 'error');
    }
  };

  if (loading) {
    return <Typography>در حال بارگذاری محصولات...</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        انتخاب محصولات
      </Typography>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            محصولات موجود
          </Typography>
          <List>
            {products.map((product) => (
              <ListItem key={product.id}>
                <ListItemText
                  primary={product.name}
                  secondary={`قیمت: ${product.price} تومان`}
                />
                <ListItemSecondaryAction>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddProduct(product)}
                  >
                    افزودن
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            محصولات انتخاب شده
          </Typography>
          <List>
            {selectedProducts.map((product) => (
              <ListItem key={product.id}>
                <ListItemText
                  primary={product.name}
                  secondary={`قیمت: ${product.price} تومان`}
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={selectedProducts.length === 0}
            sx={{ mt: 2 }}
          >
            ثبت سبد خرید
          </Button>
        </Box>
      </Box>
    </Box>
  );
} 