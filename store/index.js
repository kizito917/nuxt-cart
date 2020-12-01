export const state = () => ({
    product_id: 0,
    cartCount: 0,
    allSelectedProducts: []
})

export const getters = {
    getCartCount: (state) => {
        return state.allSelectedProducts.length;
    },
    getAllSelectedProducts: (state) => {
        return state.allSelectedProducts;
    }
}
  
export const mutations = {
    GOTTEN_PRODUCT_ID: (state, payload) => {
        state.product_id = payload
    },
    // INCREASE_CART_COUNT: (state, payload) => {
    //     var newCount = state.cartCount + payload
    //     state.cartCount = newCount
    // },
    PRODUCT_TO_CART: (state, payload) => {
        state.allSelectedProducts.push(payload)
    }
}

export const actions = {
    productId: (context, productId) => {
        context.commit('GOTTEN_PRODUCT_ID', productId)
    },
    // cartCountIncrease: ({commit}, count) => {
    //     commit('INCREASE_CART_COUNT', count)
    // },
    selectedProduct: (context, productfromView) => {
        context.commit('PRODUCT_TO_CART', productfromView)
    }
}