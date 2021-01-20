import { Reducer } from "react";
import  produce  from "immer";
import { addProductToCartSuccess } from "./actions";
import { ICartState } from "./types";

const INITIAL_STATE: ICartState = {
    items: [],
    failedStockCheck: []
};


type ActionRequest = ReturnType<typeof addProductToCartSuccess>

const cart: Reducer<ICartState, ActionRequest> = (state = INITIAL_STATE, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case 'ADD_PRODUCT_TO_CART_SUCCESS': {

                const { product } = action.payload;

                const productInCartIndex = state.items.findIndex(item =>{
                    return item.product.id === product.id;
                });

                if(productInCartIndex >= 0){
                    draft.items[productInCartIndex].quantity++;
                }else{
                    draft.items.push({
                        product,
                        quantity: 1
                    });
                }
                
                break;
            }
            case 'ADD_PRODUCT_TO_CART_FAILURE': {

                draft.failedStockCheck.push(action.payload.product.id);
                
                break;
            }
            default: {
                return draft;
            }
        }
    });
}

export default cart;