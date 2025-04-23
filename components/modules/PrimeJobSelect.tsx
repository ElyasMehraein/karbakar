"use client"
import React, { useState, useEffect } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { useSnackbar } from './SnackbarProvider';
import { Business } from '@/types';

interface PrimeJobSelectProps {
  business: Business;
  onJobSelect: (jobId: number) => void;
}

interface Job {
  id: number;
  title: string;
  description: string;
}

export default function PrimeJobSelect({ business, onJobSelect }: PrimeJobSelectProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<number>('');
  const [loading, setLoading] = useState(true);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`/api/business/${business.businessCode}/jobs`);
        if (response.ok) {
          const data = await response.json();
          setJobs(data);
        } else {
          showSnackbar('خطا در دریافت مشاغل', 'error');
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        showSnackbar('خطا در ارتباط با سرور', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [business.businessCode, showSnackbar]);

  const handleJobSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedJob(event.target.value as number);
  };

  const handleSubmit = () => {
    if (selectedJob) {
      onJobSelect(selectedJob);
      showSnackbar('شغل اصلی با موفقیت انتخاب شد', 'success');
    }
  };

  if (loading) {
    return <Typography>در حال بارگذاری مشاغل...</Typography>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        انتخاب شغل اصلی
      </Typography>
      <FormControl fullWidth>
        <InputLabel>شغل اصلی</InputLabel>
        <Select
          value={selectedJob}
          onChange={handleJobSelect}
          label="شغل اصلی"
        >
          {jobs.map((job) => (
            <MenuItem key={job.id} value={job.id}>
              {job.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!selectedJob}
        sx={{ mt: 2 }}
      >
        تایید انتخاب
      </Button>
    </Box>
  );
} 