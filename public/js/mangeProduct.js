document.addEventListener('DOMContentLoaded', function () {
    // Call fetchAndDisplayProducts function when the page loads
    fetchAndDisplayProducts();
    // Category Fetcher..
    fetchAndDisplayCategory();

});

// Function to fetch and display products
function fetchAndDisplayProducts() {
    // Fetch products from the server
    fetch('http://localhost:8080/fetch_products')
        .then(response => response.json())
        .then(products => displayProducts(products))
        .catch(error => console.error('Error fetching products:', error));
}

function fetchAndDisplayCategory() {
    fetch('http://localhost:8080/fetch_category')
        .then(response => response.json())
        .then(categorys => displayCategory(categorys))
        .catch(error => console.error("Error :", error));
}

function displayCategory(categorys) {
    const pasteSpace = document.querySelector('.filters_menu');
    pasteSpace.innerHTML = '';
    var listall = document.createElement('li');
    listall.setAttribute('data-filter', '*');
    listall.textContent = 'ALL';
    pasteSpace.appendChild(listall);
    categorys.forEach(category => {
        category.name.toString().split(',').forEach(name => {
            const list = document.createElement('li');
            list.setAttribute('data-filter', name.toLowerCase());
            list.textContent = name;
            pasteSpace.appendChild(list);
        });
    });

    // Create a list item element
    var listItem = document.createElement("li");
    listItem.setAttribute("data-filter", "*");
    listItem.style.backgroundColor = "rgb(28, 28, 36)";
    listItem.style.color = "white";
    listItem.style.fontWeight = "bold";
    listItem.style.fontFamily = "'Times New Roman', Times, serif";
    listItem.style.fontSize = "medium";
    listItem.onclick = toggleCate;
    listItem.style.cursor = "pointer";


    // Create an SVG element
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("class", "bi bi-file-earmark-plus-fill");
    svg.setAttribute("viewBox", "0 0 16 16");

    // Create a path element within the SVG
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0");
    svg.appendChild(path);

    // Append the SVG to the list item
    listItem.appendChild(svg);

    // Create a label element
    var label = document.createElement("label");
    label.textContent = "Edit Category";
    label.style.cursor = 'pointer';
    label.style.fontFamily = "Open Sans", "sans-serif";

    // Append the label to the list item
    listItem.appendChild(label);

    pasteSpace.appendChild(listItem);


    // Create a list item element
    var listItem = document.createElement("li");
    listItem.setAttribute("data-filter", "*");
    listItem.style.backgroundColor = "rgb(28, 28, 36)";
    listItem.style.color = "white";
    listItem.style.fontWeight = "bold";
    listItem.style.fontFamily = "'Times New Roman', Times, serif";
    listItem.style.fontSize = "medium";
    listItem.onclick = togglePops;
    listItem.style.cursor = "pointer";


    // Create an SVG element
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("fill", "currentColor");
    svg.setAttribute("class", "bi bi-file-earmark-plus-fill");
    svg.setAttribute("viewBox", "0 0 16 16");

    // Create a path element within the SVG
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M8.5 7v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 1 0");
    svg.appendChild(path);

    // Append the SVG to the list item
    listItem.appendChild(svg);

    // Create a label element
    var label = document.createElement("label");
    label.textContent = "Add Product";
    label.style.cursor = 'pointer';
    label.style.fontFamily = "Open Sans", "sans-serif";

    // Append the label to the list item
    listItem.appendChild(label);

    pasteSpace.appendChild(listItem);

    // Add event listeners for filtering
    const filterMenuItems = document.querySelectorAll('.filters_menu li');
    filterMenuItems.forEach(item => {
        item.addEventListener('click', function () {
            const category = this.dataset.filter;
            filterProducts(category);
        });
    });
}

function displayProducts(products) {
    const grid = document.querySelector('.filters-content');
    grid.innerHTML = '';

    const row_grid = document.createElement('div');
    row_grid.classList.add('row', 'grid');


    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('col-sm-6', 'col-lg-4', 'all', product.category); // Add appropriate classes based on the product category

        const boxDiv = document.createElement('div');
        boxDiv.classList.add('box');

        const imgBoxDiv = document.createElement('div');
        imgBoxDiv.classList.add('img-box');

        const img = document.createElement('img');
        img.src = product.imgurl; // Set the product image URL
        img.alt = product.name; // Set the product name as the image alt text

        const detailBoxDiv = document.createElement('div');
        detailBoxDiv.classList.add('detail-box');

        const productNameHeading = document.createElement('h5');
        const productNameLink = document.createElement('a');
        productNameLink.style.color = '#fff'; // Set link color
        productNameLink.textContent = product.name; // Set the product name
        productNameHeading.appendChild(productNameLink);

        const productDescriptionParagraph = document.createElement('p');
        productDescriptionParagraph.textContent = product.description; // Set the product description

        const optionsDiv = document.createElement('div');
        optionsDiv.classList.add('options');

        const priceHeading = document.createElement('h6');
        priceHeading.textContent = 'Price';

        const priceMRP = document.createElement('p');
        priceMRP.textContent = `${product.price}`;
        priceMRP.style.textDecoration = 'line-through';

        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = `${product.offer}`; // Set the product price

        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.style.background = 'none';
        addButton.style.border = 'none';
        addButton.innerHTML = `
        <a>
        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 456.029 456.029" style="enable-background:new 0 0 456.029 456.029;" xml:space="preserve">
       
        <path fill="#FFFFFF" d="M444.504,80.116c-9.971-9.975-22.879-14.959-37.693-14.959c-14.273,0-26.836,4.755-37.687,14.303
          L60.813,309.173L12.848,443.821c-1.903,6.276,0.662,11.324,6.851,15.133c2.475,1.526,5.257,2.279,8.284,2.279
          c2.286,0,4.572-0.661,6.854-1.995l134.754-48.82l253.524-253.526c20.178-20.177,20.178-44.541,0-64.525L444.504,80.116z
           M142.749,379.963l-44.253,16.558l16.556-44.254L347.178,99.433l27.122,27.121L142.749,379.963z M408.729,113.746
          l-27.121-27.122l24.412-24.414c5.903-5.901,13.035-8.85,21.411-8.85c8.373,0,15.608,2.948,21.7,8.85l24.411,24.414
          c5.901,5.902,8.852,13.133,8.852,21.698c0,8.381-2.947,15.609-8.852,21.697L408.729,113.746z"/>
      
        </svg>
      </a>`;
        addButton.addEventListener('click', function () {
            togglePops({ work: 'edit', value: product }); // Call togglePops with {work: 'add'} argument
        });

        // Append elements to their respective parent elements
        imgBoxDiv.appendChild(img);
        detailBoxDiv.appendChild(productNameHeading);
        detailBoxDiv.appendChild(productDescriptionParagraph);
        optionsDiv.appendChild(priceHeading);
        optionsDiv.appendChild(priceMRP);
        optionsDiv.appendChild(priceParagraph);
        optionsDiv.appendChild(addButton);
        boxDiv.appendChild(imgBoxDiv);
        boxDiv.appendChild(detailBoxDiv);
        boxDiv.appendChild(optionsDiv);
        productDiv.appendChild(boxDiv);
        detailBoxDiv.appendChild(optionsDiv);

        row_grid.append(productDiv);

        grid.appendChild(row_grid);
    });
}

function addToCart(productId) {
    // Implement logic to add product to cart
    console.log(`Added product with ID ${productId} to cart`);
}

// Function to filter products based on category
function filterProducts(category) {
    const productItems = document.querySelectorAll('.filters-content .col-lg-4');
    productItems.forEach(item => {
        console.log(category);
        if (category === '*' || item.classList.contains(category)) {
            item.classList.add('transition-effect');
            item.classList.remove('shrink-effect');

            item.style.display = 'block';
        } else {
            item.classList.remove('transition-effect');
            item.classList.add('shrink-effect');
            item.style.display = 'none';
        }
    });

    // Update active class for filter menu items
    const filterMenuItems = document.querySelectorAll('.filters_menu li');
    console.log(filterMenuItems);
    filterMenuItems.forEach(item => {

        if (item.dataset.filter === category) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

const mangeForm = document.getElementById('productForm');

var taskforEditAddForm;
var currentProductID;

function togglePops(whichWork) {
    mangeForm.reset();
    if (whichWork.work == 'edit') {
        taskforEditAddForm = 'edit';
        mangeForm.elements['name'].value = whichWork.value.name;
        mangeForm.elements['description'].value = whichWork.value.description;
        mangeForm.elements['price'].value = whichWork.value.price;
        mangeForm.elements['offer'].value = whichWork.value.offer;
        mangeForm.elements['imgsurl'].value = whichWork.value.imgurl;
        var preview = document.getElementById('preview');
        preview.src = whichWork.value.imgurl;
        currentProductID = whichWork.value._id;
        var btnedit = document.getElementById('A_Ebutton');
        btnedit.innerHTML = 'Save Changes';
        var delBtn = document.getElementById('deleteProduct');
        delBtn.style.display = 'block';
    }
    else {
        taskforEditAddForm = 'new';
        previewImage(event);
        var addCateContainer = document.getElementById("editCategoryContainer");
        addCateContainer.style.display = "none";
        var btnedit = document.getElementById('A_Ebutton');
        btnedit.innerHTML = 'Add Product';
        var delBtn = document.getElementById('deleteProduct');
        delBtn.style.display = 'none';
    }
    var addProductContainer = document.getElementById("addProductContainer");
    if (addProductContainer.style.display === "none") {
        fetchAndDisplayCategoryOnselect();
        addProductContainer.style.display = "block";
    } else {
        addProductContainer.style.display = "none";
    }
}



function toggleCate() {
    var addProductContainer = document.querySelector(".add-product-container");
    addProductContainer.style.display = "none";
    var addProductContainer = document.getElementById("editCategoryContainer");
    if (addProductContainer.style.display === "none") {
        //fetchAndDisplayCategoryOnselect();
        fetchCategoryForManagement();
        addProductContainer.style.display = "block";
    } else {
        addProductContainer.style.display = "none";
    }
}

var closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", function () {
    var addProductContainer = document.querySelector(".add-product-container");
    addProductContainer.style.display = "none";
});

var closeButton = document.getElementById("closeCateButton");
closeButton.addEventListener("click", function () {
    var addCateContainer = document.getElementById("editCategoryContainer");
    addCateContainer.style.display = "none";
});

function fetchAndDisplayCategoryOnselect() {
    fetch('http://localhost:8080/fetch_category')
        .then(response => response.json())
        .then(categorys => displayCategoryonSelect(categorys))
        .catch(error => console.error("Error :", error));
}

function displayCategoryonSelect(categorys) {
    const selects = document.getElementById("category");
    selects.innerHTML = '';
    var allOption = document.createElement('option');
    allOption.setAttribute('value', '');
    allOption.textContent = 'Select Category..';
    selects.appendChild(allOption);
    categorys.forEach(individuals => {
        individuals.name.toString().split(',').forEach(category => {
            const option = document.createElement('option');
            option.setAttribute('value', category.toLowerCase());
            option.textContent = category;
            selects.appendChild(option);
        })

    });
}

function previewImage(event) {
    var imageUrl = event.target.value;
    var preview = document.getElementById('preview');
    if (imageUrl) {
        preview.style.display = 'block';
        preview.src = imageUrl;
    } else {
        preview.style.display = 'none';
    }
}

mangeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (taskforEditAddForm == 'new') {
        const user_login = new URLSearchParams(new FormData(mangeForm));
        console.log(user_login);
        const url = 'http://localhost:8080/addprods';
        fetch(url, {
            method: 'POST',
            body: user_login
        }).then(res => res.json())
            .then(data => {
                if (data.status) {
                    toggleAlertmsg("Success","Product Added!!");
                    var addProductContainer = document.getElementById("addProductContainer");
                    addProductContainer.style.display = "none";
                    fetchAndDisplayProducts();
                } else {
                    toggleAlertmsg("Failed","Product Not Added!! Try Again!!");
                }
            });
    } else {
        const editData = new URLSearchParams(new FormData(mangeForm));
        editData.append('productID', currentProductID);
        console.log(editData);
        const url = 'http://localhost:8080/update_product';
        fetch(url, {
            method: 'POST',
            body: editData
        }).then(res => res.json())
            .then(data => {
                if (data.status) {
                    toggleAlertmsg("Success","Product Updated!!");
                    var addProductContainer = document.getElementById("addProductContainer");
                    addProductContainer.style.display = "none";
                    fetchAndDisplayProducts();
                } else {
                    toggleAlertmsg("Success","Product Not Updated!! Try Again!!");
                }
            });
    }
});


// Category Management

function fetchCategoryForManagement() {
    fetch('http://localhost:8080/fetch_category')
        .then(response => response.json())
        .then(categorys => displayCategoryonSelectonManage(categorys))
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

function displayCategoryonSelectonManage(categorys) {
    categorys.forEach(category => {
        categories = category.name.toString().split(',');
    });
    displayCategories();
}

function finalsaveCategory() {
    const params = new URLSearchParams({ name: categories.toString() });
    const url = 'http://localhost:8080/update_category';
    fetch(url, {
        method: 'POST',
        body: params
    }).then(res => res.json())
        .then(data => {
            if (data.status) {
                toggleCate();
                fetchAndDisplayCategory();
            } else {
                alert("NO");
            }
        });
};

function deleProduct() {
    if (confirm(`Are you sure you want to delete this Product?`)) {
        const params = new URLSearchParams({ productID: currentProductID });
        const url = 'http://localhost:8080/deleteProduct';
        fetch(url, {
            method: 'POST',
            body: params
        }).then(res => res.json())
            .then(data => {
                if (data.status) {
                    var addProductContainer = document.getElementById("addProductContainer");
                    addProductContainer.style.display = 'none';
                    fetchAndDisplayProducts();
                } else {
                    alert("NO");
                }
            });
    }
};

