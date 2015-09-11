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

function Todo ( value ) {
	this.value = value;
};

var todoApp = {
	list_of_todos: [],
	make_new_todo: function() {
		var new_task = document.getElementById('newTask');
		var currentTodo = new Todo(new_task.value);
		todoApp.add_new_todo(currentTodo);
	},
	add_new_todo: function(todo) {
		todoApp.list_of_todos.push(todo);
	},
	show_todos: function() {
		console.log(this.list_of_todos);
	},
	init: function() {
		var addTodoButton = document.getElementById('addTodoBtn');
		addTodoButton.addEventListener('click', todoApp.make_new_todo, false);
	}
};

document.onload = todoApp.init();
