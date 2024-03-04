import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const DataCard = ({ data, onFeedbackSubmit }) => {
  const [rating, setRating] = useState(null);

  const handleRating = (value) => {
    setRating(value);

    onFeedbackSubmit({
      text: data.context,
      rating: value === 'thumbs-up' ? 'positive' : 'negative',
      index: data.index,
    });
  };

  const highlightText = (text, highlightedText) => {
    if (highlightedText && highlightedText.length > 0) {
      const wordsToHighlight = highlightedText.map(word => word.toLowerCase());
  
      const parts = text.split(new RegExp(`(${wordsToHighlight.join('|')})`, 'gi'));
  
      return (
        <span>
          {parts.map((part, index) =>
            wordsToHighlight.includes(part.toLowerCase().trim()) ? (
              <span key={index} style={{ backgroundColor: 'yellow' }}>
                {part}
              </span>
            ) : (
              <span key={index}>{part}</span>
            )
          )}
        </span>
      );
    }
    return <span>{text}</span>;
  };
  

  return (
    <>
    <Card>
      <Card.Body>
        <Row>
          <div className="col-8">
          <Card.Title>{data.Title}</Card.Title>
          </div>
          <div className="col-2">
            <Button
              variant={rating === 'thumbs-up' ? 'success' : 'outline-success'}
              onClick={() => handleRating('thumbs-up')}
              disabled={rating === 'thumbs-up'}
            >
              👍
            </Button>
          </div>
          <div className="col-2">
            <Button
              variant={rating === 'thumbs-down' ? 'danger' : 'outline-danger'}
              onClick={() => handleRating('thumbs-down')}
              disabled={rating === 'thumbs-down'}
            >
              👎
            </Button>
          </div>
        </Row>
        <Card.Text>{highlightText(data.Context, data.Highlights)}</Card.Text>
      </Card.Body>
    </Card>
    <div className='comment-box'>
      <p><b>Search Keyword : </b>{data.Key}</p>
    </div>
    </>
  );
};

export default DataCard;
