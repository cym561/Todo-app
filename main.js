document.addEventListener('DOMContentLoaded', () => {
   const form = document.getElementById('addForm');
   const itemList = document.getElementById('items');
   const filter = document.getElementById('filter');
   const dropdown = document.getElementById('dropdown');

   // Hide all items initially
   hideAllItems();

   // Form submit event
   form.addEventListener('submit', addItem);

   // Delete event
   itemList.addEventListener('click', removeItem);

   // Filter event
   filter.addEventListener('keyup', showDropdown);

   // Hide all items
   function hideAllItems() {
       const items = itemList.getElementsByTagName('li');
       Array.from(items).forEach((item) => {
           item.style.display = 'none';
       });
   }

   // Add item
   function addItem(e) {
       e.preventDefault();

       // Get input value
       const newItem = filter.value.trim();
       if (newItem === '') {
           return;
       }

       addItemToList(newItem);
       
       // Clear input
       filter.value = '';

       // Clear the dropdown
       dropdown.innerHTML = '';
       dropdown.style.display = 'none';
   }

   // Remove item
   function removeItem(e) {
       if (e.target.classList.contains('delete')) {
           if (confirm('Are you sure?')) {
               const li = e.target.parentElement;
               itemList.removeChild(li);
           }
       }
   }

   // Show dropdown with filter items
   function showDropdown(e) {
       const text = e.target.value.toLowerCase();
       const items = itemList.getElementsByTagName('li');
       dropdown.innerHTML = '';

       Array.from(items).forEach((item) => {
           const itemName = item.firstChild.textContent.toLowerCase();
           if (itemName.indexOf(text) !== -1) {
               const dropdownItem = document.createElement('li');
               dropdownItem.className = 'dropdown-item d-flex justify-content-between align-items-center';
               dropdownItem.textContent = item.firstChild.textContent;

               const addButton = document.createElement('button');
               addButton.className = 'btn btn-success btn-sm';
               addButton.textContent = 'Add';
               addButton.onclick = function() {
                   addItemToList(item.firstChild.textContent);
                   filter.value = '';
                   dropdown.innerHTML = '';
                   dropdown.style.display = 'none';
               };

               dropdownItem.appendChild(addButton);
               dropdown.appendChild(dropdownItem);
           }
       });

       if (dropdown.innerHTML === '') {
           dropdown.style.display = 'none';
       } else {
           dropdown.style.display = 'block';
       }
   }

   // Add item to list
   function addItemToList(itemName) {
       // Create new li element
       const li = document.createElement('li');
       li.className = 'list-group-item d-flex justify-content-between align-items-center';
       li.appendChild(document.createTextNode(itemName));

       // Create del button element
       const deleteBtn = document.createElement('button');
       deleteBtn.className = 'btn btn-danger btn-sm delete';
       deleteBtn.appendChild(document.createTextNode('X'));

       // Append button to li
       li.appendChild(deleteBtn);

       // Append li to list
       itemList.appendChild(li);

       // Display the new item
       li.style.display = 'flex';
   }
});
