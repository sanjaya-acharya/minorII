// Admin.js

import React from 'react';
import { Routes, Route, BrowserRouter, Link, useNavigate } from 'react-router-dom';
import ItemList from './ItemList';
import AddItem from './AddItem';
import UpdateItem from './UpdateItem';

const Admin = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <nav>
                <ul>
                    <li>
                        <a onClick={() => navigate('/admin/items')}>Item List</a>
                    </li>
                    <li>
                        <a onClick={() => navigate('/admin/add')}>Add Item</a>
                    </li>
                    <li>
                        <a onClick={() => navigate('/admin/update')}>Update Item</a>
                    </li>
                </ul>
            </nav>
            <div>
            </div>
        </div>
    );
};

export default Admin;
