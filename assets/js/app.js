 let todoArr=[ 
            { 
                todoItem:'javascript',
                todoId:'asdf122-asdf-1223-asdf'
            },
             
           { 
                todoItem:'js',
                todoId:'122-asdf-1223-asdf'
            },
 
            {  
                todoItem:'html',
                todoId:'asdf122-a13-1223-asdf'
            }
] 



const todoForm =document.getElementById('todoForm'); 

const todoContainer=document.getElementById('todoContainer');
const todoItemControl= document.getElementById('todoItem');
const addTodo =document.getElementById('addTodo'); 
const updateTodo= document.getElementById('updateTodo');



function createArr(arr){
     let result =` ` ;
    arr.forEach(ele=>{ 
         result +=` <li class="list-group-item d-flex justify-content-between" id='${ele.todoId}'>
                             <strong>${ele.todoItem}</strong>
                             <div>
                                 <i onclick="onEdit(this)" class="fa-solid fa-pen-to-square  text-primary fa-2x"></i>
                                 <i onclick="onRemove(this)" class="fa-solid fa-trash text-danger fa-2x"></i>
                             </div>
                           </li>`
    }) 
     todoContainer.innerHTML=result;

}  

createArr(todoArr); 

function ontodoSubmit(eve){ 
     console.log(eve);
    eve.preventDefault() //to prevent default value of form. the dafault value is submit
 
  let todo_obj ={ 
     todoItem: todoItemControl.value, 
     todoId:Date.now().toString() //to create unique ids
  } 

  console.log(todo_obj);
 
  todoArr.push(todo_obj) ;
  // createArr(todo_obj); // when we call function in this method it will recreate all todoItem Again hence this method is good 


//hence we will create using this method 
let li =document.createElement('li'); 
 li.className='list-group-item d-flex justify-content-between' ; 
 li.id=todo_obj.todoId; 
 li.innerHTML=`  <strong>${todo_obj.todoItem}</strong>
                             <div>
                                 <i onclick="onEdit(this)" class="fa-solid fa-pen-to-square  text-primary fa-2x"></i>
                                 <i onclick="onRemove(this)" class="fa-solid fa-trash text-danger fa-2x"></i>
                             </div>`    

let ul =document.querySelector('ul')
       ul.append(li);

}



function onRemove(ele){
    console.log(ele);
    let remove= ele.closest('li').id; // 
let getIndex = todoArr.findIndex(ele => ele.todoId===remove); 

// To remove todoItem from database that is Array.......
let removedItem =todoArr.splice(getIndex,1) ;

 // to Remove todo Item from UI.....
 ele.closest('li').remove() ;


}

let editId ;

function onEdit(ele){ 
  editId= ele.closest('li').id; 
  
  let EditObj =todoArr.find(ele=>ele.todoId===editId); 

   //this code shows selected todoItem  on formControl
   todoItemControl.value =EditObj.todoItem ;
  
   addTodo.classList.add('d-none');
   updateTodo.classList.remove('d-none');
     

} 



function onUpdate(){ // this is function defination of onUpdate 
    let updateId = editId;

    let updateObj ={ 
        todoItem:todoItemControl.value,
        todoId:editId
    }  

  let getIndex =todoArr.findIndex(ele=>ele.todoId===updateId); //2 
  //todoArr[2] =updateObj   
  todoArr[getIndex] =updateObj;

  
let li=document.getElementById(updateId)  //This is ddocument object creation method
    li.querySelector('strong').innerText= updateObj.todoItem //this is single  
    todoForm.reset();

  addTodo.classList.remove('d-none');
   updateTodo.classList.add('d-none');

}



todoForm.addEventListener('submit',ontodoSubmit); 
                         //Event ,  callBackFunction
updateTodo.addEventListener('click',onUpdate) 