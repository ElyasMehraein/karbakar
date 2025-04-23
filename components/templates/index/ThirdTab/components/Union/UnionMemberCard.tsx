import { Box, Typography } from '@mui/material';
import React from 'react';

import ItsAvatar from '@/components/modules/ItsAvatar';

import { Member } from './types';


interface UnionMemberCardProps {
  member: Member;
}

export const UnionMemberCard: React.FC<UnionMemberCardProps> = ({ member }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <ItsAvatar
        isAvatar={member.isAvatar}
        userCodeOrBusinessBrand={member.businessName}
      />
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="body2">{member.businessBrand}</Typography>
        <Typography variant="caption" display="block">
          {member.businessName}
        </Typography>
        <Typography variant="caption" display="block">
          {member.guild.guildName}
        </Typography>
      </Box>
    </Box>
  );
};
