import { useState } from "react";

let productsArray = localStorage.getItem("Products");
if (productsArray) {
    productsArray = JSON.parse(productsArray);
} else {
    console.log("Products array is null or undefined");
    productsArray = [];
}

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (!productData) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, getProductData };
