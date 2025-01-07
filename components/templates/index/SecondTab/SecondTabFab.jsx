import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, Container } from '@mui/material';
import CustomSnackbar from "@/components/modules/CustomSnackbar";
import ProductBasket from '@/components/modules/ProductBasket';


export default function SecondTabFab({ user, primeBusiness }) {
    const [isLoading, setIsLoading] = React.useState(false);

    const [businessID, setBusinessID] = React.useState()
    const addBusinessID = (value) => {
        setBusinessID(value)
    }
    const [basket, setBasket] = useState([])
    const [isBasketChanged, setIsBasketChanged] = useState(true);

    const addBasket = (value, isBasketChanged) => {
        setBasket(value)
        setIsBasketChanged(isBasketChanged)
    }

    //Snackbars
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openSnackbar200, setOpenSnackbar200] = React.useState(false);
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
            setIsBasketChanged(true)
            setIsLoading(false)

        } else if (res.status === 200) {
            console.log("MonthlyCommitment deleted successfully");
            setOpenSnackbar200(true)
            setIsBasketChanged(true)
            setBasket([])
            setIsLoading(false)
        }
    }
    const useFor = "setMonthlyCommitment"
    return (
        <Container maxWidth="md" className="inMiddle" align='center' >
            {isLoading ?
                <CircularProgress />
                :
                <>
                    <ProductBasket
                        {...{ user, primeBusiness, useFor }}
                        parentBasketFunction={addBasket}
                        parentSetBusinessID={addBusinessID}
                    />
                    <Button
                        sx={{ display: "block" }}
                        variant="contained"
                        disabled={isBasketChanged}
                        onClick={updateMonthlyCommitment}
                    >
                        ذخیره تغییرات
                    </Button>
                    <CustomSnackbar
                        open={openSnackbar}
                        onClose={handleSnackbarClose}
                        message="تعهدات ماهانه بروزرسانی شد"
                    />
                    <CustomSnackbar
                        open={openSnackbar200}
                        onClose={handleSnackbarClose}
                        message="تعهدات ماهانه پاک شد"
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
