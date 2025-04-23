'use client';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Business } from '@/types';

import { useSnackbar } from './SnackbarProvider';


interface SelectCategoryAndGuildProps {
  business: Business;
  onSelectionComplete: () => void;
}

interface Category {
  id: number;
  name: string;
}

interface Guild {
  id: number;
  name: string;
  categoryId: number;
}

export default function SelectCategoryAndGuild({
  business,
  onSelectionComplete,
}: SelectCategoryAndGuildProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>('');
  const [selectedGuild, setSelectedGuild] = useState<number>('');
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          showSnackbar('خطا در دریافت دسته‌بندی‌ها', 'error');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        showSnackbar('خطا در ارتباط با سرور', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [showSnackbar]);

  useEffect(() => {
    const fetchGuilds = async () => {
      if (!selectedCategory) {
        setGuilds([]);
        return;
      }

      try {
        const response = await fetch(
          `/api/categories/${selectedCategory}/guilds`
        );
        if (response.ok) {
          const data = await response.json();
          setGuilds(data);
        } else {
          showSnackbar('خطا در دریافت صنف‌ها', 'error');
        }
      } catch (error) {
        console.error('Error fetching guilds:', error);
        showSnackbar('خطا در ارتباط با سرور', 'error');
      }
    };

    fetchGuilds();
  }, [selectedCategory, showSnackbar]);

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedCategory(event.target.value as number);
    setSelectedGuild('');
  };

  const handleGuildChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedGuild(event.target.value as number);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `/api/business/${business.businessCode}/category-guild`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            categoryId: selectedCategory,
            guildId: selectedGuild,
          }),
        }
      );

      if (response.ok) {
        showSnackbar('دسته‌بندی و صنف با موفقیت ثبت شد', 'success');
        onSelectionComplete();
      } else {
        showSnackbar('خطا در ثبت دسته‌بندی و صنف', 'error');
      }
    } catch (error) {
      console.error('Error submitting category and guild:', error);
      showSnackbar('خطا در ارتباط با سرور', 'error');
    }
  };

  if (loading) {
    return <Typography>در حال بارگذاری...</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        انتخاب دسته‌بندی و صنف
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>دسته‌بندی</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="دسته‌بندی"
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>صنف</InputLabel>
          <Select
            value={selectedGuild}
            onChange={handleGuildChange}
            label="صنف"
            disabled={!selectedCategory}
          >
            {guilds.map((guild) => (
              <MenuItem key={guild.id} value={guild.id}>
                {guild.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!selectedCategory || !selectedGuild}
      >
        ثبت انتخاب
      </Button>
    </Box>
  );
}
