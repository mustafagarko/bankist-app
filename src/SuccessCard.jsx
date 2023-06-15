import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const SuccessCard = ({ data, index, deleteEl }) => {
  return (
    <Card bg="green-500" text="white" style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{data?.amount}</Card.Title>
        <Card.Text>This is a success card component.</Card.Text>
        <button onClick={() => deleteEl(index)} variant="light">
          View Details
        </button>
      </Card.Body>
    </Card>
  );
};

export default SuccessCard;
