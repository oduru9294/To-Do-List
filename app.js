// CODE EXPLAINED

// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById('input');

// Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

//get item from local storage
let data = localStorage.getItem("TODO");

//check if the data is not empty
if(data){
  LIST = JSON.parse(data);
  id = LIST.length;
  loadlist(LIST);
}else{
  //if data is not empty
  LIST = [];
  id = 0;
}

//load items to the user interface
function loadList(array){
  array.forEach(function(item){
    addToDo(item.name, item.id, item.done, item.trash);
  });

}

// clear the local storage
clear.addEventListener("click", function(){
  localStorage.clear();
  localStorage.reload();
});
// Show  today dateElement
const option = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);


// add To-Do Function
function addToDo(toDo, id, done, trash)
{
  if(trash) {return;}

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";


  const item = '
      <li class= "item">
      <i class= "fa ${DONE} co" job="complete" id="${}"></i>
      <p class="text ${LINE}"">${toDo}</p>
      <li class="fa fa-trash-o de" job="delete" id="${}"></li>
      </li>
      ';

  const position = beforeend;

  list.insertAdjacentHTML(position, item);
}

addToDo("drink coffe");

//add item to the list use Enter Key
document.addEventListener("keyup", function(even){
  if(event.keycode == 36){
    const toDo = input.value;
    // if the input isn't empty
    if (toDo){
        addToDo(toDo);

        LIST.push({
          name : toDo,
          id : id,
          done: false,
          trash: false
        })
        //add item from local storage (THIS MUST BE ADDED EVERYWHERE THAT WE UPDATE OUR LIST ARRAY)
        localStorage.setiItem("TODO", JSON.stringify(LIST));
        id++;
    }
    input.value = "";
  }
});

addToDo("Coffe", 1, true, false);

// complete to do

function completeToDo(element){
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

//target the items that created dynamically
list.addEventListener("click", function(event){
  const element = event.target; // return the clicked element inside List
  const elementJob = event.attribute.job.value; // complete or delete

  if (elementJob == "complete"){
    completeToDo(element);
  }else if(elementJob == "delete"){
    removeToDo(element);
  }

  //add item from local storage (THIS MUST BE ADDED EVERYWHERE THAT WE UPDATE OUR LIST ARRAY)
  localStorage.setiItem("TODO", JSON.stringify(LIST));
});
