import React, { useEffect, useState } from 'react';
import Union from './components/Union';
import { Container, Typography } from '@mui/material';

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
        <Container sx={{ mb: 10, maxWidth: "md", display: "flex", align: "center", flexDirection: "column" }}>
            {Object.entries(unions).map(([category, unionList]) =>
                unionList.length > 0 ? (
                    unionList.map((union, index) => (
                        <Union
                            key={`${category}-${index}`}
                            primeBusiness={primeBusiness}
                            user={user}
                            union={union}
                            category={category}
                        />
                    ))
                ) : null
            )}
        </Container>

    )
}
