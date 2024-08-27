import React, { useState } from 'react';
import { Form, Offcanvas, Button } from 'react-bootstrap';

interface OffCanvasProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (reviewData: { prfnm: string; pf_id: string; title: string; content: string; rating: number }) => void;
  performance: { prfnm: string; pf_id: string };
}

const OffCanvas: React.FC<OffCanvasProps> = ({ show, onHide, onSubmit, performance }) => {
  const [value, setValue] = useState<number>(2);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value, 10));
  };

  const handleSubmit = () => {
    const reviewData = {
      prfnm: performance.prfnm,
      pf_id: performance.pf_id,
      title,
      content,
      rating: value,
    };
    onSubmit(reviewData);
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="bottom" style={{ height: '50%' }}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>후기 작성</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <>
          <Form.Label>평점: {value}</Form.Label>
          <Form.Range
            value={value}
            onChange={handleRangeChange}
            min={1}
            max={10}
          />
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button onClick={handleSubmit}>완료</Button>
        </>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffCanvas;