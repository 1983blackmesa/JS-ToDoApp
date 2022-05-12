const text = document.getElementById("text"); //get text id

const addTaskButton = document.getElementById("AddTask"); //get AddTask id from HTML
const saveTaskButton = document.getElementById("SaveTask"); //get SaveTask id from HTML
const listBox = document.getElementById("listBox"); //get ListBox id from HTML
const saveInd = document.getElementById("saveIndex"); //get saveIndex id from html

let todoAppArray = []; //initialize empty array

showTask();//call showTask function which will keep our data cached using localstorage
addTaskButton.addEventListener("click", (e) => {  //using ES6 arrow function
	
e.preventDefault(); //prevent page from loading	
	
	addtaskinputval = text.value;
	
	if(addtaskinputval.trim() !=0) {
	let mytodo = localStorage.getItem("mytodo"); //store to do array to localstorage on every change
	
	
	if(mytodo === null) {
		todoAppArray = []; //nothing in our list	
	}
	
	else {
	todoAppArray = JSON.parse(mytodo); 
	}
		
	//push newly added task to my array and store the whole array again in localstroage
	//const task = input.value; 
	todoAppArray.push(text.value);
	text.value = ""; //for errors
	
	localStorage.setItem("mytodo", JSON.stringify(todoAppArray)); //convert object to JSON String
	showTask(); // call showTask Function
	
	}
});

//create function for showTask

function showTask() {
	let mytodo = localStorage.getItem("mytodo"); //store to do array to localstorage on every change
	
	if(mytodo === null) {
		todoAppArray = []; //nothing in our list
	}
	
	else {
		todoAppArray = JSON.parse(mytodo); 
	}
	
	let html = "";
	todoAppArray.forEach((list, index) => {
	
		 html += `<tr>	 
		<td><p> ${list} </p> </td>
   <td><button onclick='editTodo(${index})' class='btn btn-primary'>Edit Task</button> </td>
   <td><button onclick='deletemyTodo(${index})' class='btn btn-danger'>Delete</button> </td>
   </tr>`;
	});
	
	listBox.innerHTML = html; //make the call to to do box
	
} //end function to todoDisplay

//delete all tasks to do

//Delete Function passing index
function deletemyTodo(index) {
	let mytodo = localStorage.getItem("mytodo"); //store to do array to localstorage on every change
	
	todoAppArray = JSON.parse(mytodo); 
	
	todoAppArray.splice(index, 1);//remove object at specificed index
	localStorage.setItem("mytodo", JSON.stringify(todoAppArray)); //store the change to localstorage
	showTask();//call display function to reflect changes
	
}


function editTodo(index) {
 saveInd.value = index;
 let mytodo = localStorage.getItem("mytodo"); //store to do array to localstorage on every change
 todoAppArray = JSON.parse(mytodo); 
 text.value = todoAppArray[index];
 addTaskButton.style.display = "none";
 saveTaskButton.style.display = "block";
}


saveTaskButton.addEventListener("click", () => {
 
 let mytodo = localStorage.getItem("mytodo"); //store to do array to localstorage on every change
 
todoAppArray = JSON.parse(mytodo);

 let id = saveInd.value;
 todoAppArray[id] = text.value;
 addTaskButton.style.display = "block";
 saveTaskButton.style.display = "none";
 text.value = ""; //avoid errors
 localStorage.setItem("mytodo", JSON.stringify(todoAppArray));
 showTask();//call display function 
});





