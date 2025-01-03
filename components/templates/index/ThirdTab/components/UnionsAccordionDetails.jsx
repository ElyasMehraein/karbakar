import { AccordionDetails, Box, Button, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import Avatar from "@mui/material/Avatar";
import ItsAvatar from "@/components/modules/ItsAvatar";
import { useTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import {
  TableContainer,
  Paper,
  useMediaQuery,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

export default function UnionsAccordionDetails(union, user) {

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const userBusinessId = user.businesses.find(business =>
    union.members.some(member => member.member._id.toString() === business._id.toString())
  )?._id;

  const [openLeaveUnion, setOpenLeaveUnion] = useState(false);

  async function handleLeaveUnion(myBusinessID, businessToRemoveID) {
    const res = await fetch('api/leaveAUnion', {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        unionID: union._id, myBusinessID, businessToRemoveID
      })
    });
    if (res.status === 500) {
      console.log("server error");
    } else if (res.status === 409) {
      // ...
    } else if (res.status === 201) {
      console.log("joined union successfully", res);
      // ریست مقادیر
      setOfferBasket([]);
      setDemandBasket([]);
      setOpenLeaveUnion(true)
    }


  };
  // متد کمکی برای محاسبه‌ی عرضه و تقاضای باقی‌مانده
  const calculateUnionLeftovers = React.useCallback((members) => {
    const productTotals = new Map(); // ذخیره کل عرضه و تقاضا برای هر محصول

    members.forEach((member) => {
      // جمع‌زدن پیشنهادها
      member.offerBasket.forEach((offer) => {
        if (!offer?.product?._id) return;
        const productId = offer.product._id.toString();
        if (!productTotals.has(productId)) {
          productTotals.set(productId, {
            productName: offer.product.productName,
            unitOfMeasurement: offer.product.unitOfMeasurement,
            totalSupply: 0,
            totalDemand: 0,
          });
        }
        productTotals.get(productId).totalSupply += offer.amount;
      });

      // جمع‌زدن نیازها
      member.demandBasket.forEach((demand) => {
        if (!demand?.product?._id) return;
        const productId = demand.product._id.toString();
        if (!productTotals.has(productId)) {
          productTotals.set(productId, {
            productName: demand.product.productName,
            unitOfMeasurement: demand.product.unitOfMeasurement,
            totalSupply: 0,
            totalDemand: 0,
          });
        }
        productTotals.get(productId).totalDemand += demand.amount;
      });
    });

    const leftoverSupply = [];
    const leftoverDemand = [];

    for (const [, data] of productTotals.entries()) {
      const { productName, unitOfMeasurement, totalSupply, totalDemand } = data;
      const diff = totalSupply - totalDemand;

      if (diff > 0) {
        leftoverSupply.push({ productName, amount: diff, unitOfMeasurement });
      } else if (diff < 0) {
        leftoverDemand.push({
          productName,
          amount: Math.abs(diff),
          unitOfMeasurement,
        });
      }
    }

    return { leftoverSupply, leftoverDemand };
  }, []);

  // داده‌های عرضه/تقاضای نهایی
  const { leftoverSupply, leftoverDemand } = React.useMemo(() => {
    return calculateUnionLeftovers(union.members);
  }, [union.members, calculateUnionLeftovers]);

  // مرتب‌سازی اعضا براساس نام کسب‌وکار
  const sortedMembers = React.useMemo(() => {
    if (!union?.members) return [];
    return [...union.members].sort((a, b) =>
      a.member.businessName.localeCompare(b.member.businessName)
    );
  }, [union]);

  // متد کمکی برای مرتب‌سازی سبد پیشنهاد و نیاز
  const getSortedBaskets = (member) => {
    const sortedOfferBasket = [...member.offerBasket].sort((a, b) =>
      a.product.productName.localeCompare(b.product.productName)
    );
    const sortedDemandBasket = [...member.demandBasket].sort((a, b) =>
      a.product.productName.localeCompare(b.product.productName)
    );
    return { sortedOfferBasket, sortedDemandBasket };
  };

  // کامپوننت کمکی برای نمایش آواتار و اطلاعات اولیه‌ی هر عضو
  const MemberInfo = ({ member }) => {

    // const router = useRouter(); // در صورت استفاده از next/router
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Box
          onClick={() => router.push(`/${member.member.businessName}`)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            cursor: 'pointer',
            gap: 1,
          }}
        >
          <Avatar sx={{ width: 40, height: 40 }}>
            <ItsAvatar
              isAvatar={member.member.isAvatar}
              userCodeOrBusinessBrand={member.member.businessName}
            />
          </Avatar>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
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
        {userBusinessId === member.member._id &&
          <Button size="small" variant="outlined" color="error" onClick={() => handleLeaveUnion(userBusinessId, userBusinessId)}>
            انصراف
          </Button>
        }
      </Box>
    );
  };
  // رندر نسخه دسکتاپ
  const renderDesktopTable = () => {
    return (
      <TableContainer sx={{ boxShadow: 'none', bgcolor: 'transparent' }}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell
                sx={{ textAlign: 'right', fontWeight: 'bold', fontSize: '12px' }}
              >
                اعضای اتحادیه
              </TableCell>
              <TableCell
                sx={{ textAlign: 'right', fontWeight: 'bold', fontSize: '12px' }}
              >
                پیشنهادها
              </TableCell>
              <TableCell
                sx={{ textAlign: 'right', fontWeight: 'bold', fontSize: '12px' }}
              >
                نیازها
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedMembers.map((member) => {
              const { sortedOfferBasket, sortedDemandBasket } = getSortedBaskets(member);

              return (
                <TableRow
                  key={member._id}
                  sx={{
                    borderBottom: '1px solid #ddd',
                    '&:last-child td': { borderBottom: 0 },
                  }}
                >
                  {/* اعضای اتحادیه - آواتار و نام کسب و کار در سمت راست */}
                  <TableCell sx={{ verticalAlign: 'top' }}>
                    <MemberInfo member={member} />
                  </TableCell>

                  {/* پیشنهادها */}
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

                  {/* نیازها */}
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
  };

  // رندر نسخه موبایل
  const renderMobileCards = () => {
    return (
      <Box display="flex" flexDirection="column" gap={2}>
        {sortedMembers.map((member) => {
          const { sortedOfferBasket, sortedDemandBasket } = getSortedBaskets(member);

          return (
            <Paper
              key={member._id}
              sx={{ p: 1, border: '1px solid #ddd', borderRadius: 2 }}
              elevation={0}
            >
              {/* اعضای اتحادیه - آواتار و نام کسب و کار در سمت راست */}
              <Box sx={{ mb: 1 }}>
                <MemberInfo member={member} />
              </Box>

              <Divider sx={{ my: 1 }} />

              {/* پیشنهادها */}
              <Typography sx={{ fontWeight: 'bold', fontSize: 13, mb: 1 }}>
                پیشنهادها
              </Typography>
              {sortedOfferBasket.length === 0 && (
                <Typography variant="caption" sx={{ fontSize: 12 }}>
                  ---
                </Typography>
              )}
              {sortedOfferBasket.map((offer) => (
                <Typography
                  key={offer.product._id}
                  variant="body2"
                  sx={{ fontSize: 12 }}
                >
                  {offer.product.productName} - {offer.amount}{' '}
                  {offer.product.unitOfMeasurement}
                </Typography>
              ))}

              <Divider sx={{ my: 1 }} />

              {/* نیازها */}
              <Typography sx={{ fontWeight: 'bold', fontSize: 13, mb: 1 }}>
                نیازها
              </Typography>
              {sortedDemandBasket.length === 0 && (
                <Typography variant="caption" sx={{ fontSize: 12 }}>
                  ---
                </Typography>
              )}
              {sortedDemandBasket.map((demand) => (
                <Typography
                  key={demand.product._id}
                  variant="body2"
                  sx={{ fontSize: 12 }}
                >
                  {demand.product.productName} - {demand.amount}{' '}
                  {demand.product.unitOfMeasurement}
                </Typography>
              ))}
            </Paper>
          );
        })}
      </Box>
    );
  };
  return (
    <AccordionDetails
      sx={{
        bgcolor: 'white',
        borderTop: `1px solid ${blue[100]}`,
      }}
    >
      {isMobile ? renderMobileCards() : renderDesktopTable()}

      {/* <Divider sx={{ my: 2 }} /> */}

      {/* نمایش تراز (عرضه و تقاضای باقی‌مانده) */}
      <Box sx={{ flex: 1, minWidth: 150 }}>
        <Typography
          sx={{ textAlign: 'right', fontWeight: 'bold', fontSize: '14px' }}
        >
          تراز
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', sm: 'row' },
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
      <CustomSnackbar
        open={openLeaveUnion}
        onClose={() => location.reload()}
        message="شما با موفقیت از اتحاد خارج شدید"
      />
    </AccordionDetails>
  )
}
