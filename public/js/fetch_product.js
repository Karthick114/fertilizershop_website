document.addEventListener('DOMContentLoaded', function() {
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

function fetchAndDisplayCategory(){
    fetch('http://localhost:8080/fetch_category')
        .then(response => response.json())
        .then(categorys => displayCategory(categorys))
        .catch(error => console.error("Error :",error));
}

function displayCategory(categorys) {
    const pasteSpace = document.querySelector('.filters_menu');
    categorys.forEach(category => {
        category.name.toString().split(',').forEach(name => {
            const list = document.createElement('li');
            list.setAttribute('data-filter', name.toLowerCase());
            list.textContent = name;
            pasteSpace.appendChild(list);
        });
    });

    // Add event listeners for filtering
    const filterMenuItems = document.querySelectorAll('.filters_menu li');
    filterMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.dataset.filter;
            filterProducts(category);
        });
    });
}



function displayProducts(products) {
    const grid = document.querySelector('.filters-content');

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
        priceMRP.style.textDecoration = 'line-through' ;

        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = `${product.offer}`; // Set the product price

        const addButton = document.createElement('button');
        addButton.type = 'button';
        addButton.style.background = 'none';
        addButton.style.border = 'none';
        addButton.innerHTML = `
            <a>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 456.029 456.029" style="enable-background:new 0 0 456.029 456.029;" xml:space="preserve">
              <g>
                <g>
                  <path d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
               c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z" />
                </g>
              </g>
              <g>
                <g>
                  <path d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
               C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
               c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
               C457.728,97.71,450.56,86.958,439.296,84.91z" />
                </g>
              </g>
              <g>
                <g>
                  <path d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
               c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z" />
                </g>
              </g>
              
            </svg>
          </a>
        `;
        addButton.onclick = ()=>{
            //For Add To Cart
            visibleECart();
            addItemToCart(product.name, product._id, product.offer, product.imgurl, product.description);
        };

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
