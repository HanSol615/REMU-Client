import Pagination from 'react-bootstrap/Pagination';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdvancedExample() {
  return (
    <Pagination>
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Next />
    </Pagination>
  );
}

export default AdvancedExample;