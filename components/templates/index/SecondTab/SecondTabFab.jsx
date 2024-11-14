import React, { useEffect } from 'react'
import { Button, CircularProgress, Container } from '@mui/material';
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import ProductBasket from '@/components/modules/ProductBasket';


export default function SecondTabFab({ user, primeBusiness }) {
    const [isLoading, setIsLoading] = React.useState(false);

    const [businessID, setBusinessID] = React.useState()
    const addBusinessID = (value) => {
        setBusinessID(value)
    }
    const [basket, setBasket] = React.useState([])

    const addBasket = (value) => {
        setBasket(value)
    }

    //Snackbars
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openSnackbar500Error, setOpenSnackbar500Error] = React.useState(false);


    const handleSnackbarClose = () => {
        setOpenSnackbar500Error(false)
        setOpenSnackbar(false);
    };

    //save basket to db
    async function updateMonthlyCommitment() {

        setIsLoading(true);
        const res = await fetch('api/setMonthlyCommitment', {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ businessID, basket })
        })
        if (res.status === 500) {
            console.log("server error");
            setOpenSnackbar500Error(true)
            setIsLoading(false)
        } else if (res.status === 201) {
            console.log("updateMonthlyCommitment sited successfully");
            setOpenSnackbar(true)
            setIsLoading(false)
        }
    }
    return (
        <Container maxWidth="md" className="inMiddle" align='center' >
            {isLoading ?
                <CircularProgress />
                :
                <>
                    <ProductBasket
                        {...{ user, primeBusiness }}
                        parentBasketFunction={addBasket}
                        parentSetBusinessID={addBusinessID}
                    />
                    {basket[0] && <Button
                        sx={{ display: "block" }}
                        children={"ذخیره تغییرات"}
                        variant="contained"
                        // disabled={saveChangeButtonDisabled}
                        onClick={updateMonthlyCommitment}
                    />}
                    <CustomSnackbar
                        open={openSnackbar}
                        onClose={handleSnackbarClose}
                        message="تعهدات ماهانه این کسب و کار بروزرسانی شد"
                    />
                    <CustomSnackbar
                        open={openSnackbar500Error}
                        onClose={handleSnackbarClose}
                        message="خطا از سمت سرور"
                        severity="error"
                    />
                </>
            }
        </Container>
    )
}
