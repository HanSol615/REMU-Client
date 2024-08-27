import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import styled from 'styled-components';

interface PerformCardProps {
  poster: string;
  title: string;
  rating: string;
  onClick: () => void;
}

const PerformCard: React.FC<PerformCardProps> = ({ poster, title, rating, onClick }) => {
  return (
    <ClickableCard border="secondary" onClick={onClick}>
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
        </CardContent>
      </Card.Body>
    </ClickableCard>
  );
};

const ClickableCard = styled(Card)`
  cursor: pointer; /* Ensure the card appears clickable */
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const PosterWrapper = styled.div`
  flex: 0 0 auto;
  width: 100px;
  aspect-ratio: 1 / 1.4142;
`;

const TitleWrapper = styled.div`
  flex: 1;
  padding-left: 15px;
`;

export default PerformCard;