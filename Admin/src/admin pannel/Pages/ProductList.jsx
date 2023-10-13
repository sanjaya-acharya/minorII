import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      axios
        .post("http://localhost:4000/api/items/getallItems")
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>SN</Th>
            <Th>Title</Th>
            <Th>Price</Th>
          </Tr>
          {products?.map((d, index) => (
          <Tr key={d._id}>
            <Td>{index + 1}</Td>
            <Td>{d.itemName}</Td>
            <Td>Rs. {d.price}</Td>
          </Tr>
          ))}
        </Thead>
        <Tbody>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ProductList;
