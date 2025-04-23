"use client"
import React, { useState, useEffect } from 'react';
import { Box, Autocomplete, TextField, Typography } from '@mui/material';
import { useSnackbar } from './SnackbarProvider';
import { Business } from '@/types';

interface ModulesAutocompleteProps {
  business: Business;
  onModuleSelect: (moduleId: number) => void;
}

interface Module {
  id: number;
  name: string;
  description: string;
}

export default function ModulesAutocomplete({ business, onModuleSelect }: ModulesAutocompleteProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch(`/api/business/${business.businessCode}/modules`);
        if (response.ok) {
          const data = await response.json();
          setModules(data);
        } else {
          showSnackbar('خطا در دریافت ماژول‌ها', 'error');
        }
      } catch (error) {
        console.error('Error fetching modules:', error);
        showSnackbar('خطا در ارتباط با سرور', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchModules();
  }, [business.businessCode, showSnackbar]);

  const handleModuleSelect = (event: React.SyntheticEvent, value: Module | null) => {
    if (value) {
      onModuleSelect(value.id);
    }
  };

  if (loading) {
    return <Typography>در حال بارگذاری ماژول‌ها...</Typography>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        انتخاب ماژول
      </Typography>
      <Autocomplete
        options={modules}
        getOptionLabel={(option) => option.name}
        onChange={handleModuleSelect}
        renderInput={(params) => (
          <TextField
            {...params}
            label="ماژول"
            placeholder="ماژول مورد نظر را انتخاب کنید"
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            <Box>
              <Typography>{option.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {option.description}
              </Typography>
            </Box>
          </li>
        )}
      />
    </Box>
  );
} 