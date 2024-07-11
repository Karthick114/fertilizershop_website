// Function to add item to the cart
// function addItemToCarts(productName, productId, productPrice, ImgUrl) {

//     // var productID = productId;
//     // alert(productName);

//     var cartContainer = document.getElementById("scroll_when_overflow");

//     var existingItem = document.getElementById("" + productId);
//     if (existingItem) {
//         // Update the quantity of the existing item (you can adjust this logic as needed)
//         var quantityInput = existingItem.querySelector("input[name='quantity']");
//         quantityInput.value = parseInt(quantityInput.value) + 1;
//         updateSubtotal(); // Update subtotal after updating quantity
//         return; // Exit the function
//     }
//     var itemDiv = document.createElement("div");

//     itemDiv.classList.add("item_details");
//     itemDiv.style.margin = "2%";
//     itemDiv.style.backgroundColor = "#c5cad0";
//     itemDiv.style.borderRadius = "20px";
//     itemDiv.style.padding = "3%";
//     itemDiv.id = productId;

//     var itemImg = document.createElement("img");
//     itemImg.src = ImgUrl;
//     itemImg.style.width = "80px";
//     itemImg.style.height = "100px";
//     itemImg.style.borderRadius = "5px";

//     var itemNamePara = document.createElement("p");
//     itemNamePara.textContent = productName;
//     itemNamePara.style.fontSize = "18px";
//     itemNamePara.style.fontWeight = "900";
//     itemNamePara.style.fontFamily = "Arial, Helvetica, sans-serif";

//     var itemPricePara = document.createElement("h4");
//     itemPricePara.innerHTML = "<b>Price :</b> " + productPrice;

//     var quantityInput = document.createElement("input");
//     quantityInput.type = "number";
//     quantityInput.name = "quantity";
//     quantityInput.id = 'quantity';
//     quantityInput.style.backgroundColor = "white";
//     quantityInput.style.borderRadius = "5px";
//     quantityInput.style.borderColor = "black";
//     quantityInput.style.width = "25%";
//     quantityInput.style.height = "35px";
//     quantityInput.style.fontSize = "x-large";
//     quantityInput.min = "1";
//     quantityInput.max = "25";
//     quantityInput.value = 1;
//     quantityInput.oninput = function () {
//         var regex = /^\d+$/;

//         if (!regex.test(this.value)) {
//             // If the input does not match the regular expression, set the value to an empty string
//             this.value = '0';
//         }
//         updateSubtotal();
//     }



//     var deleteBtn = document.createElement("button");
//     deleteBtn.style.width = "50px";
//     deleteBtn.style.height = "50px";
//     deleteBtn.style.borderRadius = "50%";
//     deleteBtn.style.backgroundColor = "transparent";
//     deleteBtn.onclick = function () {
//         cartContainer.removeChild(itemDiv);
//         updateSubtotal();
//     };

//     var deleteIcon = document.createElement("img");
//     deleteIcon.src = "./images/delete.png";
//     deleteIcon.alt = "Delete Icon";
//     deleteIcon.style.width = "100%";
//     deleteIcon.style.height = "100%";
//     deleteIcon.style.borderRadius = "50%";

//     deleteBtn.appendChild(deleteIcon);

//     itemDiv.appendChild(itemImg);
//     itemDiv.appendChild(itemNamePara);
//     itemDiv.appendChild(itemPricePara);
//     itemDiv.appendChild(document.createElement("br"));
//     itemDiv.appendChild(document.createElement("br"));
//     itemDiv.appendChild(document.createTextNode("Quantity: "));
//     itemDiv.appendChild(quantityInput);
//     itemDiv.appendChild(deleteBtn);

//     cartContainer.appendChild(itemDiv);

//     updateSubtotal();
// }

function addItemToCart(productName, productId, productPrice, ImgUrl, productDesc) {
    var cartContainer = document.getElementById("scroll_when_overflow");

    var existingItem = document.getElementById("" + productId);
    if (existingItem) {
        var quantityInput = existingItem.querySelector("input[name='quantity']");
        quantityInput.value = parseInt(quantityInput.value) + 1;
        updateSubtotal();
        return;
    }
    var itemDiv = document.createElement("div");

    itemDiv.classList.add("row");
    itemDiv.style.padding = "10px";

    var productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.id = productId;

    var zoomDiv = document.createElement("div");
    zoomDiv.classList.add("zoom");

    var productImage = document.createElement("img");
    productImage.classList.add("imgSRC");
    productImage.src = ImgUrl;
    productImage.alt = "Product Image";
    productImage.style.height = "80%";
    productImage.style.width = "80%";

    zoomDiv.appendChild(productImage);

    var productInfoDiv = document.createElement("div");
    productInfoDiv.classList.add("product-info");

    var productNameDiv = document.createElement("div");
    productNameDiv.classList.add("product-name");
    productNameDiv.id = "product_name";
    productNameDiv.textContent = productName;

    var productDescDiv = document.createElement("div");
    productDescDiv.classList.add("product-type");
    productDescDiv.id = "product_desc";
    productDescDiv.textContent = productDesc;

    var productPriceDiv = document.createElement("div");
    productPriceDiv.classList.add("product-type");
    productPriceDiv.id = "product_price";
    productPriceDiv.innerHTML = "<b>Price :</b> " + productPrice + "/-";

    var productQuantity = document.createElement("div");
    productQuantity.classList.add("product-type");
    productQuantity.innerHTML = "<b>Quantity :</b> ";


    var quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.name = "quantity";
    quantityInput.style.borderColor = "gray";
    quantityInput.style.width = "25%";
    quantityInput.style.borderRadius = "10%";
    productQuantity.appendChild(quantityInput);
    quantityInput.value = 1;
    quantityInput.min = 1;
    quantityInput.max = 20;
    quantityInput.oninput = function () {
        var regex = /^\d+$/;

        if (!regex.test(this.value)) {
            // If the input does not match the regular expression, set the value to an empty string
            this.value = '1';
        }
        updateSubtotal();
    }

    productInfoDiv.appendChild(productNameDiv);
    productInfoDiv.appendChild(productDescDiv);
    productInfoDiv.appendChild(productPriceDiv);
    productInfoDiv.appendChild(productQuantity);


    var deleteProductDiv = document.createElement("div");
    deleteProductDiv.classList.add("deleteProduct");

    var deleteProductCrossDiv = document.createElement("div");
    deleteProductCrossDiv.classList.add("deleteProduct-cross");
    deleteProductCrossDiv.innerHTML = "<b>X</b>";
    deleteProductCrossDiv.onclick = function () {
        cartContainer.removeChild(itemDiv);
        updateSubtotal();
    };

    deleteProductDiv.appendChild(deleteProductCrossDiv);


    productDiv.appendChild(zoomDiv);
    productDiv.appendChild(productInfoDiv);
    productDiv.appendChild(deleteProductDiv);

    itemDiv.appendChild(productDiv);

    cartContainer.appendChild(itemDiv);

    updateSubtotal();
}



// Function to update subtotal
function updateSubtotal() {
    var subtotal = 0;
    var items = document.querySelectorAll(".row");
    items.forEach(function (item) {
        var priceElement = item.querySelector(".product-info #product_price");
        var quantityElement = item.querySelector("input[name='quantity']");

        // Check if both price and quantity elements are found
        if (priceElement && quantityElement) {
            var priceText = priceElement.textContent;
            var price = parseFloat(priceText.replace("Price :", "").replace("/-", "").trim());
            var quantity = parseInt(quantityElement.value);
            subtotal += price * quantity;
        }
    });
    document.getElementById("subtotal").textContent = "Sub Total : " + subtotal.toFixed(2);
}



function placeOrder() {

    // Initialize an empty URLSearchParams object
    const cartItemsDetails = [];

    var items = document.querySelectorAll(".row");
    items.forEach(function (item) {
        var priceElement = item.querySelector(".product-info #product_price");
        var productS = item.querySelector(".product");
        var quantity = item.querySelector("input[name='quantity']");
        var imger = item.querySelector(".imgSRC");
        var nameP = item.querySelector(".product-name");

        
        if (productS && quantity && priceElement) {
            var priceText = priceElement.textContent;
            var price = priceText.replace("Price :", "").replace("/-", "").trim();
            const productId = productS.id;
            cartItemsDetails.push({ productId: productId, quantity: quantity.value, orderPrice: price, imgurl : imger.src, prodName : nameP.textContent });
        }
    });

    localStorage.setItem('cartItems', JSON.stringify(cartItemsDetails));
    window.location.href = '/makeOrder';

    // fetch("http://localhost:8080/placeOrder", {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: jsonData
    // }).then(res => res.json())
    //     .then(data => {
    //         if (data.status === "login_now") {
    //             visible_login();
    //         } else if (data.status) {
    //             alert("OK");
    //         } else {
    //             alert("TryAgain");
    //         }
    //     });


}


