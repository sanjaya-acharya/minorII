import "../styles/Adlogin.css";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { toast } from "react-toastify";

export default function Adlogin() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("isLoggedIn"));

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.password) {
            toast("Fill all fields");
            return;
        }

        if (formData.username === "admin" && formData.password === "1234") {
            sessionStorage.setItem("adminCode", "9356a1a6ecdfc79b2212bb5d2cc1f86f");
            sessionStorage.setItem("adminName", "Sanjaya Acharya");
            sessionStorage.setItem("isLoggedIn", true);
            toast("Login successful");
            setIsLoggedIn(true);
            navigate('/');
        } else {
            toast("Invalid username or password");
        }
    };

    return (
        <>
            <Box
                position="absolute"
                opacity="1"
                zIndex="-1"
                width="100vw"
                height="100vh"
                top="-123px"
                left="-2px"
                overflow="hidden"
                backgroundImage="url('http://localhost:4000/uploads/bg.png')"
                backgroundSize="cover"
            ></Box>
            <Box
                as="form"
                onSubmit={handleSubmit}
                className="my-form-container"
                color="#FFF"
                bg="#00000044"
                maxW="400px"
                mx="auto"
                mt="20vh"
                padding="15px 20px"
                border="1px solid white"
                borderRadius="5px"
            >
                <h1>Admin LogIn</h1>
                <div className="fields-wrapper">
                    <FormControl className="form-field">
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl className="form-field">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <br />
                    <Button className="login-btn" name="login" type="submit">
                        LogIn
                    </Button>
                </div>
            </Box>
        </>
    );
}
