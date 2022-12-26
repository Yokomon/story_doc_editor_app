import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import CardComponent from "./components/CardComponent";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#8f8f8fba",
    margin: 0,
    height: "100vh",
    textAlign: "center",
  },
  appContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
  },
  title: {
    margin: 0,
    padding: "20px",
  },
}));

const App = () => {
  const [cards, setCards] = useState([
    { id: 1, text: "Favorite" },
    { id: 2, text: "Piechart" },
    { id: 3, text: "Thumbup" },
  ]);

  const classes = useStyles();
  const moveCard = (fromIndex, toIndex) => {
    const updatedCards = [...cards];
    const [removedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, removedCard);
    setCards(updatedCards);
  };

  const handleDragOver = (e) => {
    // Prevent default behavior (prevent file from being opened)
    e.preventDefault();
  };

  const handleDrop = (e) => {
    // Prevent default behavior (prevent file from being opened)
    e.preventDefault();

    // Get the card index and index that were transferred during the drag operation
    const cardIndex = e.dataTransfer.getData("cardIndex");

    // Find the index of the card being dropped
    const dropIndex = e.target.getAttribute("data-index");

    // Move the card to the new position
    moveCard(cardIndex, dropIndex);
  };

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>Story_Doc Assessment</h3>
      <div className={classes.appContainer}>
        {cards.map((card, index) => (
          <CardComponent
            id={card.id}
            text={card.text}
            index={index}
            key={card?.id}
            className="card-container"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            data-index={index}
            moveCard={moveCard}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
