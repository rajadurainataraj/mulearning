import * as React from "react";
import { Button, Typography } from "@mui/material";

const ExperiencePopup = ({ values, onClose }) => {
  const [total, setTotal] = React.useState(
    values.reduce((acc, val) => acc + val, 0)
  );

  const handleIncrement = (index) => {
    const newValues = [...values];
    newValues[index]++;
    setTotal(total + 1);
  };

  const handleDecrement = (index) => {
    if (values[index] > 0) {
      const newValues = [...values];
      newValues[index]--;
      setTotal(total - 1);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      {values.map((value, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <Typography>{`Experience ${index + 1}`}</Typography>
          <div>
            <Button onClick={() => handleDecrement(index)}>-</Button>
            <Typography style={{ margin: "0 8px" }}>{value}</Typography>
            <Button onClick={() => handleIncrement(index)}>+</Button>
          </div>
        </div>
      ))}
      <Typography>Total: {total}</Typography>
      <Button onClick={onClose} style={{ marginTop: "16px" }}>
        Close
      </Button>
    </div>
  );
};

export default ExperiencePopup;
