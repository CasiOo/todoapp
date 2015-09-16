// Basic JS for creating TODO's
// Peanutt / Simon Jang

//Constructor for Firebase API
var myFirebaseRef = new Firebase("https://todoappjs.firebaseio.com/");
// todo constructor
function Todo ( value ) {
	this.value = value;
};

var todoApp = {
        // array with all the todos
	list_of_todos: [],
        /*
         * Makes a single todo
         */
	make_new_todo: function() {
		var new_task = document.getElementById('newTask');
		var currentTodo = new Todo(new_task.value);
		todoApp.add_new_todo(currentTodo);
		todoApp.todoToHTML(currentTodo);
		todoApp.saveTodo();
                new_task.value = "";
	},
        /*
         * 
         * @param {type} todo
         * adds a todo to the array with todos
         */
	add_new_todo: function(todo) {
		todoApp.list_of_todos.push(todo);
	},
        /*
         * Shows all the current todos
         * Currently not working when using with document.onload()! Gives an AJAX error
         */
	show_todos: function() {
		for ( var x = 0; x < todoApp.list_of_todos.length; x++) {                 
                    todoApp.todoToHTML(todoApp.list_of_todos[x]);
		}
	},
        /*
         * @param: todo ( Object )
         * Put a single todo on the page
         */
	todoToHTML: function(todo) {
		var todoItem = document.createElement("li");
		var todoItemText = document.createTextNode(todo.value);
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
		
		//edits the name of the todo
		var editTodoName = editBtn.addEventListener("click", function(){ 
			this.innerHTML="rename";
			var oldName = todo.value
			var renamingHTML = "<input type='text' id='renamingTextbox'></input><button id='renamingButton'>Rename</button>"
			this.parentNode.innerHTML=renamingHTML;
			document.getElementById('renamingTextbox').setAttribute("value",oldName);
			document.getElementById('renamingButton').onclick = function(){
				var newNameValue = document.getElementById('renamingTextbox').value;
				var newNameHTML = '<li><input type="checkbox">'+newNameValue+'<button class="edit">Edit</button><button class="delete">Delete</button></li>'
				this.parentNode.innerHTML=newNameHTML
				}
			})
		
		checkBox.setAttribute("type", "checkbox");
			
		todoItem.appendChild(checkBox);
		todoItem.appendChild(todoItemText);
		todoItem.appendChild(editBtn);
		todoItem.appendChild(deleteBtn);
			
		todoContainer.appendChild(todoItem);
	},
        /*
         * Initiates on page load. Binds eventhandlers to HTML elements
         */
	init: function() {
		var addTodoButton = document.getElementById('addTodoBtn');
		addTodoButton.addEventListener('click', todoApp.make_new_todo, false);
		todoApp.loadTodo();
		todoApp.show_todos();
	},
        // Saves the array with todos to Firebase in JSON format
	saveTodo: function() {
		for ( var x = 0; x < todoApp.list_of_todos.length; x++ ) {
			myFirebaseRef.set({
				todoList: todoApp.list_of_todos				
			});
		};
	},
        // Loads the JSON data and streams it to the array with all the todos
	loadTodo: function() {
		myFirebaseRef.on("value", function(snapshot) {
			var dataHandler = snapshot.val();
			todoApp.list_of_todos = dataHandler.todoList;
		});
	},
	edit_todo: function() {
		todoApp.list_of_todos.push(todo);
	},
};

document.onload = todoApp.init();
