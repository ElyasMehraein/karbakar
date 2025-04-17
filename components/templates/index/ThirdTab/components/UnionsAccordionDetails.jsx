import React, { useState, useCallback, useMemo } from 'react';
import {
  AccordionDetails,
  Avatar,
  Box,
  Button,
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import CustomSnackbar from '@/components/modules/CustomSnackbar';
import ItsAvatar from '@/components/modules/ItsAvatar';
import { useRouter } from 'next/navigation';
// بررسی اینکه آیا کاربر جاری (voterId) به یک عضو خاص (voteForId) رأی "تأیید" داده است یا خیر
function hasUserVoted(union, voterId, voteForId) {
  if (!union?.votes) return false;
  return union.votes.some(
    (v) =>
      v.voter.toString() === voterId.toString() &&
      v.voteFor.toString() === voteForId.toString()
  );
}

export default function UnionsAccordionDetails({ union, user }) {
  const router = useRouter()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // تشخیص کسب‌وکار کاربر جاری در این اتحاد (اگر باشد)
  const userBusinessId = user?.businesses.find((business) =>
    union.members.some((m) => m.member._id.toString() === business._id.toString())
  )?._id;

  // stateها و توابع مربوط به انصراف
  const [openLeaveUnion, setOpenLeaveUnion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [leaveUnionSnackbar, setLeaveUnionSnackbar] = useState(false);

  async function handleLeaveUnion(myBusinessID, businessToRemoveID) {
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
  const [selectedVoteForId, setSelectedVoteForId] = useState(null);

  // باز کردن دیالوگ رأی با کلیک روی "رأی دهید"
  const handleOpenVoteDialog = (voteForId) => {
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
          voterId: userBusinessId,
          voteForId: selectedVoteForId,
          voteType: 'approve',
        }),
      });
      setIsLoading(false);
      if (res.ok) {
        // بسته‌شدن دیالوگ و رفرش یا آپدیت داده‌ها
        handleCloseVoteDialog();
        location.reload();
      }
    } catch (error) {
      console.error(error);
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
          voterId: userBusinessId,
          voteForId: selectedVoteForId,
          voteType: 'reject',
        }),
      });
      setIsLoading(false);
      if (res.ok) {
        handleCloseVoteDialog();
        location.reload();
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  // محاسبه تراز (عرضه و تقاضای باقی‌مانده)
  const calculateUnionLeftovers = useCallback((members) => {
    const productTotals = new Map();

    members.forEach(({ offerBasket, demandBasket }) => {
      offerBasket.forEach((offer) => {
        if (!offer?.product?._id) return;
        const id = offer.product._id.toString();
        if (!productTotals.has(id)) {
          productTotals.set(id, {
            productName: offer.product.productName,
            unitOfMeasurement: offer.product.unitOfMeasurement,
            totalSupply: 0,
            totalDemand: 0,
          });
        }
        productTotals.get(id).totalSupply += offer.amount;
      });

      demandBasket.forEach((demand) => {
        if (!demand?.product?._id) return;
        const id = demand.product._id.toString();
        if (!productTotals.has(id)) {
          productTotals.set(id, {
            productName: demand.product.productName,
            unitOfMeasurement: demand.product.unitOfMeasurement,
            totalSupply: 0,
            totalDemand: 0,
          });
        }
        productTotals.get(id).totalDemand += demand.amount;
      });
    });

    const leftoverSupply = [];
    const leftoverDemand = [];

    for (const data of productTotals.values()) {
      const diff = data.totalSupply - data.totalDemand;
      if (diff > 0) {
        leftoverSupply.push({
          productName: data.productName,
          amount: diff,
          unitOfMeasurement: data.unitOfMeasurement,
        });
      } else if (diff < 0) {
        leftoverDemand.push({
          productName: data.productName,
          amount: Math.abs(diff),
          unitOfMeasurement: data.unitOfMeasurement,
        });
      }
    }

    return { leftoverSupply, leftoverDemand };
  }, []);

  const { leftoverSupply, leftoverDemand } = useMemo(() => {
    return calculateUnionLeftovers(union.members);
  }, [union.members, calculateUnionLeftovers]);

  // مرتب‌سازی اعضا بر اساس نام کسب‌وکار
  const sortedMembers = useMemo(() => {
    if (!union?.members) return [];
    return [...union.members].sort((a, b) =>
      a.member.businessName.localeCompare(b.member.businessName)
    );
  }, [union]);

  // تابع کمکی برای مرتب‌سازی سبد پیشنهاد و نیاز
  const getSortedBaskets = (member) => {
    const sortedOfferBasket = [...member.offerBasket].sort((a, b) =>
      a.product.productName.localeCompare(b.product.productName)
    );
    const sortedDemandBasket = [...member.demandBasket].sort((a, b) =>
      a.product.productName.localeCompare(b.product.productName)
    );
    return { sortedOfferBasket, sortedDemandBasket };
  };

  // رندر اطلاعات کسب و کار (بدون دکمه انصراف یا رأی)
  const MemberInfo = ({ member }) => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          alignItems: 'center',
          cursor: 'pointer'
        }}
        onClick={() => router.push(`/${member.member.businessName}`)}
      >
        <ItsAvatar
          userCodeOrBusinessBrand={member.member.businessName}
        />
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2">{member.member.businessBrand}</Typography>
          <Typography variant="caption" display="block">
            {member.member.businessName}
          </Typography>
          <Typography variant="caption" display="block">
            {member.member.guild.guildName}
          </Typography>
        </Box>
      </Box>
    );
  };

  // تابع رندر ستون چهارم جدول (منطق رأی‌دهی و انصراف)
  const renderVoteColumn = (member) => {
    // اگر کاربر لاگین کرده اصلاً عضوی از این اتحاد نباشد => ستون خالی
    if (!userBusinessId || union.isActive) {
      return null;
    }

    // اگر این ردیف، ردیف کسب و کار خود کاربر باشد => دکمه انصراف
    if (userBusinessId === member.member._id.toString()) {
      return (
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={unionResignHandler}
        >
          انصراف
        </Button>
      );
    }

    // در غیر این صورت => ستون رأی
    const userHasVoted = hasUserVoted(union, userBusinessId, member.member._id);
    if (userHasVoted) {
      return (
        <Button size="small" variant="contained" disabled>
          تأیید شده
        </Button>
      );
    }
    // هنوز رأی نداده => دکمه "رای دهید" که دیالوگ را باز می‌کند
    return (
      <Button size="small" variant="contained" onClick={() => handleOpenVoteDialog(member.member._id)}>
        رأی دهید
      </Button>
    );
  };

  //
  // رندر جدول در دسکتاپ
  //
  const renderDesktopTable = () => (
    <TableContainer sx={{ boxShadow: 'none', bgcolor: 'transparent' }}>
      <Table size="small">
        <TableHead>
          <TableRow sx={{ bgcolor: '#f5f5f5' }}>
            <TableCell sx={{ textAlign: 'right', fontWeight: 'bold', fontSize: '12px' }}>
              اعضای اتحادیه
            </TableCell>
            <TableCell sx={{ textAlign: 'right', fontWeight: 'bold', fontSize: '12px' }}>
              پیشنهادها
            </TableCell>
            <TableCell sx={{ textAlign: 'right', fontWeight: 'bold', fontSize: '12px' }}>
              نیازها
            </TableCell>
            {!union.isActive && (
              <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '12px' }}>
                رأی
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedMembers.map((member) => {
            const { sortedOfferBasket, sortedDemandBasket } = getSortedBaskets(member);
            return (
              <TableRow key={member._id}>
                {/* ستون اعضا */}
                <TableCell sx={{ verticalAlign: 'top' }}>
                  <MemberInfo member={member} />
                </TableCell>

                {/* ستون پیشنهادها */}
                <TableCell sx={{ verticalAlign: 'top' }}>
                  {sortedOfferBasket.map((offer) => (
                    <Typography
                      key={offer.product._id}
                      variant="body2"
                      sx={{ textAlign: 'right', fontSize: 12 }}
                    >
                      {offer.product.productName} - {offer.amount}{' '}
                      {offer.product.unitOfMeasurement}
                    </Typography>
                  ))}
                </TableCell>

                {/* ستون نیازها */}
                <TableCell sx={{ verticalAlign: 'top' }}>
                  {sortedDemandBasket.map((demand) => (
                    <Typography
                      key={demand.product._id}
                      variant="body2"
                      sx={{ textAlign: 'right', fontSize: 12 }}
                    >
                      {demand.product.productName} - {demand.amount}{' '}
                      {demand.product.unitOfMeasurement}
                    </Typography>
                  ))}
                </TableCell>

                {/* ستون رأی */}
                {!union.isActive && (
                  <TableCell sx={{ verticalAlign: 'top', textAlign: 'center' }}>
                    {renderVoteColumn(member)}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );

  //
  // رندر کارت‌ها در موبایل
  //
  const renderMobileCards = () => (
    <Box display="flex" flexDirection="column" gap={2}>
      {sortedMembers.map((member) => {
        const { sortedOfferBasket, sortedDemandBasket } = getSortedBaskets(member);
        return (
          <Paper key={member._id} sx={{ p: 1, border: '1px solid #ddd', borderRadius: 2 }}>
            {/* بخش اطلاعات عضو */}
            <Box sx={{ mb: 1 }}>
              <MemberInfo member={member} />
            </Box>

            {/* پیشنهادها */}
            <Divider sx={{ my: 1 }} />
            <Typography sx={{ fontWeight: 'bold', fontSize: 13, mb: 1 }}>
              پیشنهادها
            </Typography>
            {sortedOfferBasket.length === 0 ? (
              <Typography variant="caption" sx={{ fontSize: 12 }}>
                ---
              </Typography>
            ) : (
              sortedOfferBasket.map((offer) => (
                <Typography key={offer.product._id} variant="body2" sx={{ fontSize: 12 }}>
                  {offer.product.productName} - {offer.amount}{' '}
                  {offer.product.unitOfMeasurement}
                </Typography>
              ))
            )}

            {/* نیازها */}
            <Divider sx={{ my: 1 }} />
            <Typography sx={{ fontWeight: 'bold', fontSize: 13, mb: 1 }}>
              نیازها
            </Typography>
            {sortedDemandBasket.length === 0 ? (
              <Typography variant="caption" sx={{ fontSize: 12 }}>
                ---
              </Typography>
            ) : (
              sortedDemandBasket.map((demand) => (
                <Typography key={demand.product._id} variant="body2" sx={{ fontSize: 12 }}>
                  {demand.product.productName} - {demand.amount}{' '}
                  {demand.product.unitOfMeasurement}
                </Typography>
              ))
            )}

            {/* ستون رأی در حالت موبایل */}
            {!union.isActive && (
              <>
                <Divider sx={{ my: 1 }} />
                <Typography sx={{ fontWeight: 'bold', fontSize: 13, mb: 1 }}>
                  رأی
                </Typography>
                {renderVoteColumn(member)}
              </>
            )}
          </Paper>
        );
      })}
    </Box>
  );

  return (
    <AccordionDetails sx={{ bgcolor: 'white', borderTop: `1px solid ${blue[100]}` }}>
      {/* اگر سایز موبایل است، کارت؛ در غیر این صورت، جدول */}
      {isMobile ? renderMobileCards() : renderDesktopTable()}

      {/* نمایش تراز (عرضه و تقاضای باقی‌مانده) */}
      {!union.isActive &&
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ textAlign: 'right', fontWeight: 'bold', fontSize: '14px' }}>
            تراز
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              flexDirection: { xs: 'column', sm: 'row' },
              mt: 1,
            }}
          >
            <Box sx={{ flex: 1, minWidth: 150 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '12px', mb: 1 }}>
                پیشنهادهای باقی‌مانده
              </Typography>
              {leftoverSupply.length === 0 ? (
                <Typography>---</Typography>
              ) : (
                leftoverSupply.map((item) => (
                  <Typography key={item.productName} sx={{ fontSize: '12px' }}>
                    {item.productName} - {item.amount} {item.unitOfMeasurement}
                  </Typography>
                ))
              )}
            </Box>
            <Box sx={{ flex: 1, minWidth: 150 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '12px', mb: 1 }}>
                نیازهای باقی‌مانده
              </Typography>
              {leftoverDemand.length === 0 ? (
                <Typography>---</Typography>
              ) : (
                leftoverDemand.map((item) => (
                  <Typography key={item.productName} sx={{ fontSize: '12px' }}>
                    {item.productName} - {item.amount} {item.unitOfMeasurement}
                  </Typography>
                ))
              )}
            </Box>
          </Box>
        </Box>
      }
      {/* دیالوگ انصراف از اتحاد */}
      <Dialog
        fullScreen={fullScreen}
        open={openLeaveUnion}
        onClose={() => setOpenLeaveUnion(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">استعفا از اتحاد</DialogTitle>
        <DialogContent>
          <DialogContentText>
            آیا درباره خروج از این اتحاد اطمینان دارید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpenLeaveUnion(false)}>
            خیر
          </Button>
          <Button onClick={() => handleLeaveUnion(userBusinessId, userBusinessId)} autoFocus>
            بله
          </Button>
        </DialogActions>
      </Dialog>

      {/* دیالوگ رأی دادن */}
      <Dialog open={openVoteDialog} onClose={handleCloseVoteDialog}>
        <DialogTitle>رأی‌گیری</DialogTitle>
        <DialogContent>
          <DialogContentText>
            آیا با عضویت این کسب‌وکار در اتحاد موافق هستید یا مخالف؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseVoteDialog}>انصراف</Button>
          <Button onClick={handleReject} color="warning">
            مخالفت
          </Button>
          <Button onClick={handleApprove} color="success" autoFocus>
            موافقت
          </Button>
        </DialogActions>
      </Dialog>

      {/* بک‌دراپ بارگذاری */}
      <Backdrop open={isLoading} style={{ color: '#fff', zIndex: 1300 }}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* اسنک‌بار پس از خروج از اتحاد */}
      <CustomSnackbar
        open={leaveUnionSnackbar}
        onClose={() => location.reload()}
        message="شما با موفقیت از اتحاد خارج شدید"
      />
    </AccordionDetails>
  );
}
