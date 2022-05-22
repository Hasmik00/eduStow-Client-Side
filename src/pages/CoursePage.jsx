import React, { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import download from "downloadjs";

import { CurrentUserContext } from "../context/context";
import { PlusSquareOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Card, Col } from "antd";
import { Spin, Space } from "antd";
import COLORS from "../constats/colors";
import useFetch from "../utils/hooks/useFetch";
import "./pages.css";
import { useState } from "react";
import axios from "axios";

const CoursePage = () => {
  const { id } = useParams();
  const [currentUserState] = useContext(CurrentUserContext);
  const navigation = useNavigate();
  const [show, setShow] = useState(false);
  const [{ response, isLoading }, doFetch] = useFetch(`/course/id/${id}`);

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
  if (!response) {
    return <div>Something went wrong</div>;
  }
  const downLoad = async () => {
    const response = await axios(
      `${process.env.REACT_APP_SERVER_URL}/course/materials/${id}`,
      { responseType: "blob" }
    );
    await window.open(URL.createObjectURL(response.data));
  };
  return (
    <div className="site-card-wrapper">
      {response && (
        <Col className="cardBlock" key={response._id}>
          <Card
            title={response.title}
            extra={
              <Button
                icon={<PlusSquareOutlined />}
                onClick={() => {
                  if (!currentUserState.isLoggedIn) {
                    navigation("/login");
                  } else {
                    setShow(true);
                  }
                }}
              />
            }
            bordered={false}
            className="card"
            hoverable
            style={{
              backgroundColor: COLORS[Math.floor(Math.random() * 10)],
            }}
          >
            {response.description}
          </Card>
          {show && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "5px",
              }}
            >
              <Button
                icon={<DownloadOutlined />}
                style={{
                  backgroundColor: COLORS[Math.floor(Math.random() * 10)],
                }}
                onClick={downLoad}
              >
                Download
              </Button>
            </div>
          )}
        </Col>
      )}
    </div>
  );
};

export default CoursePage;
