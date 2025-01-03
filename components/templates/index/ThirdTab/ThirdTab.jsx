import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Union from './union';

export default function ThirdTab({ primeBusiness, user }) {
    const [unions, setUnions] = useState([]);

    useEffect(() => {
        const getUnions = async () => {
            try {
                const res = await fetch("/api/getUnions", { method: "GET" });
                if (res.ok) {
                    const { data } = await res.json();
                    setUnions(data);
                } else {
                    console.log(res.status === 403 ? "unauthorized access" : "Failed to fetch unions");
                }
            } catch (error) {
                console.error("Error fetching Unions:", error);
            }
        };
        getUnions();
    }, []);

    return (
        <Container sx={{ mb: 10 }} maxWidth="md" className="inMiddle" display="flex" align='center'>
            {Object.keys(unions).map(category =>
                unions[category]?.length ? (
                    <Union
                        key={category}
                        primeBusiness={primeBusiness}
                        user={user}
                        unions={unions[category]}
                        category={category}
                    />
                ) : null
            )}
        </Container>
    );
}
