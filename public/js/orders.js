document.addEventListener('DOMContentLoaded', function () {
    fetchOrders();
});

function fetchOrders() {
    fetch("http://localhost:8080/fetchOrders", {
        method: 'POST'
    }).then(res => res.json())
        .then(data => {
            if (data.status === "login_now") {
                visible_login();
            }
            else {
                displayOrders(data);
            }
        });
}


const statusColorMap = {
    "waiting": "#ff9800", // Orange color for waiting status
    "accepted": "#4caf50", // Green color for accepted status
    "delivered": "#2196f3", // Blue color for delivered status
    "declined": "#f44336", // Red color for declined status
    "decline": "#f44336", // Red color for declined status
    "canceled": "#9e9e9e" // Gray color for canceled status
};
function displayOrders(orders) {
    const pasteSpace = document.querySelector('.ordersList');
    pasteSpace.innerHTML = "";
    orders.forEach(order => {
        if(!order.prodDetails[0]){
            order.prodDetails.push({imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStjNcnD4VKw0z_cI-et-yjYa9Mlc98dNot21dP4VJtRg&s", name:"Not Available", description:' ',});
        
        }
        //Dynamically Added to the orderList..
        // Create the outer row container
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        rowDiv.classList.add('grid');

        // Create the product container
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.id = 'product';
        productDiv.onclick = () => {
            showDetails(order.orderId, order.prodDetails[0].imgurl, order.prodDetails[0].name, order.prodDetails[0].description, order.orderPrice, order.quantity, order.status, order.orderTime);
        };

        // Create the zoom container
        const zoomDiv = document.createElement('div');
        zoomDiv.classList.add('zoom');

        // Create the product image
        const productImage = document.createElement('img');
        productImage.src = order.prodDetails[0].imgurl;
        productImage.alt = 'Product Image';

        // Append the product image to the zoom container
        zoomDiv.appendChild(productImage);

        // Create the product info container
        const productInfoDiv = document.createElement('div');
        productInfoDiv.classList.add('product-info');

        // Create the status div
        const statusDivs = document.createElement('div');
        statusDivs.classList.add('product-status');
        statusDivs.textContent = 'Status: ';

        const statusDiv = document.createElement('div');
        statusDiv.classList.add('status');
        statusDiv.textContent = order.status;
        statusDiv.style.color = statusColorMap[order.status.toString().toLowerCase()] || "black";
        statusDivs.append(statusDiv);

        // Create the product name div
        const productNameDiv = document.createElement('div');
        productNameDiv.classList.add('product-name');
        productNameDiv.textContent = order.prodDetails[0].name;

        // Create the product type div
        const productTypeDiv = document.createElement('div');
        productTypeDiv.classList.add('product-type');
        productTypeDiv.textContent = order.prodDetails[0].description;

        // Create the SVG element
        const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgElement.setAttribute('width', '20');
        svgElement.setAttribute('height', '20');
        svgElement.setAttribute('fill', 'currentColor');
        svgElement.setAttribute('class', 'bi bi-chevron-compact-right');
        svgElement.setAttribute('viewBox', '0 0 16 16');

        // Create the path element inside the SVG element
        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('fill-rule', 'evenodd');
        pathElement.setAttribute('d', 'M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671');

        // Append the path element to the SVG element
        svgElement.appendChild(pathElement);

        // Append the zoom container, product info container, and SVG element to the product container
        productDiv.appendChild(zoomDiv);
        productDiv.appendChild(productInfoDiv);
        productDiv.appendChild(svgElement);

        // Append the status div, product name div, and product type div to the product info container
        productInfoDiv.appendChild(statusDivs);
        productInfoDiv.appendChild(productNameDiv);
        productInfoDiv.appendChild(productTypeDiv);

        // Append the product container to the row container
        rowDiv.appendChild(productDiv);

        // Append the row container to the document body or another suitable parent element
        pasteSpace.appendChild(rowDiv);

    });
}


const loginForm = document.getElementById("loginForm");

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const user_login = new URLSearchParams(new FormData(loginForm));
    fetch("http://localhost:8080/login", {
        method: 'POST',
        body: user_login
    }).then(res => res.json())
        .then(data => {
            if (data.status) {
                if (data.isUser) {
                    toggleAlertmsg("Success","Login Successful");
                    unvisble_Login();
                    fetchOrders();
                } else {
                    window.location.href = "/admin";
                }
            } else {
                toggleAlertmsg("Failed","Login Failed");
            }
        });
});

document.getElementById("refresh-icon").addEventListener("click", (event) => {
    event.preventDefault();
    fetchOrders();
});

let currentOrder_ID;

function showDetails(orderId, imgurl, prodName, prodDesc, proPrice, proQuan, Ordstatus, orderDate) {
    var container = document.getElementById("container1");
    if (container.style.display === "none" || container.style.display === "") {
        container.style.display = "block";
        currentOrder_ID = orderId;
        var imger = document.getElementById("prodImg").src = imgurl;
        document.getElementById("proDName").textContent = prodName;
        document.getElementById("proDDesc").textContent = prodDesc;
        document.getElementById("proDDesc").textContent = prodDesc;
        document.getElementById("proDPrice").textContent = proPrice;
        document.getElementById("proDQuan").textContent = proQuan;
        document.getElementById("proDTotal").textContent = (parseFloat(proPrice) * parseFloat(proQuan)).toString();
        var statusPane = document.getElementById("Status");
        statusPane.textContent = Ordstatus;
        statusPane.style.color = statusColorMap[Ordstatus.toLowerCase()] || "black";

        var dateObject = new Date(orderDate);
        // Extract the date and time components
        var date = dateObject.toDateString();
        var time = dateObject.toLocaleTimeString(); // This will give the time component
        document.getElementById("orderDate").textContent = date + "  " + time;

        var cancelButton = document.getElementById('cancelOrder');

        // Check the status and disable the button accordingly
        if (Ordstatus.toLowerCase() === "delivered" || Ordstatus.toLowerCase() === "declined" || Ordstatus.toLowerCase() === "canceled" || Ordstatus.toLowerCase() === "decline") {
            cancelButton.disabled = true;
        }else{
            cancelButton.disabled = false;
        }
    } else {
        container.style.display = "none";
    }
}
document.getElementById('x').addEventListener('click', function () {
    document.getElementById('container1').style.display = 'none';
});

document.getElementById('cancelOrder').addEventListener('click', function () {
    alert(currentOrder_ID);
    const dataForm = new URLSearchParams();
    dataForm.append('orderId', currentOrder_ID);

    fetch("http://localhost:8080/cancelOrder", {
        method: 'POST',
        body: dataForm
    }).then(res => res.json())
        .then(data => {
            if (data.status) {
                var container = document.getElementById("container1");
                container.style.display = 'none';
                fetchOrders();
            } else {
                window.location.href = '/error';

            }
        });
});

// const filterMenuItems = document.querySelectorAll('.filters_menu li');
//     filterMenuItems.forEach(item => {
//         item.addEventListener('click', function() {
//             const category = this.dataset.filter;
//             filterOrders(category);
//         });
//     });

// function filterOrders(category) {
//     // alert(category);
//     const productItems = document.querySelectorAll('.row');
//     productItems.forEach(item => {
        
//         if (category === '*' || item.classList.contains(category)) {
//             item.classList.add('transition-effect');
//             item.classList.remove('shrink-effect');
            
//             item.style.display = 'block';
//         } else {
//             item.classList.remove('transition-effect');
//             item.classList.add('shrink-effect');
//             item.style.display = 'none';
//         }
//     });

//     // Update active class for filter menu items
//     const filterMenuItems = document.querySelectorAll('.filters_menu li');
//     console.log(filterMenuItems);
//     filterMenuItems.forEach(item => {
        
//         if (item.dataset.filter === category) {
//             item.classList.add('active');
//         } else {
//             item.classList.remove('active');
//         }
//     });
// }