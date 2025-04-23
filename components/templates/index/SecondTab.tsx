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

interface BusinessRelation {
  _id: string;
  provider: {
    _id: string;
    monthlyCommitment: {
      product: {
        productName: string;
        unitOfMeasurement: string;
      };
    };
  };
  receiver: string;
  isAnswerNeed: boolean;
}

interface SecondTabProps {
  user: User | null;
  relations: BusinessRelation[];
  guestRelations: BusinessRelation[];
}

export default function SecondTab({ user, relations, guestRelations }: SecondTabProps) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        تب دوم
      </Typography>
      {/* محتوای تب دوم */}
    </Box>
  );
} 