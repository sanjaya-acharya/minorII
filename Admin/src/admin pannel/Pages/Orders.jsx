import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button } from "@chakra-ui/react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post("http://localhost:4000/api/orders/getAllOrders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, []);

const generatePDF = (order) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(16);
  doc.text("SNS COFFEE SHOP", doc.internal.pageSize.width / 2, 10, "center");
  doc.text("", doc.internal.pageSize.width / 2, 16); // Line break

  // Add date and order ID
  doc.text(`Date: ${new Date().toISOString().split('T')[0]}`, doc.internal.pageSize.width - 20, 20, "right");
  doc.text(`Order ID: ${order._id}`, 20, 20);
  doc.text("", 20, 26); // Line break
  doc.text("", 20, 26); // Line break

  // Add table headers
  const headers = ["Name", "Price", "Quantity", "Amount"];
  const data = order.cartItems.map(item => [item.itemName, `Rs. ${item.price}`, item.quantity, `Rs. ${item.price * item.quantity}`]);
  while (data.length < 10) {
    data.push(["", "", "", ""]); // Add empty rows if there are fewer than 10 items
  }

  // Add auto-table
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 30,
    theme: 'striped', // Optional: Add a striped theme to the table
  });

  // Add email and signature
  doc.text(`Email: ${order.emailID}`, 20, doc.autoTable.previous.finalY + 10);
  doc.text("Signature: __________", doc.internal.pageSize.width - 20, doc.autoTable.previous.finalY + 10, "right");

  doc.save("coffee_bill.pdf");
};

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Order ID</Th>
              <Th>Email</Th>
              <Th>Total Amount</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => (
              <Tr key={order._id}>
                <Td>{order._id}</Td>
                <Td>{order.emailID}</Td>
                <Td>Rs. {order.totalAmount}</Td>
                <Td>
                  <Button colorScheme="blue" onClick={() => generatePDF(order)}>
                    Download Bill
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Orders;
