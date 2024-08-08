// src/pages/main.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputSizesExample from '../components/searchField'; 
import { getSerchResult } from '../services/api'; // Import the API function
import LogoImg from '../assets/logo.png'

const Main: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const navigate = useNavigate();

  const handleSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchText.trim()) {
      const category = "";
      const page = 1;

      // Send the request to the server
      const response = await getSerchResult(searchText, category, page);

      // Navigate to the search page, passing the search text and response
      navigate('/search', { state: { searchText, category, response } });
    }
  };

  return (
    <Container>
      <LogoSection>
        <Logo src={LogoImg} alt="Logo" />
      </LogoSection>
      <Search>
        <InputSizesExample onKeyDown={handleSearch} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      </Search>
      <AuthLink>
        <Link onClick={() => navigate('/auth/login')}>로그인</Link>
        <Link onClick={() => navigate('/auth/login')}>회원가입</Link>
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