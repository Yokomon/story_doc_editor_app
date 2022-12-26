import { createElement, useRef, useState } from "react";
import { Paper, Box, Fab } from "@mui/material";
import {
  Edit,
  Favorite,
  Cancel,
  Remove,
  Clear,
  Print,
  PieChart,
  ThumbUp,
} from "@material-ui/icons";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  cardBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    "& > :not(style)": {
      m: 1,
      width: 170,
      height: 230,
    },
  },
  paperCard: {
    padding: "10px",
  },
  printTitle: {
    display: "flex",
    justifyContent: "flex-end",
  },
  iconCard: {
    display: "flex",
    justifyContent: "center",
    margin: "0 0 20px",
  },
}));

export default function CardComponent({ id, index, text, ...props }) {
  const [icon, setIcon] = useState(text);
  const [, setIsDragging] = useState(false);
  const classes = useStyles();

  const handleDragStart = (e) => {
    // Set the data that will be transferred during the drag operation
    e.dataTransfer.setData("cardId", id);
    e.dataTransfer.setData("cardIndex", index);

    // Add a custom dragging class to the element
    e.target.classList.add("dragging");

    setIsDragging(true);
  };

  const handleDragEnd = (e) => {
    // Remove the dragging class from the element
    e.target.classList.remove("dragging");

    setIsDragging(false);
  };

  const generatePDF = () => {
    const element = document.querySelector(`#card_${id}`);
    const pdf = new JsPDF("p", "mm", "a4");

    html2canvas(element, { scale: 2 })
      .then((canvas) => {
        pdf.addImage(canvas, "JPEG", 0, 0, 211, 298);
      })
      .then(() => {
        pdf.save("section.pdf");
      });
  };

  const spanRef = useRef(null);

  function handleClick() {
    spanRef.current.contentEditable = true;
  }

  function handleBlur() {
    setIcon(spanRef.current.innerHTML);
  }
  return (
    <Box className={classes.cardBox} id={`card_${id}`}>
      <Paper {...props} elevation={3} className={classes.paperCard}>
        <div className={classes.printTitle}>
          <Fab size="small" onClick={generatePDF} type="button">
            <Print />
          </Fab>
        </div>
        <div
          className={classes.iconCard}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          id="report"
        >
          {
            {
              Edit: createElement(Edit),
              Favorite: createElement(Favorite),
              Cancel: createElement(Cancel),
              Remove: createElement(Remove),
              Clear: createElement(Clear),
              Piechart: createElement(PieChart),
              Thumbup: createElement(ThumbUp),
            }[icon]
          }
        </div>
        <span ref={spanRef} onClick={handleClick} onInput={handleBlur}>
          Insert text here
        </span>
        <p>Add here your additional text</p>
      </Paper>
    </Box>
  );
}
