// src/components/NewPerformCard.tsx

import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

interface NewPerformCardProps {
  poster: string;
  title: string;
  rating: string;
}

const NewPerformCard: React.FC<NewPerformCardProps> = ({ poster, title, rating }) => {
  return (
    <Card border="secondary">
      <Card.Header>
        <Badge bg="primary">{rating}</Badge>
      </Card.Header>
      <Card.Body>
        <CardContent>
          <PosterWrapper>
            <Image src={poster} rounded fluid />
          </PosterWrapper>
          <TitleWrapper>
            <Card.Title>{title}</Card.Title>
          </TitleWrapper>
          <ButtonWrapper>
            <Button variant="primary" size="lg">
              상세 보기
            </Button>
          </ButtonWrapper>
        </CardContent>
      </Card.Body>
    </Card>
  );
};

const CardContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const PosterWrapper = styled.div`
  flex: 0 0 auto; /* Prevent resizing */
  width: 100px;
  aspect-ratio: 1 / 1.4142; /* Maintain A2 ratio */
`;

const TitleWrapper = styled.div`
  flex: 1; /* Allow this column to take up remaining space */
  padding-left: 15px;
`;

const ButtonWrapper = styled.div`
  flex: 0 0 auto;
  text-align: right;
`;

export default NewPerformCard;
