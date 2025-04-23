"use client"
import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useSnackbar } from './SnackbarProvider';
import { Business } from '@/types';

interface SelectOrCreateCategoryAndGuildProps {
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

export default function SelectOrCreateCategoryAndGuild({ business, onSelectionComplete }: SelectOrCreateCategoryAndGuildProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>('');
  const [selectedGuild, setSelectedGuild] = useState<number>('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newGuildName, setNewGuildName] = useState('');
  const [createCategoryDialogOpen, setCreateCategoryDialogOpen] = useState(false);
  const [createGuildDialogOpen, setCreateGuildDialogOpen] = useState(false);
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
        const response = await fetch(`/api/categories/${selectedCategory}/guilds`);
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

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as number);
    setSelectedGuild('');
  };

  const handleGuildChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedGuild(event.target.value as number);
  };

  const handleCreateCategory = async () => {
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories([...categories, newCategory]);
        setSelectedCategory(newCategory.id);
        setCreateCategoryDialogOpen(false);
        setNewCategoryName('');
        showSnackbar('دسته‌بندی با موفقیت ایجاد شد', 'success');
      } else {
        showSnackbar('خطا در ایجاد دسته‌بندی', 'error');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      showSnackbar('خطا در ارتباط با سرور', 'error');
    }
  };

  const handleCreateGuild = async () => {
    try {
      const response = await fetch(`/api/categories/${selectedCategory}/guilds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newGuildName }),
      });

      if (response.ok) {
        const newGuild = await response.json();
        setGuilds([...guilds, newGuild]);
        setSelectedGuild(newGuild.id);
        setCreateGuildDialogOpen(false);
        setNewGuildName('');
        showSnackbar('صنف با موفقیت ایجاد شد', 'success');
      } else {
        showSnackbar('خطا در ایجاد صنف', 'error');
      }
    } catch (error) {
      console.error('Error creating guild:', error);
      showSnackbar('خطا در ارتباط با سرور', 'error');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/business/${business.businessCode}/category-guild`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId: selectedCategory,
          guildId: selectedGuild,
        }),
      });

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
        انتخاب یا ایجاد دسته‌بندی و صنف
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

        <Button
          variant="outlined"
          onClick={() => setCreateCategoryDialogOpen(true)}
        >
          ایجاد دسته‌بندی جدید
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
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

        <Button
          variant="outlined"
          onClick={() => setCreateGuildDialogOpen(true)}
          disabled={!selectedCategory}
        >
          ایجاد صنف جدید
        </Button>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!selectedCategory || !selectedGuild}
      >
        ثبت انتخاب
      </Button>

      <Dialog open={createCategoryDialogOpen} onClose={() => setCreateCategoryDialogOpen(false)}>
        <DialogTitle>ایجاد دسته‌بندی جدید</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="نام دسته‌بندی"
            type="text"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateCategoryDialogOpen(false)}>انصراف</Button>
          <Button onClick={handleCreateCategory} color="primary" disabled={!newCategoryName.trim()}>
            ایجاد
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={createGuildDialogOpen} onClose={() => setCreateGuildDialogOpen(false)}>
        <DialogTitle>ایجاد صنف جدید</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="نام صنف"
            type="text"
            fullWidth
            value={newGuildName}
            onChange={(e) => setNewGuildName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateGuildDialogOpen(false)}>انصراف</Button>
          <Button onClick={handleCreateGuild} color="primary" disabled={!newGuildName.trim()}>
            ایجاد
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 