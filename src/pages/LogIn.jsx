import { Form, Input, Button } from "antd";
import { useContext } from "react";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import { CurrentUserContext } from "../context/context";
import { useLocation, useNavigate } from "react-router-dom";
import "./pages.css";
import getToken from "../api/getToken";

const Login = () => {
  const { pathname } = useLocation();
  const navigation = useNavigate();
  const [, dispatch] = useContext(CurrentUserContext);

  const onFinish = async (values) => {
    if (pathname !== "/login") {
      await getToken(values);
      navigation("/login");
    } else {
      const data = await getToken(values);
      localStorage.setItem("token", data);
      dispatch({ type: "SET_AUTHORIZED", payload: data });
      navigation("/");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login" >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {pathname !== "/login" && (
          <Form.Item
            label="Username"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="User name"
              prefix={<UserOutlined />}
            />
          </Form.Item>
        )}
        <Form.Item
          label="Email"
          name="email"
          type="email"
          rules={[
            {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please input correct email!",
            },
          ]}
        >
          <Input size="large" placeholder="Email" prefix={<MailOutlined />} />
        </Form.Item >
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password size="large" placeholder="Password" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit"   
          style={{backgroundColor: '#7d9391', borderColor:'#7d9391'}}>
            {pathname === "/login" ? "Log In" : "Sign In"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
