export function setupGallery(projects) {
  const dialog = document.querySelector("#repair-photo-dialog");
  const fullPhoto = dialog.querySelector("img");
  const title = dialog.querySelector("h3");
  let selectedProject = null;
  const setButtons = (parent, state) =>
    parent
      .querySelectorAll("[data-state]")
      .forEach((button) =>
        button.setAttribute(
          "aria-pressed",
          String(button.dataset.state === state),
        ),
      );
  const showDialogState = (state) => {
    fullPhoto.src = selectedProject[state];
    fullPhoto.alt = selectedProject[state + "Alt"];
    title.textContent =
      selectedProject.title + " · " + (state === "before" ? "Before" : "After");
    setButtons(dialog, state);
  };
  document.querySelectorAll("[data-project]").forEach((card) => {
    const project = projects[Number(card.dataset.project)];
    let state = "after";
    const img = card.querySelector("img");
    const opener = card.querySelector(".project-photo");
    card.querySelectorAll("[data-state]").forEach((button) =>
      button.addEventListener("click", () => {
        state = button.dataset.state;
        img.src = project[state];
        img.alt = project[state + "Alt"];
        card.querySelector(".project-photo-label").textContent =
          state === "before" ? "Before" : "After";
        opener.setAttribute(
          "aria-label",
          "Enlarge " + project.title + " " + state + " photo",
        );
        setButtons(card, state);
      }),
    );
    opener.addEventListener("click", () => {
      selectedProject = project;
      showDialogState(state);
      dialog.showModal();
      document.body.classList.add("photo-dialog-open");
    });
  });
  dialog
    .querySelectorAll("[data-state]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        showDialogState(button.dataset.state),
      ),
    );
  dialog
    .querySelector(".photo-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () =>
    document.body.classList.remove("photo-dialog-open"),
  );
}
