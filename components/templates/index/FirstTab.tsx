"use client";

import React from "react";
import { Box, Typography } from "@mui/material";

interface User {
  _id: string;
  businesses: Array<{
    _id: string;
    monthlyCommitment: {
      product: {
        _id: string;
        name: string;
      };
    };
  }>;
  primeJob?: string;
}

interface Business {
  _id: string;
  businessName: string;
  demandsForGuilds: Array<{
    guild: {
      _id: string;
      guildName: string;
    };
  }>;
  guild: {
    _id: string;
    guildName: string;
  };
}

interface Bill {
  _id: string;
  to: string;
  from: string;
  products: Array<{
    product: {
      _id: string;
      name: string;
    };
  }>;
  guild: string;
  isAccept: boolean;
}

interface FirstTabProps {
  user: User | null;
  bills: Bill[];
  distinctGuilds: string[];
  primeBusiness: Business | null;
}

export default function FirstTab({ user, bills, distinctGuilds, primeBusiness }: FirstTabProps) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        تب اول
      </Typography>
      {/* محتوای تب اول */}
    </Box>
  );
} 