export const newCard = (data) => {
  return {
    type: "NEW_CARD",
    payload: data,
  };
};

export const deleteCard = (id) => {
  return {
    type: "DELETE_CARD",
    id,
  };
};
