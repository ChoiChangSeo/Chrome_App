const toDoForm = document.getElementById("todo-form")
const toDoInput = document.querySelector("#todo-form input")
const toDoList = document.getElementById("todo-list")

const TODOS_KEY = "todos"

let toDo = []

const saveToDos = () => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDo))
}

const deleteToDo = (event) => {
    const li = event.target.parentElement
    li.remove()
    toDo = toDo.filter((el) => el.id !== parseInt(li.id))
    saveToDos()
}

const paintToDo = (newTodo) => {
    const li = document.createElement("li")
    li.id = newTodo.id
    const span = document.createElement("span")
    span.innerText = newTodo.text
    const delButton = document.createElement("button")
    delButton.innerText = "❌"
    delButton.addEventListener("click", deleteToDo)
    li.appendChild(span)
    li.appendChild(delButton)
    toDoList.appendChild(li)
}

const toDoSubmit = (event) => {
    event.preventDefault()
    const newTodo = toDoInput.value
    toDoInput.value = ""
    const newTodoObj = {
        text : newTodo,
        id : Date.now(),
    }
    toDo.push(newTodoObj)
    paintToDo(newTodoObj)
    saveToDos()
}

toDoForm.addEventListener("submit", toDoSubmit)

const savedToDos = localStorage.getItem(TODOS_KEY)

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos)
    toDo = parsedToDos
    parsedToDos.forEach(paintToDo)
}
