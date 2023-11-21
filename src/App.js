import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Navbar, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import NamikBoard from "./components/namik/NamikBoard";
import YohanBoard from "./components/yohan/YouhanBoard";
import SungchanBoard from "./components/sungchan/SungchanBoard";
import Home from "./components/Home/Home";

function App() {
  let navigate = useNavigate();
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand
            style={{
              cursor: "pointer", // 커서 모양을 손가락으로 변경
              textDecoration: "none", // 클릭 시 텍스트 밑줄 제거
              color: "#333", // 클릭 시 텍스트 색상 변경
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            Board Project
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Text
            style={{
              cursor: "pointer", // 커서 모양을 손가락으로 변경
              textDecoration: "none", // 클릭 시 텍스트 밑줄 제거
              color: "#333", // 클릭 시 텍스트 색상 변경
              marginRight: "10px",
            }}
            onClick={() => {
              navigate("/namik");
            }}
          >
            Board☝️
          </Navbar.Text>
          <Navbar.Text
            style={{
              cursor: "pointer", // 커서 모양을 손가락으로 변경
              textDecoration: "none", // 클릭 시 텍스트 밑줄 제거
              color: "#333", // 클릭 시 텍스트 색상 변경
            }}
            onClick={() => {
              navigate("/youhan");
            }}
          >
            Board✌️ 
          </Navbar.Text>
          <Navbar.Text
            style={{
              cursor: "pointer", // 커서 모양을 손가락으로 변경
              textDecoration: "none", // 클릭 시 텍스트 밑줄 제거
              color: "#333", // 클릭 시 텍스트 색상 변경
            }}
            onClick={() => {
              navigate("/sungchan");
            }}
          >
            Board👌
          </Navbar.Text>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Meow</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/namik" element={<NamikBoard />} />
        <Route path="/youhan" element={<YohanBoard/>} />
        <Route path="/sungchan" element={<SungchanBoard/>} />
      </Routes>
    </>
  );
}

export default App;
