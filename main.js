var form = document.getElementById('addForm');
var itemList = document.getElementById('items');
var filter = document.getElementById('filter');

// Form Submit Event
form.addEventListener('submit', addItem);
//detele event
itemList.addEventListener('click', removeItem);
//filter event
filter.addEventListener('keyup', filterItems)
//Add item 
function addItem(event) {
   event.preventDefault();

   //get input value
    var newItem = document.getElementById('item').value;
   //create new li element
   var li = document.createElement('li');
   //add class
   li.className = 'list-group-item';
   console.log(li);
   //Add text node with input value
   li.appendChild(document.createTextNode(newItem));

   //Add delete button
   var deleteBtn = document.createElement('button');

   //Add classes
   deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
  //apend textnode
   deleteBtn.appendChild(document.createTextNode('X'));
 
   //apend del to li
   li.appendChild(deleteBtn);

   itemList.appendChild(li);
}
//Remove item fucntion
function removeItem(e) {
   e.preventDefault();
   if (e.target.classList.contains('delete')) {
      if (confirm('Are you sure?')) {
         var li = e.target.parentElement;
         itemList.removeChild(li);

      }
   }

}

//filter items
function filterItems(e) {
   e.preventDefault();
   
   // convert text to lowercase
   var text = e.target.value.toLowerCase();
   // get lis
   var items = itemList.getElementsByTagName('li');
   //convert to arrays
   Array.from(items).forEach(function(item) {
      var itemName = item.firstChild.textContent;
      if (itemName.toLocaleLowerCase().indexOf(text) != -1) {
         item.style.display = 'block';
      } else {
         item.style.display = 'none';
      }
      
   })
}