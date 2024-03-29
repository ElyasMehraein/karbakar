"use client"
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            fetch('/api/Search', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ searchTerm }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setUsers(data.data);
                })
                .catch((err) => {
                    console.error(err);
                });

        }
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <List>
                {users.map((user) => (
                    <ListItem key={user._id}>
                        <ListItemText primary={user.userName} secondary={user.code} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
};