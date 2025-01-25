import React from 'react';
import { Avatar, Box, Chip, Stack, useMediaQuery } from '@mui/material';
import ItsAvatar from '@/components/modules/ItsAvatar';
import {
    Container,
    IconButton,
    Slide,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function UnionVotePage({ union, votePageOpen, dialogCloseHandler }) {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg')); // صفحه بزرگ

    return (
        <Dialog
            open={votePageOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={dialogCloseHandler}
            sx={{
                '& .MuiDialog-paper': {
                    minWidth: isLargeScreen ? '1000px' : '90%',
                    maxWidth: '1200px',
                }
            }}
        >
            <DialogTitle>آخرین وضعیت رای ها</DialogTitle>
            <IconButton
                aria-label="close"
                onClick={dialogCloseHandler}
                sx={{ position: 'absolute', left: 8, top: 8, color: 'gray' }}
            >
                <CloseIcon />
            </IconButton>

            <DialogContent>
                <Container maxWidth="md" align="center">
                    {union.members.map((member) => {
                        return (
                            <Box
                                key={member.member._id}
                                sx={{
                                    my: 2,
                                    p: 2,
                                    border: '1px solid #ccc',
                                    borderRadius: 2
                                }}
                            >
                                {/* اطلاعات کلی عضو (آواتار + نام‌ها) */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <ItsAvatar
                                        isAvatar={member.member.isAvatar}
                                        userCodeOrBusinessBrand={member.member.businessName}
                                    />
                                    <Box sx={{ textAlign: 'right' }}>
                                        <Typography variant="body2">
                                            {member.member.businessBrand}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                            {member.member.businessName}
                                        </Typography>
                                        <Typography variant="caption" display="block">
                                            {member.member.guild.guildName}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* لیست سایر اعضا در قالب چیپ */}
                                <Box sx={{ mt: 1 }}>
                                    <Typography variant="caption">سایر اعضا:</Typography>
                                    <Stack
                                        sx={{
                                            mt: 1,
                                            flexWrap: 'wrap',    // اجازه می‌دهد چیپ‌ها به خط بعد بروند
                                            gap: 1
                                        }}
                                        direction="row"
                                    >
                                        {union.members
                                            .filter((other) => other.member._id !== member.member._id)
                                            .map((other) => {
                                                const hasVoted = union.votes.some(
                                                    (v) =>
                                                        v.voter.toString() === member.member._id.toString() &&
                                                        v.voteFor.toString() === other.member._id.toString()
                                                );
                                                return (
                                                    <Chip
                                                        variant="outlined"
                                                        key={other.member._id}
                                                        label={other.member.businessName}
                                                        color={hasVoted ? 'success' : 'warning'}
                                                        sx={{
                                                            maxWidth: 'fit-content',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                    />
                                                );
                                            })}
                                    </Stack>
                                </Box>
                            </Box>
                        );
                    })}
                </Container>
            </DialogContent>
        </Dialog>
    );
}
