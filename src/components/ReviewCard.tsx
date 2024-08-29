// src/components/ReviewCard.tsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Badge from 'react-bootstrap/Badge';

type ReviewCardProps = {
  title: string;
  rating: string;
  content: string;
  performanceTitle: string;
  bgType: string;
  showKebab?: boolean;
  onDelete?: () => void;
  onEdit?: () => void; // Add the onEdit prop
};

const ReviewCard: React.FC<ReviewCardProps> = ({ title, rating, content, performanceTitle, bgType, showKebab, onDelete, onEdit }) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenuVisibility = () => {
    setMenuVisible(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    };

    if (menuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuVisible]);

  return (
    <Card>
      <CardHeader>
        <HeaderContent>
          <StyledBadge bg={bgType}>{rating}</StyledBadge>
          {title}
        </HeaderContent>
        {showKebab && (
          <KebabWrapper onClick={toggleMenuVisibility}>
            <BsThreeDotsVertical />
          </KebabWrapper>
        )}
      </CardHeader>
      {menuVisible && (
        <Menu ref={menuRef}>
          {onEdit && <MenuItem onClick={onEdit}>수정</MenuItem>}
          {onDelete && <MenuItem onClick={onDelete}>삭제</MenuItem>}
        </Menu>
      )}
      <CardBody>{content}</CardBody>
      <CardFooter>{performanceTitle}</CardFooter>
    </Card>
  );
};

// Styled components
const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 5px;
  position: relative;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  position: relative;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledBadge = styled(Badge)`
  margin-right: 8px;
  font-size: 1rem;
`;

const KebabWrapper = styled.div`
  cursor: pointer;
  font-size: 1.5em;
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

const Menu = styled.div`
  position: absolute;
  top: 20px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 100;
  width: 100px;
`;

const MenuItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export default ReviewCard;