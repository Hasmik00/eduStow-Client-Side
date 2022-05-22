import React, { useEffect } from "react";
import { Card, Col } from "antd";
import { Spin, Space } from "antd";
import COLORS from "../constats/colors";
import useFetch from "../utils/hooks/useFetch";
import "./pages.css";
import { Link, useLocation, useParams } from "react-router-dom";

const Subcategory = () => {
  const { id } = useParams();

  const [{ response, isLoading }, doFetch] = useFetch("/subcategory");

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

  return (
    <div className="site-card-wrapper">
      {response &&
        response
          .filter((item) => item.categoryId === id)
          .map((item) => {
            return (
              <Col className="cardBlock" key={item._id}>
                <Link to={`subCategory/${item._id}`}>
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

export default Subcategory;
