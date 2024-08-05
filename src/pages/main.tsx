// src/pages/main.tsx
import React from 'react';
import styled from 'styled-components';

const Main: React.FC = () => {
  return (
      <Container>
        <Title>대시보드</Title>
        <Content>
          <p>여기에 대시보드 콘텐츠를 추가하세요.</p>
        </Content>
      </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 화면 전체 높이 */
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Content = styled.div`
  width: 80%;
  max-width: 800px;
  text-align: center;
`;

export default Main;