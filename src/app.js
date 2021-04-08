import { elementOpen, elementClose, text, patch } from "./idom.js";

function render(data) {
  elementOpen("div");
  {
    elementOpen("input");
    elementClose("input");
  }
  elementClose("div");
  elementOpen("ul");
  {
    for (let i = 0; i < data.amount; i++) {
      elementOpen("li");
      {
        elementOpen("span");
        {
          text(i.toString());
        }
        elementClose("span");
      }
      elementClose("li");
    }
  }
  elementClose("ul");
}

document.addEventListener("DOMContentLoaded", () => {
  const data = {
    amount: 0,
  };

  patch(document.body, render, data);

  document.querySelector("input").addEventListener("input", (e) => {
    const amount = parseInt(e.target.value);
    if (isNaN(amount)) {
      return;
    }

    data.amount = amount;
    patch(document.body, render, data);
  });
});
