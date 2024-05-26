import React from "react";
import { Card } from "@mui/material";


const CardComponents = ({ viewMode, content, detailHeight }) => {
  return (
    <Card
      sx={{
        height: detailHeight
          ? "250px"
          : viewMode === "list"
          ? "200px"
          : "350px",
        marginBottom: "1,5rem",
      }}
      variant="outlined"
    >
      {content}
    </Card>
  );
};

export default CardComponents;
