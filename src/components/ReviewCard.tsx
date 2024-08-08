import React from 'react';
import styled from 'styled-components';
import Badge from 'react-bootstrap/Badge';

// Define the props type
type ReviewCardProps = {
  title: string;
  rating: string;
  content: string;
  performanceTitle: string;
  bgType: string;
};

const ReviewCard: React.FC<ReviewCardProps> = ({ title, rating, content, performanceTitle, bgType }) => {
  return (
    <Card>
      <CardHeader>
        <HeaderContent>
          <StyledBadge bg={bgType}>{rating}</StyledBadge>
          {title}
        </HeaderContent>
      </CardHeader>
      <CardBody>{content}</CardBody>
      <CardFooter>{performanceTitle}</CardFooter>
    </Card>
  );
};

// Styled Components
const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
`;

const CardHeader = styled.div`
  font-size: 1.2em;
  margin-bottom: 8px;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
`;

const StyledBadge = styled(Badge)`
  margin-right: 8px;
`;

const CardBody = styled.p`
  font-size: 1em;
  margin-bottom: 16px;
`;

const CardFooter = styled.footer`
  font-size: 0.9em;
  color: #555;
  text-align: right;
`;

export default ReviewCard;