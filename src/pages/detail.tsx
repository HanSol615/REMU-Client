import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getDetails, createReview } from '../services/api';
import ReviewCard from '../components/ReviewCard';
import Badge from 'react-bootstrap/Badge';
import { Button } from 'react-bootstrap';
import OffCanvas from '../components/OffCanvas';

const Detail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const prfId = params.get('prfId');

  const [performanceData, setPerformanceData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showOffCanvas, setShowOffCanvas] = useState<boolean>(false);
  const [hasReview, setHasReview] = useState<boolean>(false);

  useEffect(() => {
    const fetchPerformanceDetails = async () => {
      if (prfId) {
        try {
          const data = await getDetails(prfId);
          setPerformanceData(data);
          // Check if the user has already reviewed this performance
          const userReview = data.reviews.data.find((review: any) => review.user_id === 'current-user-id'); // Replace with actual user ID
          setHasReview(!!userReview);
        } catch (error) {
          console.error('공연 정보를 불러오는 데 실패했습니다:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPerformanceDetails();
  }, [prfId]);

  const handleReviewSubmit = async (reviewData: { prfnm: string; pf_id: string; title: string; content: string; rating: number }) => {
    if (prfId) {
      try {
        await createReview(reviewData, 'your-access-token-here'); // Replace with actual access token
        // Refresh the performance details after review submission
        const updatedData = await getDetails(prfId);
        setPerformanceData(updatedData);
        setShowOffCanvas(false); // Close the OffCanvas
      } catch (error) {
        console.error('리뷰 등록에 실패했습니다:', error);
      }
    }
  };

  const handleWriteReviewClick = () => {
    if (hasReview) {
      if (window.confirm('There is already a review for the performance. Do you want to edit it?')) {
        setShowOffCanvas(true);
      }
    } else {
      setShowOffCanvas(true);
    }
  };

  const handleCloseOffCanvas = () => {
    setShowOffCanvas(false);
  };

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (!performanceData) {
    return <div>No data found for this performance.</div>;
  }

  const performance = performanceData.performance;

  const getBgType = (rating: number) => {
    if (rating >= 9) {
      return 'primary';
    } else if (rating >= 7) {
      return 'success';
    } else if (rating >= 4) {
      return 'warning';
    } else {
      return 'danger';
    }
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "공연중":
        return "primary";
      case "공연완료":
        return "secondary";
      default:
        return "light";
    }
  };

  return (
    <Container>
      <PerformanceSection>
        <Title>{performance.prfnm}</Title>
        <ContentWrapper>
          <Poster src={performance.poster} alt={performance.prfnm} />
          <InfoWrapper>
            <InfoItem>
              <Key>장르:</Key> {performance.genrenm}
            </InfoItem>
            <InfoItem>
              <Key>공연 시작일:</Key> {performance.prfpdfrom}
            </InfoItem>
            <InfoItem>
              <Key>공연 종료일:</Key> {performance.prfpdto}
            </InfoItem>
            <InfoItem>
              <Key>공연 여부: </Key>
              <Badge bg={getBadgeVariant(performance.prfstate)}>
                {performance.prfstate}
              </Badge>
            </InfoItem>
            <InfoItem>
              <Key>평균 평점: </Key> 
              <Badge bg={getBgType(performance.rating_avg)}>
                {performance.rating_avg}
              </Badge>
            </InfoItem>
          </InfoWrapper>
        </ContentWrapper>
      </PerformanceSection>
      <ReviewsSection>
        <ReviewsHeader>
          <Subtitle>관람 후기</Subtitle>
          <Button onClick={handleWriteReviewClick}>
            후기 작성
          </Button>
        </ReviewsHeader>
        <Divider />
        {performanceData.reviews?.data && performanceData.reviews.data.length > 0 ? (
          performanceData.reviews.data.map((review: any) => {
            const formattedRating = review.rating.toFixed(1);
            return (
              <ReviewCard
                key={review.review_id}
                title={review.title}
                rating={formattedRating}
                content={review.content}
                performanceTitle={`${review.user_nickname} | ${new Date(review.created_at).toLocaleDateString()}`}
                bgType={getBgType(review.rating)}
                showKebab={false}
              />
            );
          })
        ) : (
          <p>후기가 없습니다.</p>
        )}
      </ReviewsSection>
      <OffCanvas
        show={showOffCanvas}
        onHide={handleCloseOffCanvas}
        onSubmit={handleReviewSubmit}
        performance={{ prfnm: performance.prfnm, pf_id: prfId || '' }} // Ensure prfId is a string
      />
    </Container>
  );
};

// Styled Components (unchanged)
const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const PerformanceSection = styled.section`
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 60%;
  margin-left: 30px;
`;

const InfoItem = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const Key = styled.span`
  font-weight: bold;
`;

const Poster = styled.img`
  max-width: 200px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

const ReviewsSection = styled.section`
  margin-top: 20px;
`;

const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.hr`
  margin: 20px 0;
  border: 0;
  border-top: 1px solid #ddd;
`;

export default Detail;