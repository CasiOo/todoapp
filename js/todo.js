/* Commenting this out for changes ( Peanutt / Simon Jang)
	Original code left untouched

var list_of_todos = [];

function add_new_todo()
{
    list_of_todos.push(make_new_todo());
}

function make_new_todo()
{
    var new_task = document.getElementById('newTask');
    var new_todo = {
        task: new_task.value,
        completed: false,
        priority: 0,
        due_date: Date(),
        tags: []
    }
    return new_todo;
}

function show_todos()
{
    console.log(list_of_todos);
}

*/

// Basic JS for creating TODO's
// Peanutt / Simon Jang

var myFirebaseRef = new Firebase("https://todoappjs.firebaseio.com/");

function Todo ( value ) {
	this.value = value;
};


var todoApp = {
	list_of_todos: [],
	make_new_todo: function() {
		var new_task = document.getElementById('newTask');
		var currentTodo = new Todo(new_task.value);
		todoApp.add_new_todo(currentTodo);
		todoApp.todoToHTML();
		todoApp.saveTodo();
	},
	add_new_todo: function(todo) {
		todoApp.list_of_todos.push(todo);
	},
	show_todos: function() {
		for ( var x = 0; x < todoApp.list_of_todos.length; x++) {
			var todoItem = document.createElement("li");
			var todoItemText = document.createTextNode(todoApp.list_of_todos[x].value);
			var todoContainer = document.getElementById("incompleteTasks");
			var checkBox = document.createElement("input");
			var editBtn = document.createElement("button");
			var deleteBtn = document.createElement("button");
			var editBtnText = document.createTextNode("Edit");
			var deleteBtnText = document.createTextNode("Delete");
			
			deleteBtn.setAttribute("class","delete");
			deleteBtn.appendChild(deleteBtnText);
			
			editBtn.setAttribute("class","edit");
			editBtn.appendChild(editBtnText);
			
			checkBox.setAttribute("type", "checkbox");
			
			todoItem.appendChild(checkBox);
			todoItem.appendChild(todoItemText);
			todoItem.appendChild(editBtn);
			todoItem.appendChild(deleteBtn);
			
			todoContainer.appendChild(todoItem);
		}
	},
	todoToHTML: function() {
		var todoItem = document.createElement("li");
		var todoItemText = document.createTextNode(todoApp.list_of_todos[0].value);
		var todoContainer = document.getElementById("incompleteTasks");
		var checkBox = document.createElement("input");
		var editBtn = document.createElement("button");
		var deleteBtn = document.createElement("button");
		var editBtnText = document.createTextNode("Edit");
		var deleteBtnText = document.createTextNode("Delete");
		
		deleteBtn.setAttribute("class","delete");
		deleteBtn.appendChild(deleteBtnText);
		
		editBtn.setAttribute("class","edit");
		editBtn.appendChild(editBtnText);
		
		checkBox.setAttribute("type", "checkbox");
			
		todoItem.appendChild(checkBox);
		todoItem.appendChild(todoItemText);
		todoItem.appendChild(editBtn);
		todoItem.appendChild(deleteBtn);
			
		todoContainer.appendChild(todoItem);
	},
	init: function() {
		var addTodoButton = document.getElementById('addTodoBtn');
		addTodoButton.addEventListener('click', todoApp.make_new_todo, false);
		todoApp.loadTodo();
		todoApp.show_todos();
	},
	saveTodo: function() {
		for ( var x = 0; x < todoApp.list_of_todos.length; x++ ) {
			myFirebaseRef.set({
				todo: {
					todoValue: todoApp.list_of_todos[x].value
				}
			});
		};
	},
	loadTodo: function() {
		myFirebaseRef.on("value", function(snapshot) {
			var dataHandler = snapshot.val();
			for ( var x = 0; x < dataHandler.todo.length; x++) {
				todoApp.list_of_todos[x] = dataHandler.todo[x];
				todoApp.list_of_todos[x].value = dataHandler.todo[x].value;
			}
		})
	}
	
	
};

document.onload = todoApp.init();
