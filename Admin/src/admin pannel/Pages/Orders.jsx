import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const Orders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:4000/api/orders/getAllOrders", { userID: sessionStorage.getItem("userID") });
        const items = response.data.flatMap(order =>
          order.cartItems.map(cartItem => ({
            itemID: cartItem.itemID,
            quantity: cartItem.quantity,
          }))
        );

        const transformedItems = await Promise.all(
          items.map(async ({ itemID, quantity }) => {
            try {
              const response = await axios.post("http://localhost:4000/api/items/getItem", { itemID });
              const itemName = response.data.itemName;
              return { itemName, quantity };
            } catch (error) {
              console.error("Error fetching item details for itemID", error);
              return null;
            }
          })
        );

        setData(transformedItems.filter(Boolean));

      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchData();
  }, [])

  const markCompleted = async (id) => {
    try {
      let result = await axios.delete(
        `http://localhost:4000/api/brand/updates/${id}`
      );
      console.log("Item deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>SN</Th>
            <Th>Coffee Orders</Th>
            <Th>Quantity</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((d, index) => (
            <Tr key={index}>
              <Td>{index + 1}</Td>
              <Td>{d.itemName}</Td>
              <Td>{d.quantity}</Td>
              <Td>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => markCompleted(d._id)}
                >
                  Mark Completed
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Orders;
