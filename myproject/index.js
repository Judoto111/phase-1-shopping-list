document.addEventListener('DOMContentLoaded', () => {
    let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const clearButton = document.getElementById('clear-button');
    const shoppingListContainer = document.getElementById('shopping-list');

    function renderList() {
        shoppingListContainer.innerHTML = '';
        shoppingList.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = item.purchased ? 'purchased' : '';
            listItem.innerHTML = `
                <span class="item-text">${item.name}</span>
                <input type="text" class="edit" value="${item.name}">
                <div class="edit-buttons">
                    <button class="save">Save</button>
                    <button class="cancel">Cancel</button>
                </div>
                <button class="edit-button">Edit</button>
                <button class="mark-button">${item.purchased ? 'Unmark' : 'Mark'} Purchased</button>
                <button class="delete-button">Delete</button>
            `;
            shoppingListContainer.appendChild(listItem);

            listItem.querySelector('.edit-button').addEventListener('click', () => {
                listItem.classList.add('editing');
            });

            listItem.querySelector('.cancel').addEventListener('click', () => {
                listItem.classList.remove('editing');
            });

            listItem.querySelector('.save').addEventListener('click', () => {
                const newValue = listItem.querySelector('.edit').value;
                if (newValue.trim()) {
                    shoppingList[index].name = newValue;
                    saveList();
                    renderList();
                }
            });

            listItem.querySelector('.mark-button').addEventListener('click', () => {
                shoppingList[index].purchased = !shoppingList[index].purchased;
                saveList();
                renderList();
            });

            listItem.querySelector('.delete-button').addEventListener('click', () => {
                shoppingList.splice(index, 1);
                saveList();
                renderList();
            });
        });
    }

    function saveList() {
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }

    addButton.addEventListener('click', () => {
        const newItem = itemInput.value.trim();
        if (newItem) {
            shoppingList.push({ name: newItem, purchased: false });
            itemInput.value = '';
            saveList();
            renderList();
        }
    });

    clearButton.addEventListener('click', () => {
        shoppingList = [];
        saveList();
        renderList();
    });

    renderList();
});