import '../styles/Products.css';
import ProductBox from './ProductBox';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.post("http://localhost:4000/api/items/getallitems", {})
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="ProductsContainer">
            {products.length === 0 ? (
                <div>No products available</div>
            ) : (
                products.map(item => (
                    <ProductBox key={item._id} item={item} />
                ))
            )}
        </div>
    );
};

export default Products;
