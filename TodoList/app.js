const addForm = document.querySelector('.add');
const ullist = document.querySelector('.todos');
const search = document.querySelector('.search input');
// const delete = document.querySelector(".delete");

console.log(ullist);
// li template generator 
const generateTemplate = (todo) => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete">
    </i>
    `;
    ullist.innerHTML += html;
};

addForm.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(addForm.add.value);
    // const li = document.createElement('li');
    let todo = addForm.add.value.trim();
    // ullist.prepend(li);
    if (todo.length) {
        generateTemplate(todo);
        addForm.reset();
    } else {
        alert('please enter something')
    }
});

// using event delegation to delete todos
ullist.addEventListener('click', e => {
    // console.log(e.target);
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
});



// filter and search logic
const filterTodos = (term) => {
    //filter words that doesnt include the word, add a filtered class to them to remove them from the list
    Array.from(ullist.children).filter((todoItem) => {
        return !todoItem.textContent.toLowerCase().includes(term);
        // console.log(todoItem.textContent);
        // return true;
    }).forEach(todoItem => {
        todoItem.classList.add('filtered');
    });
    // // shorter syntax:
    // Array.from(ullist.children)
    //     .filter((todoItem) => !todoItem.textContent.includes(term))
    //     .forEach((todoItem) => todo.classList.add('filtered'));
  
    // remove filtered when the word is in the text
    Array.from(ullist.children).filter((todoItem) => {
        return todoItem.textContent.toLowerCase().includes(term);
    }).forEach(todoItem => {
        todoItem.classList.remove('filtered');
    });
};


//keyup event 
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    // console.log(term);
    filterTodos(term);
    // Array.from(ullist.children).forEach(todoItem=>{
    //     if(todoItem.classList.contains('filtered')){
    //         todoItem.hide();
    //     }
    // });

});
