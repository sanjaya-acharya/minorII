import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import axios from 'axios';

const Customers = () => {
    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:4000/api/accounts/customers');
                setCustomerData(response.data);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchData();
    }, [customerData]);

    const handleSuspend = async (userID) => {
        try {
            const message = 'Inappropriate Behavior';
            const response = await axios.post('http://localhost:4000/api/accounts/suspendUser', { userID, message });
            console.log('Suspend Response:', response.data);
            fetchData();
        } catch (error) {
            console.error('Error suspending user:', error);
        }
    };

    const handleRemoveSuspension = async (userID) => {
        try {
            const response = await axios.post('http://localhost:4000/api/accounts/removeSuspension', { userID });
            console.log('Remove Suspension Response:', response.data);
            fetchData();
        } catch (error) {
            console.error('Error removing suspension:', error);
        }
    };

    return (
        <Box p={4}>
            <Table variant="striped" colorScheme="teal">
                <Thead>
                    <Tr>
                        <Th>Full Name</Th>
                        <Th>User ID</Th>
                        <Th width="100px">Active</Th>
                        <Th width="250px" textAlign="center">Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {customerData.map((customer) => (
                        <Tr key={customer.userID}>
                            <Td>{customer.fullname}</Td>
                            <Td>{customer.userID}</Td>
                            <Td>{customer.active ? 'Active' : 'Inactive'}</Td>
                            <Td textAlign="right" marginRight="10px">
                                {customer.active ? (
                                    <Button
                                        colorScheme="red"
                                        onClick={() => handleSuspend(customer.userID)}
                                    >
                                        Suspend
                                    </Button>
                                ) : (
                                    <Button
                                        colorScheme="blue"
                                        ml={2}
                                        onClick={() => handleRemoveSuspension(customer.userID)}
                                    >
                                        Remove Suspension
                                    </Button>
                                )}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default Customers;
