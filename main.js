document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('addForm');
    const itemList = document.getElementById('items');
    const filter = document.getElementById('filter');
    const dropdown = document.getElementById('dropdown');

    // Predefined items
    const predefinedItems = [
        "Do Laundry", "Go Shopping", "Take Out Trash", "Buy Wine",
        "Visit the Club", "Go for a Tour", "Take Out Kids", "Wash Garbage Can",
        "Wash Garage", "Go to Dry Clean", "Travel to Iceland", "Draft a Proposal",
        "Organize Shelves", "Buy Flowers", "Order Food", "Send a Parcel",
        "Pick Up Parcel", "Go to the Bank", "Get Gas", "Go Fishing",
        "Make the Bed", "Visit Mom & Dad", "Finish a Project", "Take Bae Out",
        "Go to a Party", "Attend a Wedding", "Go See a Friend", "Buy Toiletries",
        "Buy Grocery", "Visit Dentist", "Go for a Run", "Take a Shower",
        "Take Family Out", "Take Kids to School", "Wash the Car"
    ];

    // Form submit event
    form.addEventListener('submit', addItem);

    // Filter event
    filter.addEventListener('input', debounce(showDropdown, 300));

    // Add item
    function addItem(e) {
        e.preventDefault();

        const newItem = filter.value.trim();
        if (newItem === '' || isDuplicate(newItem)) {
            return;
        }

        addItemToList(newItem);

        // Clear input
        filter.value = '';

        // Clear the dropdown
        clearDropdown();
    }

    // Check for duplicate item
    function isDuplicate(itemName) {
        // addEventListener("onClick", add);
        // alert("ítem already exists!");
        const items = itemList.getElementsByTagName('li');
        return Array.from(items).some((item) => item.firstChild.textContent.toLowerCase() === itemName.toLowerCase());
    }

    // Show dropdown with filter items
    function showDropdown(e) {
        const text = e.target.value.trim().toLowerCase();
        clearDropdown();

        predefinedItems.forEach((item) => {
            if (item.toLowerCase().includes(text)) {
                const dropdownItem = createDropdownItem(item);
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
            if (!isDuplicate(text)) {
                addItemToList(text);
                filter.value = '';
                clearDropdown();
            }
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
        
        deleteBtn.onclick = function() {
            
            alert("Are you sure you want to delete?");
            itemList.removeChild(li);
        };

        li.appendChild(deleteBtn);
        itemList.appendChild(li);
    }

    // Debounce function to improve performance
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
});

