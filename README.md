# myToDoList

myToDoList
This was created during my time as a student at Code Chrysalis

This is a shared todo list service that implements the toDo List API.

The user can do the following things:

GET
get list of items /items
Example Response:
[{id: "id1", task: "Get Bananas", done: false}, {id:"id2", "task: "finish API", done: false"}]

POST
add things to the list /item/new
Example Request:
{todos: [{task: "new toDo List Item", done: false}]}

Example Response: {id: "id3", task: "new toDo List Item", done: false}
PATCH
modify the task/done status of the items with a given id /items/update

Example Request: [{id: "id4", task: "new toDo List Item", done: true},{id: "id5", task: "new toDo List Item", done: true}]

if the id doesn't exist, PATCH will return status code 500

if it succeeded, PATCH will return status code 200

DELETE
delete items with a given id from the list /items/delete
Example Request: ["id1", "id2", "id3"]
if the id doesn't exist DELETE will return status code 500
if the delete is successful, DELETE will return status code 200
