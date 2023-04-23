//remove
document.querySelector(".open-button").addEventListener("click", () => {modal.showModal()});

const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");

closeModal.addEventListener("click", () => {
  modal.close();
});
