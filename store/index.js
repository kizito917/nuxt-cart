let cart = localStorage.getItem('cart');
let price = Number(localStorage.getItem('price'));
export const state = () => ({
    product_id: 0,
    cartCount: 0,
    allSelectedProducts: cart ? JSON.parse(cart) : [],
    allProductPrice: price ? price : 0,
    itemNo: 1
})

export const getters = {
    getCartCount: (state) => {
        return state.allSelectedProducts.length;
    },
    getAllSelectedProducts: (state) => {
        return state.allSelectedProducts;
    },
    getCurrentTotalPrice: (state) => {
        return state.allProductPrice;
    }
}
  
export const mutations = {
    GOTTEN_PRODUCT_ID: (state, payload) => {
        state.product_id = payload
    },
    PRODUCT_TO_CART: (state, payload) => {
        let found = state.allSelectedProducts.find(product => product.id == payload.id);
        if (found) {
            var newPrice = state.allProductPrice + found.price
            state.allProductPrice = newPrice
            localStorage.setItem('price', state.allProductPrice)
            state.itemNo ++
        } else {
            state.allSelectedProducts.push(payload)
            localStorage.setItem('cart', JSON.stringify(state.allSelectedProducts))
            var price = []
            price.push(payload)
            price.forEach(item => {
                var newPrice = ((state.allProductPrice / 10) * 10) + item.price
                state.allProductPrice = newPrice
                localStorage.setItem('price', state.allProductPrice)
            })
        }
    },
    REMOVE_FROM_CART: (state, payload) => {
        let arr = state.allSelectedProducts
        arr = arr.filter(item => item.id !== payload)
        state.allSelectedProducts = arr
        //updating the cart in local storage after removal
        localStorage.setItem('cart', JSON.stringify(state.allSelectedProducts))
    },
    REMOVE_PRICE: (state, payload) => {
        var newPrice = state.allProductPrice - payload
        state.allProductPrice = newPrice
        //updating price in local storage after removal
        localStorage.setItem('price', state.allProductPrice)
    },
    INCREASE_SINGLE_ITEM_PRICE: (state, payload) => {
        var newPrice = state.allProductPrice + payload
        state.allProductPrice = newPrice
    },
    DECREASE_SINGLE_ITEM_PRICE: (state, payload) => {
        var newPrice = state.allProductPrice - payload
        state.allProductPrice = newPrice
    }
}

export const actions = {
    productId: (context, productId) => {
        context.commit('GOTTEN_PRODUCT_ID', productId)
    },
    selectedProduct: (context, productfromView) => {
        context.commit('PRODUCT_TO_CART', productfromView)
    },
    removeProduct: ({commit}, id) => {
        commit('REMOVE_FROM_CART', id)
    },
    removeProductPriceFromTotal: (context, productPrice) => {
        context.commit('REMOVE_PRICE', productPrice)
    },
    increaseSingleItemPrice: ({commit}, data) => {
        commit('INCREASE_SINGLE_ITEM_PRICE', data)
    },
    decreaseSingleItemPrice: ({commit}, data) => {
        commit('DECREASE_SINGLE_ITEM_PRICE', data)
    }
}