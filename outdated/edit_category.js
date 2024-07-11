document.addEventListener('DOMContentLoaded', function () {
    // Category Fetcher..
    fetchAndDisplayCategoryOnselect();

});

function fetchAndDisplayCategoryOnselect() {
    fetch('http://localhost:8080/fetch_category')
        .then(response => response.json())
        .then(categorys => displayCategoryonSelect(categorys))
        .catch(error => console.error("Error :", error));
}

var categories = [];


// Sample initial category data

// Function to display categories
function displayCategories() {
    console.log(categories);
    var categoryList = document.getElementById('categoryList');
    categoryList.style.minWidth = 200 + "px";
    categoryList.innerHTML = '';
    categories.forEach((category, index) => {
        var categoryItem = document.createElement('li');
        categoryItem.className = 'categoryItem';
        categoryItem.innerHTML = `
      <span class="categoryText">${category}</span>
      <input type="text" class="categoryInput" value="${category}" style="display: none;">
      <span class="btnGroup">
        <span class="editBtn" onclick="editCategory(${index})"><i class="fas fa-edit"></i></span>
        <span class="deleteBtn" onclick="deleteCategory(${index})"><i class="fas fa-trash-alt"></i> </span>
        <span class="saveBtn" onclick="saveCategory(${index})" style="display: none;"><i class="fas fa-check"></i> </span>
        <span class="cancelBtn" onclick="cancelEdit(${index})" style="display: none;"><i class="fas fa-times"></i> </span>
      </span>
    `;
        categoryList.appendChild(categoryItem);
    });

}

// Function to add a new category
function addCategory() {

    var newCategory = prompt('Enter the new category:');
    if (newCategory) {
        categories.push(newCategory);
        displayCategories();
    }
}

// Function to edit a category
function editCategory(index) {
    var categoryItem = document.getElementsByClassName('categoryItem')[index];
    var categoryText = categoryItem.querySelector('.categoryText');
    var categoryInput = categoryItem.querySelector('.categoryInput');
    var editBtn = categoryItem.querySelector('.editBtn');
    var deleteBtn = categoryItem.querySelector('.deleteBtn');
    var saveBtn = categoryItem.querySelector('.saveBtn');
    var cancelBtn = categoryItem.querySelector('.cancelBtn');

    categoryText.style.display = 'none';
    categoryInput.style.display = 'inline';
    editBtn.style.display = 'none';
    deleteBtn.style.display = 'none';
    saveBtn.style.display = 'inline';
    cancelBtn.style.display = 'inline';

    categoryInput.focus();
}

// Function to save changes for a category
function saveCategory(index) {
    var categoryItem = document.getElementsByClassName('categoryItem')[index];
    var categoryText = categoryItem.querySelector('.categoryText');
    var categoryInput = categoryItem.querySelector('.categoryInput');
    var editBtn = categoryItem.querySelector('.editBtn');
    var deleteBtn = categoryItem.querySelector('.deleteBtn');
    var saveBtn = categoryItem.querySelector('.saveBtn');
    var cancelBtn = categoryItem.querySelector('.cancelBtn');

    categories[index] = categoryInput.value;

    categoryText.textContent = categoryInput.value;
    categoryText.style.display = 'inline';
    categoryInput.style.display = 'none';
    editBtn.style.display = 'inline';
    deleteBtn.style.display = 'inline';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
}

// Function to cancel editing for a category
function cancelEdit(index) {
    var categoryItem = document.getElementsByClassName('categoryItem')[index];
    var categoryText = categoryItem.querySelector('.categoryText');
    var categoryInput = categoryItem.querySelector('.categoryInput');
    var editBtn = categoryItem.querySelector('.editBtn');
    var deleteBtn = categoryItem.querySelector('.deleteBtn');
    var saveBtn = categoryItem.querySelector('.saveBtn');
    var cancelBtn = categoryItem.querySelector('.cancelBtn');

    categoryText.style.display = 'inline';
    categoryInput.style.display = 'none';
    editBtn.style.display = 'inline';
    deleteBtn.style.display = 'inline';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';

    categoryInput.value = categoryText.textContent;
}

// Function to delete a category
function deleteCategory(index) {
    if (confirm('Are you sure you want to delete this category?')) {
        categories.splice(index, 1);
        displayCategories();
    }
}

function displayCategoryonSelect(categorys) {
    categorys.forEach(category => {
        categories = category.name.toString().split(',');
    });
    displayCategories();
}

function finalsaveCategory(){
    const params = new URLSearchParams({name:categories.toString()});
    const url = 'http://localhost:8080/update_category';
    fetch(url, {
        method: 'POST',
        body: params
    }).then(res => res.json())
        .then(data => {
            if (data.status) {
                alert("Ok");
            } else {
                alert("NO");
            }
        });
};
