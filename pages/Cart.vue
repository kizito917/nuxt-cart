<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
        <div class="bread-crumb">
          <v-breadcrumbs :items="items">
            <template v-slot:divider>
              <v-icon>mdi-forward</v-icon>
            </template>
          </v-breadcrumbs>
        </div>
      </v-col>
    </v-row>
    <v-row id="cart-table" v-if="cartIsFull">
      <v-col cols="12" md="12">
        <div class="table">
          <table class="table-ui">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Image</th>
                <th>Item Price</th>
                <th>Remove Item</th>
                <th>Item no</th>
                <th>Reduce Item</th>
                <th>Increase Item</th>
              </tr>
            </thead>
            <tbody v-for="product in products" :key="product.id">
              <tr>
                <td>{{ product.name }}</td>
                <td><v-img :src="product.image" alt="product image" class="table-img" /></td>
                <td>${{ product.price }}</td>
                <td><v-btn @click="removeItem(product.id, product.price)"><v-icon>mdi-close</v-icon></v-btn></td>
                <td><v-text-field outlined dense :label="count" class="v-text-field"></v-text-field></td>
                <td>
                  <v-btn class="counter-btn" @click="reduceCount(product.price, product.id)"><v-icon>mdi-minus</v-icon></v-btn>
                </td>
                <td>
                  <v-btn class="counter-btn" @click="increaseCount(product.price, product.id)"><v-icon>mdi-plus</v-icon></v-btn>
                </td>
              </tr>
            </tbody>
          </table>
          <hr>
          <h2>Total Amount = &#36;{{ getTotalPrice }}</h2>
          <hr>
        </div>
      </v-col>
    </v-row>
    <v-row id="empty-cart-div" v-else>
      <h2>Your cart is empty.... <NuxtLink to="/" class="empty-cart-link">Go shopping!!!</NuxtLink></h2>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          text: 'Home',
          disabled: false,
          to: '/',
        },
        {
          text: 'Product Description',
          disabled: false,
          to: 'ProductDescription',
        },
        {
          text: 'Cart',
          disabled: true,
          to: 'Cart',
        },
      ],
      cartIsFull: false,
      count: 1,
    }
  },
  computed: {
    getTotalPrice() {
      return this.$store.getters.getCurrentTotalPrice.toFixed(2)
    },
    products() {
      return this.$store.getters.getAllSelectedProducts
    },
  },
  created() {
    if (this.$store.state.allProductPrice != 0) {
      this.cartIsFull = true
    }
  },
  methods: {
    removeItem(id, price) {
      this.$store.dispatch('removeProduct', id)
      this.$store.dispatch('removeProductPriceFromTotal', price)
    },
    increaseCount(price, id) {
      this.count ++
      alert(id)
      this.$store.dispatch('increaseSingleItemPrice', price)
    },
    reduceCount(price, id) {
      this.count --
      alert(id)
      this.$store.dispatch('decreaseSingleItemPrice', price)
    }
  }
}
</script>

<style scoped>

</style>