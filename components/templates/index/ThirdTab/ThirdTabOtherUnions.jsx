import * as React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import {
    Button,
    Container,
    Divider,
    FormControl,
    Paper,
    useMediaQuery,
} from "@mui/material";
import ItsAvatar from "@/components/modules/ItsAvatar";
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { blue } from '@mui/material/colors';
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import BasketSelection from '@/components/modules/BasketSelection';
import SelectOrCreateCategoryAndGuild from '@/components/modules/SelectOrCreateCategoryAndGuild';
import {
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// Transition برای دیالوگ
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function ThirdTabOtherUnions({ union, primeBusiness, user }) {
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    // اگر دوست دارید breakpoint دیگری مدنظرتان است، تغییر دهید

    const calculateUnionLeftovers = (members) => {
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

        for (const [productId, data] of productTotals.entries()) {
            const { productName, unitOfMeasurement, totalSupply, totalDemand } = data;
            const diff = totalSupply - totalDemand;

            if (diff > 0) {
                leftoverSupply.push({ productName, amount: diff, unitOfMeasurement });
            } else if (diff < 0) {
                leftoverDemand.push({ productName, amount: Math.abs(diff), unitOfMeasurement });
            }
        }

        return { leftoverSupply, leftoverDemand };
    };

    const { leftoverSupply, leftoverDemand } = React.useMemo(() => {
        return calculateUnionLeftovers(union.members);
    }, [union.members]);

    // States و منطق دیالوگ عضویت
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    // انتخاب کسب‌وکار کاربر
    const [selectedBusinessName, setSelectedBusinessName] = useState(primeBusiness.businessName);
    const userBusinesses = user.businesses.map((business) => business.businessName);
    const selectedBusiness = user.businesses.find((business) => {
        if (business.businessName === selectedBusinessName) {
            return business;
        }
    });

    // سبدهای عرضه و تقاضا
    const [offerBasket, setOfferBasket] = useState([]);
    const [demandBasket, setDemandBasket] = useState([]);

    const addOfferBasket = (value) => {
        setOfferBasket(value);
    };
    const addDemandBasket = (value) => {
        setDemandBasket(value);
    };

    // دسته، صنف و ...
    const [demandGuild, setDemandGuild] = useState(null);
    const [demandGuildName, setDemandGuildName] = useState(null);
    const [demandJobCategory, setDemandJobCategory] = useState(null);

    const getDataFromChild = (guild, guildName, jobCategory) => {
        setDemandGuild(guild);
        setDemandGuildName(guildName);
        setDemandJobCategory(jobCategory);
    };

    // عضویت در اتحاد
    async function joinAUnion() {
        const res = await fetch('api/joinAUnion', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                unionID: union._id,
                businessID: selectedBusiness._id,
                offerBasket,
                demandBasket,
                guildID: demandGuild?._id,
                guildName: demandGuildName,
                jobCategory: demandJobCategory
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
        }
    }

    // مرتب کردن اعضا
    const sortedMembers = React.useMemo(() => {
        if (!union?.members) return [];
        return [...union.members].sort((a, b) =>
            a.member.businessName.localeCompare(b.member.businessName)
        );
    }, [union]);


    const renderDesktopTable = () => {
        return (
            <TableContainer sx={{ boxShadow: "none", bgcolor: "transparent" }}>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                            <TableCell sx={{ textAlign: "right", fontWeight: "bold", fontSize: "12px" }}>اعضای اتحادیه</TableCell>
                            <TableCell sx={{ textAlign: "right", fontWeight: "bold", fontSize: "12px" }}>پیشنهادها</TableCell>
                            <TableCell sx={{ textAlign: "right", fontWeight: "bold", fontSize: "12px" }}>نیازها</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedMembers.map((member) => {
                            const sortedOfferBasket = [...member.offerBasket].sort((a, b) =>
                                a.product.productName.localeCompare(b.product.productName)
                            );
                            const sortedDemandBasket = [...member.demandBasket].sort((a, b) =>
                                a.product.productName.localeCompare(b.product.productName)
                            );
                            return (
                                <TableRow
                                    key={member._id}
                                    sx={{
                                        borderBottom: "1px solid #ddd",
                                        "&:last-child td": { borderBottom: 0 },
                                    }}
                                >
                                    {/* اعضای اتحادیه - آواتار و نام کسب و کار در سمت راست */}
                                    <TableCell sx={{ verticalAlign: "top" }}>
                                        <Box
                                            onClick={() => router.push(`/${member.member.businessName}`)}
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start', // راست‌چین
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
                                                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
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
                                    </TableCell>

                                    {/* پیشنهادها */}
                                    <TableCell sx={{ verticalAlign: "top" }}>
                                        {sortedOfferBasket.map((offer) => (
                                            <Typography key={offer.product._id} variant="body2" sx={{ textAlign: "right", fontSize: 12 }}>
                                                {offer.product.productName} - {offer.amount}{" "}
                                                {offer.product.unitOfMeasurement}
                                            </Typography>
                                        ))}
                                    </TableCell>

                                    {/* نیازها */}
                                    <TableCell sx={{ verticalAlign: "top" }}>
                                        {sortedDemandBasket.map((demand) => (
                                            <Typography key={demand.product._id} variant="body2" sx={{ textAlign: "right", fontSize: 12 }}>
                                                {demand.product.productName} - {demand.amount}{" "}
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

    /**
     * رندر حالت موبایل (کارت)
     */
    const renderMobileCards = () => {
        return (
            <Box display="flex" flexDirection="column" gap={2}>
                {sortedMembers.map((member) => {
                    const sortedOfferBasket = [...member.offerBasket].sort((a, b) =>
                        a.product.productName.localeCompare(b.product.productName)
                    );
                    const sortedDemandBasket = [...member.demandBasket].sort((a, b) =>
                        a.product.productName.localeCompare(b.product.productName)
                    );
                    return (
                        <Paper
                            key={member._id}
                            sx={{ p: 1, border: "1px solid #ddd", borderRadius: 2 }}
                            elevation={0}
                        >
                            {/* اعضای اتحادیه - آواتار و نام کسب و کار در سمت راست */}
                            <Box
                                onClick={() => router.push(`/${member.member.businessName}`)}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    gap: 1,
                                    mb: 1,
                                }}
                            >
                                <Avatar sx={{ width: 40, height: 40 }}>
                                    <ItsAvatar
                                        isAvatar={member.member.isAvatar}
                                        userCodeOrBusinessBrand={member.member.businessName}
                                    />
                                </Avatar>
                                <Box sx={{ textAlign: 'right' }}>
                                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
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

                            <Divider sx={{ my: 1 }} />

                            {/* پیشنهادها */}
                            <Typography sx={{ fontWeight: "bold", fontSize: 13, mb: 1 }}>
                                پیشنهادها
                            </Typography>
                            {sortedOfferBasket.length === 0 && (
                                <Typography variant="caption" sx={{ fontSize: 12 }}>
                                    ---
                                </Typography>
                            )}
                            {sortedOfferBasket.map((offer) => (
                                <Typography key={offer.product._id} variant="body2" sx={{ fontSize: 12 }}>
                                    {offer.product.productName} - {offer.amount}{" "}
                                    {offer.product.unitOfMeasurement}
                                </Typography>
                            ))}

                            <Divider sx={{ my: 1 }} />

                            {/* نیازها */}
                            <Typography sx={{ fontWeight: "bold", fontSize: 13, mb: 1 }}>
                                نیازها
                            </Typography>
                            {sortedDemandBasket.length === 0 && (
                                <Typography variant="caption" sx={{ fontSize: 12 }}>
                                    ---
                                </Typography>
                            )}
                            {sortedDemandBasket.map((demand) => (
                                <Typography key={demand.product._id} variant="body2" sx={{ fontSize: 12 }}>
                                    {demand.product.productName} - {demand.amount}{" "}
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
        <React.Fragment>
            {/* دیالوگ عضویت در اتحاد */}
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle>عضویت در اتحاد</DialogTitle>
                <DialogContent>
                    <Container maxWidth="md" className="inMiddle" align="center">
                        <FormControl sx={{ my: 2, width: 300, align: "center" }}>
                            <InputLabel id="chose-business-lable">انتخاب کسب و کار</InputLabel>
                            <Select
                                labelId="chose-business-lable"
                                id="chose-business"
                                value={selectedBusinessName}
                                label="انتخاب کسب و کار"
                                onChange={(e) => {
                                    setSelectedBusinessName(e.target.value);
                                }}
                            >
                                {userBusinesses.map((userBusinessesName) => (
                                    <MenuItem key={userBusinessesName} value={userBusinessesName}>
                                        {userBusinessesName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                            سبد محصولاتی که می خواهید عرضه کنید
                        </Typography>
                        <BasketSelection
                            parentBasketFunction={addOfferBasket}
                            business={selectedBusiness}
                        />

                        <Typography sx={{ my: 2, textAlign: "center", fontSize: 14 }}>
                            سبد محصولاتی که می خواهید دریافت کنید
                        </Typography>
                        <SelectOrCreateCategoryAndGuild sendDataToParent={getDataFromChild} />
                        <BasketSelection
                            parentBasketFunction={addDemandBasket}
                            guild={demandGuild}
                        />
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ m: 2 }} color="info" variant="contained" onClick={handleClose}>
                        بازگشت
                    </Button>
                    <Button
                        children={"عضویت در اتحاد"}
                        variant="contained"
                        disabled={!(offerBasket.length && demandBasket.length)}
                        onClick={() => joinAUnion()}
                    />
                </DialogActions>
            </Dialog>

            {/* آکاردیون */}
            <Accordion
                disableGutters
                sx={{ bgcolor: blue[50], my: 1, minWidth: 300, width: "100%" }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ alignSelf: "flex-start" }} />}
                    aria-controls="pane-content"
                    id="pane-header"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        pl: 1,
                        minHeight: 56,
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            flexDirection: "column",
                        }}
                    >
                        <Typography sx={{ fontSize: 12, m: 0, fontWeight: "bold" }} textAlign={"right"}>
                            {union.unionName}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 11,
                                overflow: "hidden",
                                WebkitBoxOrient: "vertical",
                                WebkitLineClamp: 2,
                            }}
                            align="justify"
                            dir="rtl"
                        >
                            {union.slogan}
                        </Typography>
                    </Box>
                </AccordionSummary>

                <AccordionDetails
                    sx={{
                        bgcolor: "white",
                        borderTop: `1px solid ${blue[100]}`,
                    }}
                >
                    {/* اگر موبایل بود، کارت‌ها را رندر کن؛ اگر دسکتاپ بود، جدول */}
                    {isMobile ? renderMobileCards() : renderDesktopTable()}

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ flex: 1, minWidth: 150 }}>
                        <Typography sx={{ textAlign: "right", fontWeight: "bold", fontSize: "14px" }}>تراز</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", flexDirection:{xs:"column", sm:"row"}  }}>
                        <Box sx={{ flex: 1, minWidth: 150 }}>
                            <Typography sx={{ fontWeight: "bold", fontSize: "12px", mb: 1 }}>
                                پیشنهادهای باقی‌مانده
                            </Typography>
                            {leftoverSupply.length === 0 ? (
                                <Typography>---</Typography>
                            ) : (
                                leftoverSupply.map((item) => (
                                    <Typography key={item.productName} sx={{ fontSize: "12px" }}>
                                        {item.productName} - {item.amount} {item.unitOfMeasurement}
                                    </Typography>
                                ))
                            )}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 150 }}>
                            <Typography sx={{ fontWeight: "bold", fontSize: "12px", mb: 1 }}>
                                نیازهای باقی‌مانده
                            </Typography>
                            {leftoverDemand.length === 0 ? (
                                <Typography>---</Typography>
                            ) : (
                                leftoverDemand.map((item) => (
                                    <Typography key={item.productName} sx={{ fontSize: "12px" }}>
                                        {item.productName} - {item.amount} {item.unitOfMeasurement}
                                    </Typography>
                                ))
                            )}
                        </Box>
                    </Box>
                </AccordionDetails>

                <AccordionActions>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                        }}
                    >
                        <Typography sx={{ mr: 1, fontSize: "12px" }}>
                            {`مدت اتحاد: ${union.deadline} روز`}
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            عضویت
                        </Button>
                    </Box>
                </AccordionActions>
            </Accordion>
        </React.Fragment>
    );
}
