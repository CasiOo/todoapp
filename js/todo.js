list_of_todos = [];

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
