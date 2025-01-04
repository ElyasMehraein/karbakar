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
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import CustomSnackbar from '@/components/modules/CustomSnackbar';
import ItsAvatar from '@/components/modules/ItsAvatar';
import LoadingButton from '@mui/lab/LoadingButton';
import { Backdrop, CircularProgress } from '@mui/material';

export default function UnionsAccordionDetails({ union, user }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // شناسه‌ی کسب‌وکار کاربر جاری در این اتحاد
  const userBusinessId = user?.businesses.find((business) =>
    union.members.some((m) => m.member._id.toString() === business._id.toString())
  )?._id;

  // پیام انصراف از اتحاد
  const [openLeaveUnion, setOpenLeaveUnion] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //
  const [leaveUnionSnackbar, setLeaveUnionSnackbar] = useState(false);

  // تابع درخواست انصراف از اتحاد
  async function handleLeaveUnion(myBusinessID, businessToRemoveID) {
    setOpenLeaveUnion(false)
    setIsLoading(true)
    const res = await fetch('api/leaveAUnion', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        unionID: union._id,
        myBusinessID,
        businessToRemoveID,
      }),
    });
    if (res.status === 200) {
      setIsLoading(false)
      setLeaveUnionSnackbar(true);
    }
  }

  const unionResignHandler = () => {
    setOpenLeaveUnion(true)
  }
  // محاسبه‌ی عرضه و تقاضای باقی‌مانده در اتحاد
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

  // نتیجه‌ی محاسبه‌ی عرضه/تقاضای باقی‌مانده
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

  // کامپوننت نمایش اطلاعات هر عضو (آواتار و نام کسب و کار)
  const MemberInfo = ({ member }) => {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 1,
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <Avatar sx={{ width: 40, height: 40 }}>
            <ItsAvatar
              isAvatar={member.member.isAvatar}
              userCodeOrBusinessBrand={member.member.businessName}
            />
          </Avatar>
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
        {userBusinessId === member.member._id && (
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={unionResignHandler}
          >
            انصراف
          </Button>
        )}
      </Box>
    );
  };

  // رندر نسخه دسکتاپ (Table)
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
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedMembers.map((member) => {
            const { sortedOfferBasket, sortedDemandBasket } = getSortedBaskets(member);
            return (
              <TableRow key={member._id}>
                <TableCell sx={{ verticalAlign: 'top' }}>
                  <MemberInfo member={member} />
                </TableCell>
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
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );

  // رندر نسخه موبایل (Card)
  const renderMobileCards = () => (
    <Box display="flex" flexDirection="column" gap={2}>
      {sortedMembers.map((member) => {
        const { sortedOfferBasket, sortedDemandBasket } = getSortedBaskets(member);
        return (
          <Paper key={member._id} sx={{ p: 1, border: '1px solid #ddd', borderRadius: 2 }}>
            <Box sx={{ mb: 1 }}>
              <MemberInfo member={member} />
            </Box>
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
          </Paper>
        );
      })}
    </Box>
  );

  return (
    <AccordionDetails sx={{ bgcolor: 'white', borderTop: `1px solid ${blue[100]}` }}>
      {isMobile ? renderMobileCards() : renderDesktopTable()}

      {/* نمایش تراز (عرضه و تقاضای باقی‌مانده) */}
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
      <Dialog
        fullScreen={fullScreen}
        open={openLeaveUnion}
        onClose={() => setOpenLeaveUnion(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          استعفا از اتحاد
        </DialogTitle>
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
      <Backdrop open={isLoading} style={{ color: '#fff', zIndex: 1300 }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CustomSnackbar
        open={leaveUnionSnackbar}
        onClose={() => location.reload()}
        message="شما با موفقیت از اتحاد خارج شدید"
      />
    </AccordionDetails>
  );
}
