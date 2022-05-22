import React, { useEffect } from "react";
import { Card, Col } from "antd";
import { Spin, Space } from "antd";
import COLORS from "../constats/colors";
import useFetch from "../utils/hooks/useFetch";
import "./pages.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

const Subcategories = () => {
  const { id } = useParams();

  const [{ response, isLoading }, doFetch] = useFetch("/course");

  useEffect(() => {
    doFetch();
  }, [doFetch, id]);

  if (isLoading) {
    return (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    );
  }
  console.log(response, "res");

  return (
    <div className="site-card-wrapper">
      {response &&
        response
          .filter((item) => item.subcategoryId === id)
          .map((item) => {
            return (
              <Col className="cardBlock" key={item._id}>
                <Link to={`courses/${item._id}`}>
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
                </Link>
              </Col>
            );
          })}
    </div>
  );
};

export default Subcategories;
