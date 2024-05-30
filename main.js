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
    filter.addEventListener('input', showDropdown);

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

        const newItem = filter.value.trim();
        if (newItem === '') {
            return;
        }

        addItemToList(newItem);

        // Clear input
        filter.value = '';

        // Clear the dropdown
        clearDropdown();
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
        const text = e.target.value.trim().toLowerCase();
        const items = itemList.getElementsByTagName('li');
        clearDropdown();

        Array.from(items).forEach((item) => {
            const itemName = item.textContent.toLowerCase();
            if (itemName.includes(text)) {
                const dropdownItem = createDropdownItem(item.textContent);
                dropdown.appendChild(dropdownItem);
            }
        });

        toggleDropdownDisplay();
    }

    // Clear dropdown
    function clearDropdown() {
        dropdown.innerHTML = '';
        dropdown.style.display = 'none';
    }

    // Toggle dropdown display
    function toggleDropdownDisplay() {
        dropdown.style.display = dropdown.children.length > 0 ? 'block' : 'none';
    }

    // Create dropdown item
    function createDropdownItem(text) {
        const dropdownItem = document.createElement('li');
        dropdownItem.className = 'dropdown-item d-flex justify-content-between align-items-center';
        dropdownItem.textContent = text;

        const addButton = document.createElement('button');
        addButton.className = 'btn btn-success btn-sm';
        addButton.textContent = 'Add';
        addButton.onclick = function() {
            addItemToList(text);
            filter.value = '';
            clearDropdown();
        };

        dropdownItem.appendChild(addButton);
        return dropdownItem;
    }

    // Add item to list
    function addItemToList(itemName) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.appendChild(document.createTextNode(itemName));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm delete';
        deleteBtn.textContent = 'X';
        li.appendChild(deleteBtn);

        itemList.appendChild(li);
        li.style.display = 'flex'; // Display the new item
    }
});
