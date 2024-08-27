import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import BrandExample from './components/Navbar';
import GlobalStyle from './styles/GlobalStyle';

import Join from './pages/join';
import Login from './pages/login';
import Main from './pages/main';
import MyPage from './pages/mypage';
import Search from './pages/search';
import Detail from './pages/detail';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ConditionalNavbar>
        <Routes>
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/auth/join" element={<Join />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail" element={<Detail />}/>
        </Routes>
      </ConditionalNavbar>
    </BrowserRouter>
  );
};

const ConditionalNavbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const shouldShowNavbar = !['/auth/login', '/auth/join'].includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <BrandExample />}
      {children}
    </>
  );
};

export default App;