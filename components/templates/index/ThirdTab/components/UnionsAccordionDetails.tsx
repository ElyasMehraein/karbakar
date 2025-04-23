import {
  AccordionDetails,
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo, useState } from 'react';

import CustomSnackbar from '@/components/modules/CustomSnackbar';
import ItsAvatar from '@/components/modules/ItsAvatar';

interface Vote {
  voter: string;
  voteFor: string;
  voteType: 'approve' | 'reject';
}

interface Member {
  _id: string;
  name: string;
  avatar?: string;
}

interface UnionMember {
  member: Member;
  baskets?: any[];
}

interface Union {
  _id: string;
  members: UnionMember[];
  votes?: Vote[];
}

interface Business {
  _id: string;
  businessName: string;
}

interface User {
  _id: string;
  businesses: Business[];
}

interface UnionsAccordionDetailsProps {
  union: Union;
  user: User;
}

// بررسی اینکه آیا کاربر جاری (voterId) به یک عضو خاص (voteForId) رأی "تأیید" داده است یا خیر
function hasUserVoted(
  union: Union,
  voterId: string,
  voteForId: string
): boolean {
  if (!union?.votes) return false;
  return union.votes.some(
    (v) =>
      v.voter.toString() === voterId.toString() &&
      v.voteFor.toString() === voteForId.toString()
  );
}

export default function UnionsAccordionDetails({
  union,
  user,
}: UnionsAccordionDetailsProps) {
  const router = useRouter();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // تشخیص کسب‌وکار کاربر جاری در این اتحاد (اگر باشد)
  const userBusinessId = user?.businesses.find((business) =>
    union.members.some(
      (m) => m.member._id.toString() === business._id.toString()
    )
  )?._id;

  // stateها و توابع مربوط به انصراف
  const [openLeaveUnion, setOpenLeaveUnion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [leaveUnionSnackbar, setLeaveUnionSnackbar] = useState(false);

  async function handleLeaveUnion(
    myBusinessID: string,
    businessToRemoveID: string
  ) {
    setOpenLeaveUnion(false);
    setIsLoading(true);
    const res = await fetch('/api/leaveAUnion', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        unionID: union._id,
        myBusinessID,
        businessToRemoveID,
      }),
    });
    setIsLoading(false);
    if (res.status === 200) {
      setLeaveUnionSnackbar(true);
    }
  }

  const unionResignHandler = () => {
    setOpenLeaveUnion(true);
  };

  // stateها و توابع مربوط به رأی‌دادن
  const [openVoteDialog, setOpenVoteDialog] = useState(false);
  const [selectedVoteForId, setSelectedVoteForId] = useState<string | null>(
    null
  );

  // باز کردن دیالوگ رأی با کلیک روی "رأی دهید"
  const handleOpenVoteDialog = (voteForId: string) => {
    setSelectedVoteForId(voteForId);
    setOpenVoteDialog(true);
  };

  const handleCloseVoteDialog = () => {
    setOpenVoteDialog(false);
    setSelectedVoteForId(null);
  };

  // رأی "تأیید" (approve)
  async function handleApprove() {
    if (!selectedVoteForId) return;
    try {
      setIsLoading(true);
      const res = await fetch('/api/union/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unionId: union._id,
          voteFor: selectedVoteForId,
          voteType: 'approve',
        }),
      });
      if (res.ok) {
        handleCloseVoteDialog();
        router.refresh();
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsLoading(false);
    }
  }

  // رأی "رد" (reject)
  async function handleReject() {
    if (!selectedVoteForId) return;
    try {
      setIsLoading(true);
      const res = await fetch('/api/union/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unionId: union._id,
          voteFor: selectedVoteForId,
          voteType: 'reject',
        }),
      });
      if (res.ok) {
        handleCloseVoteDialog();
        router.refresh();
      }
    } catch (error) {
      console.error('Error voting:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const getSortedBaskets = (member: UnionMember) => {
    if (!member.baskets) return [];
    return [...member.baskets].sort((a, b) => b.createdAt - a.createdAt);
  };

  const MemberInfo = ({ member }: { member: UnionMember }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <ItsAvatar
        userCodeOrBusinessBrand={member.member.avatar || member.member.name}
        alt={member.member.name}
        sx={{ width: 24, height: 24 }}
      />
      <Typography variant="body2">{member.member.name}</Typography>
    </Box>
  );

  const renderVoteColumn = (member: UnionMember) => {
    if (!userBusinessId) return null;
    if (member.member._id === userBusinessId) return null;
    if (hasUserVoted(union, userBusinessId, member.member._id)) {
      return (
        <Typography variant="body2" color="success.main">
          رأی داده شده
        </Typography>
      );
    }
    return (
      <Button
        variant="outlined"
        size="small"
        onClick={() => handleOpenVoteDialog(member.member._id)}
      >
        رأی دهید
      </Button>
    );
  };

  const renderDesktopTable = () => (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>عضو</TableCell>
            <TableCell>سبدها</TableCell>
            <TableCell>رأی</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {union.members.map((member) => (
            <TableRow key={member.member._id}>
              <TableCell>
                <MemberInfo member={member} />
              </TableCell>
              <TableCell>
                {getSortedBaskets(member).map((basket) => (
                  <Typography key={basket._id} variant="body2">
                    {basket.name}
                  </Typography>
                ))}
              </TableCell>
              <TableCell>{renderVoteColumn(member)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderMobileCards = () => (
    <Box sx={{ mt: 2 }}>
      {union.members.map((member) => (
        <Paper key={member.member._id} sx={{ p: 2, mb: 2 }}>
          <MemberInfo member={member} />
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle2" gutterBottom>
            سبدها:
          </Typography>
          {getSortedBaskets(member).map((basket) => (
            <Typography key={basket._id} variant="body2">
              {basket.name}
            </Typography>
          ))}
          <Box sx={{ mt: 2 }}>{renderVoteColumn(member)}</Box>
        </Paper>
      ))}
    </Box>
  );

  return (
    <AccordionDetails>
      {isMobile ? renderMobileCards() : renderDesktopTable()}

      <Dialog
        open={openVoteDialog}
        onClose={handleCloseVoteDialog}
        fullScreen={fullScreen}
      >
        <DialogTitle>رأی‌دهی</DialogTitle>
        <DialogContent>
          <DialogContentText>
            آیا می‌خواهید به این عضو رأی تأیید یا رد بدهید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseVoteDialog}>انصراف</Button>
          <Button onClick={handleReject} color="error">
            رد
          </Button>
          <Button onClick={handleApprove} color="success">
            تأیید
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openLeaveUnion} onClose={() => setOpenLeaveUnion(false)}>
        <DialogTitle>انصراف از اتحاد</DialogTitle>
        <DialogContent>
          <DialogContentText>
            آیا از انصراف از این اتحاد اطمینان دارید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLeaveUnion(false)}>انصراف</Button>
          <Button
            onClick={() => handleLeaveUnion(userBusinessId!, userBusinessId!)}
            color="error"
          >
            انصراف از اتحاد
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <CustomSnackbar
        open={leaveUnionSnackbar}
        onClose={() => setLeaveUnionSnackbar(false)}
        message="با موفقیت از اتحاد خارج شدید"
        severity="success"
      />
    </AccordionDetails>
  );
}
