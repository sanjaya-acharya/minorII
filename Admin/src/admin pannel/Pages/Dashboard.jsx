import React from "react";
import { Table } from "antd";
const columns = [
  {
    title: "Orders",
    dataIndex: "itemName",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const data1 = [
  {
    key: 1,
    itemName: "Cappuccino",
    quantity: 3,
    status: "pending"
  },
  {
    key: 2,
    itemName: "Mocha",
    quantity: 1,
    status: "pending"
  },
  {
    key: 3,
    itemName: "Espresso",
    quantity: 2,
    status: "pending"
  },
  {
    key: 4,
    itemName: "Espresso",
    quantity: 4,
    status: "pending"
  },
  {
    key: 5,
    itemName: "Cappuccino",
    quantity: 3,
    status: "pending"
  }
];

function Dashboard() {
  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="Money d-flex justify-content-between align-items-end flex-grow-1 p-3 rounded-3">
          <div>
            <div>
              <p className="mb-0">Total sells</p>
              <h4>Rs 10000</h4>
              <div>
                <h5>40% up</h5>
                <p>Compaired to April</p>
              </div>
            </div>
          </div>
        </div>
        <div className="Money d-flex justify-content-between align-items-end flex-grow-1 p-3 rounded-3">
          <div>
            <div>
              <p className="mb-0">Average order value</p>
              <h4>Rs 10000</h4>
              <div>
                <h5>40% down</h5>
                <p>Compaired to April</p>
              </div>
            </div>
          </div>
        </div>
        <div className="Money d-flex justify-content-between align-items-end flex-grow-1 p-3 rounded-3">
          <div>
            <div>
              <p className="mb-0">Total orders</p>
              <h4>Rs 10000</h4>
              <div>
                <h5>40% up</h5>
                <p>Compaired to April</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb4">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
