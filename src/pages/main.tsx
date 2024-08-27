import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import InputSizesExample from '../components/searchField'; 
import { getSerchResult, logout } from '../services/api';
import LogoImg from '../assets/logo.png';

const Main: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  const performSearch = async () => {
    if (searchText.trim()) {
      const category = "";
      const page = 1;

      const response = await getSerchResult(searchText, category, page);
      navigate('/search', { state: { searchText, category, response } });
    }
  };

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const handleSearchButtonClick = () => {
    performSearch();
  };

  const handleLogout = async () => {
    if (localStorage.accessToken && window.confirm('로그아웃 하시겠습니까?')) {
      try {
        const response = await logout();
        alert(response.message);
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
      } catch (error) {
        console.error('로그아웃에 실패하였습니다.:', error);
      }
    }
  };


  return (
    <Container>
      <LogoSection>
        <Logo src={LogoImg} alt="Logo" />
      </LogoSection>
      <Search>
        <SearchContainer>
          <InputSizesExample 
            onKeyDown={handleSearch} 
            value={searchText} 
            onChange={(e) => setSearchText(e.target.value)} 
          />
          <Button
            variant="primary"
            onClick={handleSearchButtonClick}
            style={{ marginLeft: '10px', fontSize: '1rem' }}
          >
            search
          </Button>
        </SearchContainer>
      </Search>
      <AuthLink>
        {isLoggedIn ? (
          <Link onClick={handleLogout}>로그아웃</Link>
        ) : (
          <>
            <Link onClick={() => navigate('/auth/login')}>로그인</Link>
            <Link onClick={() => navigate('/auth/signup')}>회원가입</Link>
          </>
        )}
      </AuthLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Logo = styled.img`
  width: 300px;
  height: auto;
  margin-bottom: 30px;
`;

const Search = styled.div`
  width: 500px;
`;

const SearchContainer = styled.div`
  display: flex;
`;

const AuthLink = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const Link = styled.div`
  cursor: pointer;
  color: #007bff;
  text-decoration: underline;
`;

export default Main;