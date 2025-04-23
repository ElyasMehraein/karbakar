import { Box, Chip, Stack, Typography } from '@mui/material';
import React from 'react';

import { Member, Vote } from './types';

interface UnionMemberVotesProps {
  currentMember: Member;
  otherMembers: Member[];
  votes: Vote[];
}

export const UnionMemberVotes: React.FC<UnionMemberVotesProps> = ({
  currentMember,
  otherMembers,
  votes,
}) => {
  return (
    <Box sx={{ mt: 1 }}>
      <Typography variant="caption">سایر اعضا:</Typography>
      <Stack
        sx={{
          mt: 1,
          flexWrap: 'wrap',
          gap: 1,
        }}
        direction="row"
      >
        {otherMembers.map((other) => {
          const hasVoted = votes.some(
            (v) =>
              v.voter.toString() === currentMember._id.toString() &&
              v.voteFor.toString() === other._id.toString()
          );
          return (
            <Chip
              variant="outlined"
              key={other._id}
              label={other.businessName}
              color={hasVoted ? 'success' : 'warning'}
              sx={{
                maxWidth: 'fit-content',
                whiteSpace: 'nowrap',
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};
