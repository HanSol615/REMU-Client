import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

interface InputSizesExampleProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function InputSizesExample({ value, onChange, onKeyDown }: InputSizesExampleProps) {
  return (
    <Form.Control 
      size="lg" 
      type="text" 
      placeholder="공연명을 검색하세요." 
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown} 
    />
  );
}

export default InputSizesExample;