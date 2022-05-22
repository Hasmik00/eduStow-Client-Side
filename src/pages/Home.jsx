import React, { useEffect } from "react";
import { Card, Col } from "antd";
import { Spin, Space } from "antd";
import COLORS from "../constats/colors";
import useFetch from "../utils/hooks/useFetch";
import "./pages.css";
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {
  const [{ response, isLoading }, doFetch] = useFetch("/category");

  const navigation = useNavigate();

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading) {
    return (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    );
  }

  return (
    <div className="site-card-wrapper">
      {response &&
        response.map((item) => {
          return (
            <Col
              className="cardBlock"
              key={item._id}
              onClick={() => navigation(`category/${item._id}`)}
            >
              <Card
                title={item.title}
                bordered={false}
                className="card"
                hoverable
                style={{
                  backgroundColor: COLORS[Math.floor(Math.random() * 10)],
                }}
              >
                {item.description}
              </Card>
            </Col>
          );
        })}
    </div>
  );
};

export default Home;
