// src/components/Dropdown.tsx
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function BasicButtonExample({ onSelect }: { onSelect: (category: string) => void }) {
  return (
    <DropdownButton id="dropdown-basic-button" title="카테고리 선택">
      <Dropdown.Item onClick={() => onSelect('all')}>전체</Dropdown.Item>
      <Dropdown.Item onClick={() => onSelect('연극')}>연극</Dropdown.Item>
      <Dropdown.Item onClick={() => onSelect('무용')}>무용</Dropdown.Item>
      <Dropdown.Item onClick={() => onSelect('대중무용')}>대중무용</Dropdown.Item>
      <Dropdown.Item onClick={() => onSelect('서양음악')}>서양음악</Dropdown.Item>
      <Dropdown.Item onClick={() => onSelect('한국음악')}>한국음악</Dropdown.Item>
      <Dropdown.Item onClick={() => onSelect('대중음악')}>대중음악</Dropdown.Item>
      <Dropdown.Item onClick={() => onSelect('복합')}>복합</Dropdown.Item>
      <Dropdown.Item onClick={() => onSelect('서커스/마술')}>서커스/마술</Dropdown.Item>
      <Dropdown.Item onClick={() => onSelect('뮤지컬')}>뮤지컬</Dropdown.Item>
    </DropdownButton>
  );
}

export default BasicButtonExample;