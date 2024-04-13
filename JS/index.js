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

var updateProductIndex; //  to keep track of which product is being updated


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
    updateProductIndex = index; //  saving the index of the selected item to use it in updateProduct function
}

// Part 2 in updating process ==> Saving the changes made by the user into the array
function updateProduct(){
    // Saving the changes to product List array
    productList[updateProductIndex].productName = productNameInput.value;
    productList[updateProductIndex].productPrice = productPriceInput.value;
    productList[updateProductIndex].productCategory = productCategoryInput.value;
    productList[updateProductIndex].productDescription = productDescriptionInput.value;

    if (productImageInput.files[0] != undefined) //Check if a new file is selected
    {
        productList[updateProductIndex].productImage = productImageInput.files[0].name;
    }
    else {     
    //if the user doesn't select a new file (productImageInput.files[0] is undefined), assign the existing image value back to the productImage property of the updated product.
        productList[updateProductIndex].productImage = productList[updateProductIndex].productImage;
    }
    addToLocalStore(); // Update the local storage with the modified list
    displayProducts(productList); // Display the updated list
    restProductInputs(); // Reset the form fields
    // Switching back to the Add button after updating
    addProductBtn.classList.replace("d-none", "d-block");
    updateProductBtn.classList.replace("d-block", "d-none");
}

// Function to validate the product name
function isValidProductName()
{
    var ProductNameRegex = /^[A-Z].+$/; //Name should start with capital letter
    //Check if name match the pattern
    if(ProductNameRegex.test(productNameInput.value) == true)
    {
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
    }
    else
    {
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
    }
}