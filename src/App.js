import { useState } from "react";
import CardComponent from "./components/CardComponent";

const App = () => {
  const [cards, setCards] = useState([
    { id: 1, text: "Favorite" },
    { id: 2, text: "Piechart" },
    { id: 3, text: "Thumbup" },
  ]);

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
    <div
      style={{
        backgroundColor: "#8f8f8fba",
        margin: 0,
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          margin: 0,
          padding: "20px",
        }}
      >
        Story_Doc Assessment
      </h3>
      <div
        className="app"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
