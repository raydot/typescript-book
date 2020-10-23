console.log("TodoIt")

let todoList: string[] = [];
console.log("Current todo list:", todoList)

/**
 * It is really important to understand that this safety 
 * only exists at compile time. Once the JavaScript version 
 * of the code executes in the web browser, those restrictions 
 * don't apply anymore, and TypeScript can't help you. 
 */

 // Typescript includes type definitions for some standard
 // libraries, including the DOM API.

 // 'as' is the cast operator.
 const todoInput : HTMLInputElement= document.getElementById('todoInput') as HTMLInputElement


function addTodo(): void { // void, as in don't expect to get anything back
  // if we don't have any input
  if (todoInput == null)
 {
   console.error('The todo input is missing!')
   return
 }

 // get the value from input
 const newTodo: string = todoInput.value

 // verify that there is text
 if ('' !== newTodo.trim()) {
   /**
    * Always put the safe part of the check on the left ('').  Calling trim() 
    * on newTodo could trigger an error -- for example, if it was null.
    */
   console.log('Adding todo:', newTodo)

   // add the new item to the list
   todoList.push(newTodo)
   console.log('New todo list:', todoList)

   // clear the input
   todoInput.value = ''

   // keep the list sorted
   todoList.sort()

   // update the todo list
   updateTodoList()

   //apply the todo list filter
   filterTodoList()
 }
}

const todoListDiv: HTMLDivElement = document.getElementById('todoListContainer') as HTMLDivElement

function updateTodoList(): void {
  console.log('Updating the rendered todo list');
  todoListDiv.innerHTML ='';
  todoListDiv.textContent = '' // Thanks IE!

  const ul = document.createElement('ul');
  ul.setAttribute('id', 'todoList');
  todoListDiv.appendChild(ul);

  todoList.forEach(item => { // what we pass to the forEach function is a function.
    // "Fat arrow" functions are more generally called "lambda functions" or "lambda expressions."
    // Or even just plain "lambdas."
    // Never forget: in javaScript, functions are first-class citizens!
    // Typescript will convert this lambda expression to an anonymous function declaration.
    // This keeps the code compatible with older environments.
    const li = document.createElement('li');
    li.setAttribute('class', 'todo-list-item');
    li.innerHTML = ("<a href='#' onclick='removeTodoListItem(" + `"${item}"` + ")'>" + `${item}` + "</a>");
    ul.appendChild(li)
  })
}

function filterTodoList() : void {
  console.log("Filtering the rendered todo list")

  const todoListHtml: HTMLUListElement = document.getElementById('todoList') as HTMLUListElement;

  if (todoListHtml === null) {
    console.log("Nothing to filter")
    return
  }

  const todoListFilter = document.getElementById('todoFilter') as HTMLInputElement;
  const todoListFilterText = todoListFilter.value.toUpperCase()

  todoListHtml.childNodes.forEach((item) => {
    let itemText: string | null = item.textContent;
    if (itemText !== null) {
      itemText = itemText.toUpperCase()
      if(itemText.startsWith(todoListFilterText)) { 
        // oops, startsWith doesn't exist until ES2015 and we're targeting ES5.  What to do?
        (item as HTMLLIElement).style.display = "list-item"
      } else {
        (item as HTMLLIElement).style.display = "none"
      }
    }
  })
}

function removeTodoListItem(itemToRemove: string): void {
  console.log("item to remove:", itemToRemove);

    // it is much safer to create a brand new array than to mutate an existing one
    // Also, it helps with things like redux.
  todoList = todoList.filter((value: string, _index, _array) => {//  _ because we don't really care
    if (value === itemToRemove) {
      return false;
    }
    return true;
  });
  // splice is slower, creates garbage, and is error-prone
  // unsafe alternative: todoList.splice(...)

  // update the todolist
  updateTodoList();

  // apply the todolist filter
  filterTodoList;
}