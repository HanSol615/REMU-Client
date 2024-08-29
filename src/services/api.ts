// src/services/api.ts
import { JoinData, LoginData, LoginResponse } from '../models/user.model';
import { httpClient } from './http';

// 회원가입
export const join = async (data: JoinData) => {
  const response = await httpClient.post('/auth/join', data);
  return response.data;
};

// 로그인
export const login = async (data: LoginData) => {
  const response = await httpClient.post<LoginResponse>('/auth/login', data);
  return response.data;
};
  
// 비밀번호 변경
export const changePassword = async (data: { currentPassword: string; newPassword: string, confirmPassword: string }, accessToken: string) => {
  const response = await httpClient.patch('/auth/password', data, {
    headers: { Authorization: `${accessToken}` },
  });
  return response.data;
};
  
// 로그아웃
export const logout = async () => {
  const response = await httpClient.post('/auth/logout');
  return response.data;
};

// 회원 탈퇴
export const deleteAccount = async () => {
  const response = await httpClient.delete('/auth/account/');
  return response.data;
};

// 검색 결과 조회
export const getSerchResult = async (text: string, category: string, page: number) => {
  const response = await httpClient.get('/search', {
    params: {
      text,
      category,
      page,
    },
  });
  return response.data;
};

// 공연 상세 정보 조회
export const getDetails = async (prfId: string) => {
  const response = await httpClient.get('/detail', {
    params: {
      prfId
    },
  });
  return response.data;
};

// 사용자 정보 조회
export const getUserInfo = async (accessToken: string) => {
  const response = await httpClient.get('/user/info', {
    headers: { Authorization: `${accessToken}` },
  });
  return response.data;
};

// 사용자 리뷰 조회
export const getUserReviews = async (accessToken: string) => {
  const response = await httpClient.get('/user/reviews', {
    headers: { Authorization: `${accessToken}` },
  });
  return response.data;
};

// 사용자 정보 업데이트
export const updateUserInfo = async (data: { nickname: string; email: string }, accessToken: string) => {
  const response = await httpClient.patch('/user', data, {
    headers: { Authorization: `${accessToken}` },
  });
  return response.data;
};

// 리뷰 등록
export const createReview = async (data: {prfnm: string, pf_id: string, title: string, content: string, rating: number}, accessToken: string) => {
  const response = await httpClient.post('/review/addition', data, {
    headers: { Authorization: `${accessToken}` },
  });
  return response.data;
};

// 리뷰 수정
export const updateReview = async (id: number, reviewData: { title: string; content: string; rating: number }, accessToken: string) => {
  const response = await httpClient.put(`/review/${id}`, reviewData, {
    headers: { Authorization: `${accessToken}` },
  });
  return response.data;
};

// 리뷰 삭제
export const deleteReview = async (id: number, accessToken: string) => {
  const response = await httpClient.delete(`/review/${id}`, {
    headers: { Authorization: `${accessToken}` },
  });
  return response.data;
};