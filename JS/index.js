// The main form inputs of the program.
var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("ProductPrice");
var productCategoryInput = document.getElementById("ProductCategory");
var productDescriptionInput = document.getElementById("ProductDescription");
var productImageInput = document.getElementById("ProductImage");
// main buttons of the form
var addProductBtn = document.getElementById("addProductBtn");
var updateProductBtn = document.getElementById( "updateProductBtn");

// displaying the products 
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

// Saving the list to local storage
function addToLocalStore() {
    localStorage.setItem("Products", JSON.stringify(productList));
}


//  Adding new Products to the list
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

// Resting the form after adding or updating a product
function restProductInputs() {
    productNameInput.value = null;
    productPriceInput.value = null;
    productCategoryInput.value = null;
    productDescriptionInput.value = null;
    productImageInput.value = null;
}

//passing DisplayList as argument for the displayProduct function to controll which list should be displayed (filter or full list)
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
                                        <i onclick = "uploadProductDataToForm(${i} );" class="fa-solid fa-pen-to-square fs-6 text-success"></i>
                                    </div>
                                        </div>
                                </div>
                            </div>`
    }
    productsContainerElement.innerHTML = containerElement;
}

// Delete product when the user click on  delete icon
function deletProducts(indexToDelete) {
    productList.splice(indexToDelete, 1);
    addToLocalStore(); //updating the local storage with  new list after deleting a product
    displayProducts(productList); // displaying the updated list
}

// Search for item in the array and displaying the founded items only
function searchForProduct(term) {
    var filterdList = [];
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].productName.toLowerCase().includes(term.toLowerCase()) == true) { //dealing with Case senstive method ("includes")
            filterdList.push(productList[i]); //loading the items in the filtred array
        }
    }
    displayProducts(filterdList); // Displaying the  filtered list on the screen
}

// Part 1 in updating process ==> loading the data from the array to  the HTML page using the function "uploadProductDataToForm"
function uploadProductDataToForm(index)
{
    //loading the value  of each field in the form with data from the selected item on the list
    productNameInput.value = productList[index].productName;
    productPriceInput.value = productList[index].productPrice;
    productCategoryInput.value = productList[index].productCategory;
    productDescriptionInput.value = productList[index].productDescription;
   
   // Switching between the two buttons based on the process ==>  removing Add btn and displaying update Product
    addProductBtn.classList.replace("d-block" , "d-none");
    updateProductBtn.classList.replace("d-none", "d-block") ;
}