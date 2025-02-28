'use client';

import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import '@ant-design/v5-patch-for-react-19';

interface AntdProviderProps {
  children: ReactNode;
}

const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => {
  return <ConfigProvider>{children}</ConfigProvider>;
};

export default AntdProvider;
