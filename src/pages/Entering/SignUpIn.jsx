import * as React from 'react';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';

export default function SignUpIn() {

    function helloo(e) {
        e.preventDefault()
        alert("hello")
    }
    return (
        <form  onSubmit={helloo}>
            <Box
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div >
                    <header className="wellcome-header">
                        <Box

                            display="flex"
                            flexDirection="column"
                            justifyContent='center'
                        >

                            <Box
                                display="flex"
                                flexDirection="column"
                                justifyContent='center'
                            >
                                <TextField
                                    id="outlined-textarea"
                                    label="شماره موبایل خود را وارد کنید"
                                    placeholder="مثلا 09123456789"
                                    type="tel"
                                    multiline
                                />
                                <TextField
                                    id="outlined-password-input"
                                    label="رمز عبور"
                                    type="password"
                                    autoComplete="current-password"
                                />
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="column"


                                sx={{ mx: 'auto' }}
                            >

                                <Button sx={{ my: 2, width: 150, }} component={Link} to="/" variant="outlined" >بازگشت </Button>
                                <Button
                                    type="submit"
                                    

                                    sx={{ width: 150, }}
                                    //  component={Link} to="/index"
                                    variant="contained" >ورود یا ثبت نام</Button>
                            </Box>
                        </Box>

                    </header>
                </div>

            </Box>
        </form>
    );
}
