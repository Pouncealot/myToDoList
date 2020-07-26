let todoList;

async function loadTodos() {
    const response = await fetch("http://localhost:8000/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();
    const todos = data.todos;

    todoList = todos;
    const list = document.getElementById("TodoList");

    todos.forEach((todo)=>{
      const newRow = document.createElement("tr");

      taskData = document.createElement("td");
      taskData.textContent = todo.todo_task;
      newRow.appendChild(taskData);

      completedData = document.createElement("td");
      if(todo.completed){
        completedData.textContent = "Completed";
      } else {
        completedData.textContent = "Incomplete";
      }
      newRow.appendChild(completedData);


      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => {
        fetch("http://localhost:8000/todo/delete", {
          method: "DELETE",
          body: JSON.stringify({ ids: [todo.todo_id]}),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }


      newRow.appendChild(deleteButton);
      list.appendChild(newRow);
    })
}

function registerAddTodoHandler() {
  const form = document.getElementById("AddTodo");
  form.onsubmit = (event) => {
    // event.preventDefault();

    const task = document.getElementById("NewTask").value;

    let data = {
      todos: [{ task, completed: false , duedate: new Date()}],
    };

    fetch("http://localhost:8000/todo/new", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

  };
}

function registerDeleteTodosHandler(){

}

document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    loadTodos();
    registerAddTodoHandler();
    registerDeleteTodosHandler()
  }
};
//https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
