import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Col } from "antd";
import { Spin, Space } from "antd";
import COLORS from "../constats/colors";
import useFetch from "../utils/hooks/useFetch";
import "./pages.css";

const SearchList = () => {
  const { value } = useParams();

  const [{ response, isLoading }, doFetch] = useFetch(`/course/title/${value}`);

  useEffect(() => {
    doFetch();
  }, [doFetch, value]);

  if (isLoading) {
    return (
      <Space size="middle">
        <Spin size="large" />
      </Space>
    );
  }
  if (!response) {
    return <div>No such course is found</div>;
  }
  console.log(response);

  return (
    <div className="site-card-wrapper">
      {response && (
        <Col className="cardBlock" key={response._id}>
          <Link to={`course/${response._id}`}>
            <Card
              title={response.title}
              bordered={false}
              className="card"
              hoverable
              style={{
                backgroundColor: COLORS[Math.floor(Math.random() * 10)],
              }}
            >
              {response.description}
            </Card>
          </Link>
        </Col>
      )}
    </div>
  );
};

export default SearchList;
