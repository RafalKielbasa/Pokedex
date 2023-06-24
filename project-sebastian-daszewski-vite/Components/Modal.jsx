import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Modal = ({ setIsOpen, winnerName, handleRemoveBookmarkedPokemon }) => {
  const handleRemoveBookmark = () => {
    setIsOpen(false);
    handleRemoveBookmarkedPokemon();
  };

  return (
    <>
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">{winnerName}</h5>
          </div>

          <div className="modalActions">
            <div className="actionsContainer">
              <Link to={`/pokedex/1`}>
                <button className="deleteBtn" onClick={handleRemoveBookmark}>
                  Opuść arenę
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
