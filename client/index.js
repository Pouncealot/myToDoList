function registerButtonHandler() {
  document.getElementById("AddTodo").onclick = () => {
    let data = {
      todos: [{ task: "Finish Project", id: "testid123", done: false }],
    };

    let stringified = JSON.stringify(data);
    console.log("stringifed", stringified);

    fetch("http://localhost:8000/todo/new", {
      method: "POST",
      body: stringified,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("clicked");
  };
}

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    registerButtonHandler();
  }
};
//https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
