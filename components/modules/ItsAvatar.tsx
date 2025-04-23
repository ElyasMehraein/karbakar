'use client';
import Avatar from '@mui/material/Avatar';
import { SxProps, Theme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';

import { IMAGE_PATHS } from '@/configs/constants';

interface ItsAvatarProps {
  userCodeOrBusinessBrand: string | number;
  sx?: SxProps<Theme>;
  alt?: string;
}

export default function ItsAvatar({
  userCodeOrBusinessBrand,
  sx,
  alt = 'avatar',
}: ItsAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>(
    `${IMAGE_PATHS.AVATARS}/${userCodeOrBusinessBrand}.jpg`
  );

  useEffect(() => {
    setAvatarUrl(
      `${IMAGE_PATHS.AVATARS}/${userCodeOrBusinessBrand}.jpg?timestamp=${new Date().getTime()}`
    );
  }, [userCodeOrBusinessBrand]);

  return <Avatar src={avatarUrl} alt={alt} sx={sx} />;
}
