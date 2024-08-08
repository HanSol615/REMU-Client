// src/pages/Search.tsx
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import BasicButtonExample from '../components/Dropdown';
import NewPerformCard from '../components/NewPerformCard';
import { getSerchResult } from '../services/api';
import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the interface for search results
interface SearchResult {
  pf_id: string; // or number, depending on your data
  poster: string;
  prfnm: string;
  rating: string; // Assuming 'rating' is part of the result
}

const Search: React.FC = () => {
  const location = useLocation();
  const { searchText, category: initialCategory, response: initialResponse } = location.state;

  const [category, setCategory] = useState<string>(initialCategory);
  const [searchResults, setSearchResults] = useState<SearchResult[]>(initialResponse.performance_results);
  const [page, setPage] = useState<number>(initialResponse.page);
  const [lastPage, setLastPage] = useState<boolean>(initialResponse.last_page);

  const handleCategoryChange = async (newCategory: string) => {
    setCategory(newCategory);
    const response = await getSerchResult(searchText, newCategory === 'all' ? '' : newCategory, 1);
    setSearchResults(response.performance_results);
    setPage(response.page);
    setLastPage(response.last_page);
  };

  const handlePageChange = async (newPage: number) => {
    const response = await getSerchResult(searchText, category === 'all' ? '' : category, newPage);
    setSearchResults(response.performance_results);
    setPage(response.page);
    setLastPage(response.last_page);
  };

  const renderPagination = () => {
    const pages = [];

    // Handle previous page button
    if (page > 1) {
      pages.push(
        <Pagination.Prev key="prev" onClick={() => handlePageChange(page - 1)} />
      );
    }

    // Handle double arrows for moving to the first page
    if (page > 2) {
      pages.push(
        <Pagination.Item key="double-prev" onClick={() => handlePageChange(1)}>
          &laquo;&laquo;
        </Pagination.Item>
      );
    }

    // Show current page
    pages.push(
      <Pagination.Item key="current" active>
        {page}
      </Pagination.Item>
    );

    // Handle next page button
    if (!lastPage) {
      pages.push(
        <Pagination.Next key="next" onClick={() => handlePageChange(page + 1)} />
      );
    }

    // Handle single arrows if there's no next page
    if (page > 1 && lastPage) {
      pages.push(
        <Pagination.Item key="single-prev" onClick={() => handlePageChange(page - 1)}>
          &laquo;
        </Pagination.Item>
      );
    }

    return pages;
  };

  return (
    <Container>
      <Content>
        <Header>
          <Title>"{searchText}"에 대한 검색 결과</Title>
          <BasicButtonExample onSelect={handleCategoryChange} />
        </Header>
        {searchResults.length === 0 ? (
          <NoResults>
            <p>No search results found.</p>
          </NoResults>
        ) : (
          <ResultsContainer>
            {searchResults.map((result: SearchResult) => (
              <NewPerformCard 
                key={result.pf_id} 
                poster={result.poster} 
                title={result.prfnm} 
                rating={result.rating} // Include the rating if it's part of the result
              />
            ))}
          </ResultsContainer>
        )}
      </Content>
      {searchResults.length > 0 && (
        <PaginationWrapper>
          <Pagination>
            {renderPagination()}
          </Pagination>
        </PaginationWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
  height: 100vh; /* Full viewport height */
  padding: 20px;
  overflow: auto; /* Allow scrolling if content overflows */
`;

const Content = styled.div`
  flex: 1; /* Allow this to take up available space */
  width: 100%;
  overflow: auto; /* Allow scrolling within content area if needed */
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align header items to the left */
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2rem; /* Increase font size */
  font-weight: bold; /* Make font thicker */
  margin-bottom: 10px;
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Only one card per row */
  gap: 20px;
  width: 100%;
`;

const NoResults = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  color: #888;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default Search;