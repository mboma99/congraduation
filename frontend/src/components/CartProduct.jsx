import { CartContext } from "../CartContext";
import { useContext } from "react";
import { getProductData } from "../ProductsStore";
import { Image, Divider } from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/24/outline';


function CartProduct({ product }) {
    const cart = useContext(CartContext);
    const quantity = product.quantity;
    const productData = getProductData(product.id);

    return (
        <>
        <hr />
        <div className="flex pt-2 pb-2 w-full justify-between items-center">
            <div className="relative inline-block">
            <Image
                src={productData.image_url}
                fallback=''
                objectFit="cover"
                className="transition-opacity duration-300"
                boxSize="100px"
            />
            <div className="absolute inset-0 bg-black opacity-30"></div> 
              <div className="absolute inset-0 flex items-center opacity-70 justify-center transform -rotate-45"> {/* Watermark */}
                <span className="text-white text-sm">CONGRADUATION</span>
              </div>
            </div>
            <div className="flex w-full justify-evenly">
                <button onClick={ () => cart.removeOneFromCart(productData.id)}>
                    -
                </button>
                <p>{quantity}</p>
                <button onClick={ () => cart.addOneToCart(productData.id)}>
                    +
                </button>
                <p>{(productData.price * quantity).toFixed(2)}</p>
                <button className="text-black absolute right-7" onClick={() => cart.deleteFromCart(product.id)}><TrashIcon className="h-5"/></button>
                
            </div>
        </div>
        <hr />
        </>
    );
} export default CartProduct;