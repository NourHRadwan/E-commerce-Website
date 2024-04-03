var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("ProductPrice");
var productCategoryInput = document.getElementById("ProductCategory");
var productDescriptionInput = document.getElementById("ProductDescription");
var productImageInput = document.getElementById("ProductImage");

var productList = [ ];

function addProduct(){
    var product = {
        productName : productNameInput.value,
        productPrice : productPriceInput.value,
        productCategory : productCategoryInput.value,
        productDescription : productDescriptionInput.value,
        productImage : productImageInput.files[0].name,
    }
    productList.push(product);
    console.log(product);
    restProductInputs();
}

console.log(productList)

function restProductInputs(){
     productNameInput.value = '';
     productPriceInput.value = '';
     productCategoryInput.value = 'choose product category'; // Set a default value or choose the appropriate default option value
     productDescriptionInput.value = '';
     productImageInput.value = null;
 }