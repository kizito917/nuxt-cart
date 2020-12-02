export const state = () => ({
    product_id: 0,
    cartCount: 0,
    allSelectedProducts: [],
    allProductPrice: 0,
})

export const getters = {
    getCartCount: (state) => {
        return state.allSelectedProducts.length;
    },
    getAllSelectedProducts: (state) => {
        return state.allSelectedProducts;
    },
    getCurrentTotalPrice: (state) => {
        return state.allProductPrice
    }
}
  
export const mutations = {
    GOTTEN_PRODUCT_ID: (state, payload) => {
        state.product_id = payload
    },
    PRODUCT_TO_CART: (state, payload) => {
        state.allSelectedProducts.push(payload)
        var price = []
        price.push(payload)
        price.forEach(item => {
            var newPrice = state.allProductPrice + item.price
            state.allProductPrice = newPrice
        })
    },
    REMOVE_FROM_CART: (state, payload) => {
        let arr = state.allSelectedProducts
        arr = arr.filter(item => item.id !== payload)
        state.allSelectedProducts = arr
    },
    REMOVE_PRICE: (state, payload) => {
        var newPrice = state.allProductPrice - payload
        state.allProductPrice = newPrice
    },
    INCREASE_SINGLE_ITEM_PRICE: (state, payload) => {
        var newPrice = state.allProductPrice + payload
        state.allProductPrice = newPrice
    },
    DECREASE_SINGLE_ITEM_PRICE: (state, payload) => {
        var newPrice = state.allProductPrice - payload
        state.allProductPrice = newPrice
        alert(state.allProductPrice)
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
    decreaseSingleItemPrice: ({commit, data}) => {
        commit('DECREASE_SINGLE_ITEM_PRICE', data)
    }
}