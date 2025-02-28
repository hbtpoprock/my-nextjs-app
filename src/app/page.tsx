'use client';

import React from 'react';
import { Form, Input, Button, Checkbox, Card, Space, Typography } from 'antd';

const { Title } = Typography;

export default function LoginPage() {
  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // Implement your login logic here
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: 'center' }}>
          Login
        </Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <Form.Item>
            <Space style={{ width: '100%' }}>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Log in
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
