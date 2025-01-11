"use client";

import { useState, useEffect, useMemo } from "react";
import {
    Autocomplete,
    TextField,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Box,
    Button
} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    maxWidth: '600px',  // ✅ محدودیت عرض
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '100%', // ✅ تغییر برای ریسپانسیو
        },
    },
}));

const groupLabelMap = {
    user: "کاربران",
    business: "کسب و کارها",
};

export default function SearchBox() {
    const [term, setTerm] = useState("");
    const [allOptions, setAllOptions] = useState([]);
    const [expandedGroups, setExpandedGroups] = useState({
        user: false,
        business: false,
    });

    // ✅ فراخوانی داده‌ها
    useEffect(() => {
        if (!term.trim()) {
            setAllOptions([]);
            return;
        }

        const controller = new AbortController();
        fetch(`/api/search?term=${term}`, { signal: controller.signal })
            .then((res) => res.json())
            .then((json) => {
                if (Array.isArray(json.data)) {
                    setAllOptions(json.data);
                } else {
                    setAllOptions([]);
                }
            })
            .catch((err) => {
                if (err.name !== "AbortError") {
                    console.error("Search error:", err);
                }
            });

        return () => controller.abort();
    }, [term]);

    // ✅ دسته‌بندی و محدود کردن نمایش
    const displayedOptions = useMemo(() => {
        const users = allOptions.filter((o) => o.type === "user");
        const businesses = allOptions.filter((o) => o.type === "business");
        const limitedUsers = expandedGroups.user ? users.slice(0, 10) : users.slice(0, 3);
        const limitedBusinesses = expandedGroups.business
            ? businesses.slice(0, 10)
            : businesses.slice(0, 3);
        return [...limitedUsers, ...limitedBusinesses];
    }, [allOptions, expandedGroups]);

    // ✅ تابع گروه‌بندی
    const groupBy = (option) => option.type;

    // ✅ رفع خطای li تو در تو - استفاده از <div>
    const renderGroup = (params) => {
        const group = params.group;
        const label = groupLabelMap[group] || "سایر";
        const totalCount = allOptions.filter((o) => o.type === group).length;
        const isExpanded = expandedGroups[group];

        return (
            <div key={params.key}> 
                <Typography variant="subtitle2" sx={{ px: 2, pt: 1, display: "flex", gap: 1 }}>
                    {label}
                    {!isExpanded && totalCount > 3 && (
                        <Button
                            size="small"
                            onClick={(e) => {
                                e.stopPropagation();
                                setExpandedGroups((prev) => ({ ...prev, [group]: true }));
                            }}
                        >
                            بیشتر
                        </Button>
                    )}
                </Typography>
                {params.children}
            </div>
        );
    };

    // ✅ رفع خطای تودرتو با استفاده از <div> به جای <li>
    const renderOption = (props, option) => {
        let avatarSrc = "";
        if (option.type === "user" && option.isAvatar) {
            avatarSrc = `/avatars/${option.code}.jpg`;
        } else if (option.type === "business" && option.isAvatar) {
            avatarSrc = `/avatars/business/${option._id}.jpg`;
        }

        return (
            <div {...props} key={option._id} style={{ width: '100%' }}>
                <ListItem disableGutters>
                    <ListItemAvatar>
                        <Avatar src={avatarSrc} />
                    </ListItemAvatar>
                    <ListItemText primary={option.name} secondary={option.code} />
                </ListItem>
            </div>
        );
    };

    // ✅ کامپوننت نهایی
    return (
        <Box sx={{ direction: "ltr", display: 'flex', justifyContent: 'center' }}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <Autocomplete
                    options={displayedOptions}
                    groupBy={groupBy}
                    renderGroup={renderGroup}
                    getOptionLabel={(option) => option.name}
                    renderOption={renderOption}
                    noOptionsText="موردی یافت نشد"
                    inputValue={term}
                    onInputChange={(e, newValue) => setTerm(newValue)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="کارباکار"
                            variant="outlined"
                            fullWidth
                        />
                    )}
                />
            </Search>
        </Box>
    );
}
