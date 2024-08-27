// src/pages/mypage.tsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserInfo, updateUserInfo, changePassword, logout, deleteAccount, getUserReviews, deleteReview } from '../services/api'; // Import deleteReview
import styled from 'styled-components';
import CustomTabs from '../components/Tabs';
import ReviewCard from '../components/ReviewCard';

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{ nickname: string; email: string } | null>(null);
  const [newNickname, setNewNickname] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [userReviews, setUserReviews] = useState<any[]>([]);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        try {
          const { nickname, email } = await getUserInfo(accessToken);
          setUserData({ nickname, email });
          setNewNickname(nickname);
          setNewEmail(email);

          const response = await getUserReviews(accessToken);
          const reviews = response.reviews;
          setUserReviews(reviews);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };

    fetchData();
  }, [accessToken]);

  const handleUpdateInfo = async () => {
    if (accessToken) {
      try {
        const response = await updateUserInfo({ nickname: newNickname, email: newEmail }, accessToken);
        alert(response.message);
      } catch (error) {
        console.error('Failed to update user info:', error);
      }
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== newPasswordConfirm) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setPasswordError(null);

    if (accessToken) {
      try {
        const response = await changePassword(
          {
            currentPassword: currentPassword,
            newPassword: newPassword,
            confirmPassword: newPasswordConfirm
          },
          accessToken
        );
        alert(response.message);
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        }
      }
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  const handleLogout = async () => {
    if (accessToken && window.confirm('로그아웃 하시겠습니까?')) {
      try {
        const response = await logout();
        alert(response.message);
        localStorage.clear();
        sessionStorage.clear();
        navigate('/auth/login');
      } catch (error) {
        console.error('Failed to logout:', error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (accessToken && window.confirm('정말로 탈퇴하시겠습니까?')) {
      try {
        const response = await deleteAccount();
        alert(response.message);
        localStorage.clear();
        sessionStorage.clear();
        navigate('/auth/join');
      } catch (error) {
        console.error('Failed to delete account:', error);
      }
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (accessToken && window.confirm('이 리뷰를 삭제하시겠습니까?')) {
      try {
        await deleteReview(reviewId, accessToken);
        setUserReviews((prevReviews) => prevReviews.filter(review => review.review_id !== reviewId));
        alert('리뷰가 삭제되었습니다.');
      } catch (error) {
        console.error('Failed to delete review:', error);
      }
    }
  };


  const getBgType = (rating: number) => {
    if (rating >= 9) {
      return "primary";
    } else if (rating >= 7) {
      return "success";
    } else if (rating >= 4) {
      return "warning";
    } else {
      return "danger";
    }
  };
  
  const accountManagementContent = (
    <>
      <Section>
        <Subtitle>회원 정보</Subtitle>
        <Label>닉네임:</Label>
        <Input
          type="text"
          value={newNickname}
          onChange={(e) => setNewNickname(e.target.value)}
        />
        <Label>이메일:</Label>
        <Input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <UpdateButton onClick={handleUpdateInfo}>변경하기</UpdateButton>
      </Section>
      <Divider />
      <Section>
        <Subtitle>비밀번호 변경</Subtitle>
        <Label>현재 비밀번호:</Label>
        <Input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Label>새로운 비밀번호:</Label>
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Label>새로운 비밀번호 확인:</Label>
        <Input
          type="password"
          value={newPasswordConfirm}
          onChange={(e) => setNewPasswordConfirm(e.target.value)}
        />
        {passwordError && <ErrorText>{passwordError}</ErrorText>}
        <ChangePasswordButton onClick={handleChangePassword}>변경하기</ChangePasswordButton>
      </Section>
      <Divider />
      <Section>
        <Subtitle>계정 관리</Subtitle>
        <ButtonContainer>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          <DeleteAccountButton onClick={handleDeleteAccount}>회원 탈퇴</DeleteAccountButton>
        </ButtonContainer>
      </Section>
    </>
  );

  const userReviewsContent = (
    <Section>
      <Subtitle>나의 리뷰</Subtitle>
      {userReviews.length > 0 ? (
        <div>
          {userReviews.sort((a, b) => b.rating - a.rating).map((review) => {
            const formattedRating = parseFloat(review.rating).toFixed(1);
            return (
              <ReviewCard
                key={review.review_id}
                title={review.title}
                rating={formattedRating}
                content={review.content}
                performanceTitle={review.prfnm}
                bgType={getBgType(parseFloat(review.rating))}
                showKebab={true}
                onDelete={() => handleDeleteReview(review.review_id)} // Pass the handler to the component
              />
            );
          })}
        </div>
      ) : (
        <p>리뷰가 없습니다.</p>
      )}
    </Section>
  );
    
  return (
    <Container>
      <CustomTabs
        defaultActiveKey="account-management"
        tabs={[
          { eventKey: 'account-management', title: '계정 관리', content: accountManagementContent },
          { eventKey: 'my-reviews', title: '나의 리뷰', content: userReviewsContent }
        ]}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  margin-bottom: 15px;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const UpdateButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ChangePasswordButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: #fff;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #c82333;
  }
`;

const DeleteAccountButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #dc3545;
  color: #fff;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #c82333;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
`;

const Divider = styled.hr`
  border: 1px solid #ddd;
  margin: 20px 0;
`;

const ErrorText = styled.p`
  color: red;
`;

export default MyPage;