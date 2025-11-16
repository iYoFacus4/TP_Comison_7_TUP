export const clearSession = () => {
  localStorage.removeItem("session");
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
