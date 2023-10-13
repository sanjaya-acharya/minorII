import React from "react";
import { useEffect, useState } from "react";
import { AiOutlineDashboard, AiOutlineUser } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { VscSignOut } from "react-icons/vsc";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("isLoggedIn"));

  useEffect(() => {
      if (!isLoggedIn) {
          navigate('/adminlogin');
      }
  }, [isLoggedIn]);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="Logo">
          <h4 className="text-white fs-5 text-center py-1 mb-0">
            <span className="Full-logo">Coffee Shop</span>
            <span className="Half-logo"><img src="https://i.ibb.co/bKmFrg6/logo.jpg" alt="C S"/></span>
          </h4>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
              sessionStorage.clear();
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "customer",
              icon: <AiOutlineUser className="fs-4" />,
              label: "Customers",
            },
            {
              key: "Products",
              icon: <MdOutlineProductionQuantityLimits className="fs-4" />,
              label: "Products",
              children: [
                {
                  key: "addproducts",
                  icon: <MdOutlineProductionQuantityLimits className="fs-4" />,
                  label: "Addproducts",
                },
                {
                  key: "productlist",
                  icon: <MdOutlineProductionQuantityLimits className="fs-4" />,
                  label: "Product List",
                },
              ],
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Orders",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: "colorBgContainer",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="d-flex gap-3 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-3" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                4
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center">
              <div>
              </div>
              <div>
                <p className="mb-0">Welcome</p>
                <h5 className="mb-0">{sessionStorage.getItem("adminName")}</h5>
              </div>
              <button onClick={()=>{
                sessionStorage.clear();
                window.location.reload();
              }}>SignOut</button>
              <VscSignOut onClick={()=>{
                sessionStorage.clear();
                window.location.reload();
              }}/>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <main>
            <Outlet />
          </main>
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
