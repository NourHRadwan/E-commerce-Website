var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("ProductPrice");
var productCategoryInput = document.getElementById("ProductCategory");
var productDescriptionInput = document.getElementById("ProductDescription");
var productImageInput = document.getElementById("ProductImage");

var productsContainerElement = document.getElementById("productsContainerElement")
var productList;

// First Time user
if (localStorage.getItem("Products") === null) {
    productList = [];
}
else   // The user is not a first time user, so we retrieve
{
    productList = localStorage.getItem("Products");
    productList = JSON.parse(productList);
    displayProducts(productList);
}


function addToLocalStore() {
    localStorage.setItem("Products", JSON.stringify(productList));
}

function addProduct() {
    var product = {
        productName: productNameInput.value,
        productPrice: productPriceInput.value,
        productCategory: productCategoryInput.value,
        productDescription: productDescriptionInput.value,
        productImage: productImageInput.files[0].name,
    }
    productList.push(product);
    displayProducts(productList);
    addToLocalStore();
    //reset the form fields 
    restProductInputs();
}


function restProductInputs() {
    productNameInput.value = null;
    productPriceInput.value = null;
    productCategoryInput.value = null;
    productDescriptionInput.value = null;
    productImageInput.value = null;
}


function displayProducts(DisplayList) {
    var containerElement = ` `;
    for (var i = 0; i < DisplayList.length; i++) {
        containerElement += `<div class="col"> 
                                <div class="border shadow-sm p-2">
                                <div class="img-container mb-5">
                                    <img class="w-100 h-100 object-fit-contain" src="./Images/${DisplayList[i]["productImage"]}" alt="">
                                </div>
                                    <h3 class="fs-5">${DisplayList[i].productName}</h3>
                                    <p class="fs-6 text-secondary">${DisplayList[i].productDescription}</p>
                                    <p><span class="fw-semibold">Category</span> ${DisplayList[i].productCategory}</p>
                                    <div class="d-flex justify-content-between pe-3">
                                        <p class="fw-semibold">${DisplayList[i].productPrice}</p>
                                    <div>
                                        <i onclick = "deletProducts(${i})" class="fa-solid fa-trash-can fs-6 text-danger"></i>
                                        <i class="fa-solid fa-pen-to-square fs-6 text-success"></i>
                                    </div>
                                        </div>
                                </div>
                            </div>`
    }
    productsContainerElement.innerHTML = containerElement;
}


function deletProducts(indexToDelete) {
    productList.splice(indexToDelete, 1);
    addToLocalStore();
    displayProducts(productList);
}

function searchForProduct(term) {
    var filterdList = [];
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].productName.toLowerCase().includes(term.toLowerCase()) == true) {
            filterdList.push(productList[i]);
        }
    }
    displayProducts(filterdList);
}