<template>
  <div>
    <div class="main-content">
      <v-row>
        <v-col cols="12" md="12" class="first-row">
          <h2>{{ title }}</h2>
          <p>Your no 1 online store</p>
        </v-col>
      </v-row>
      <v-row class="product-display-row">
        <v-col cols="12" md="2" v-for="product in products" :key="product.id">
          <div class="product-div" @click="checkProductSpecs(product.id)">
            <v-img :src="product.image" alt="Product Img" class="product-image" />
            <p>{{ product.title }}</p>
            <span>$ {{ product.price }}</span>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-row class="loader-div">
      <div class="sk-cube-grid">
        <div class="sk-cube sk-cube1"></div>
        <div class="sk-cube sk-cube2"></div>
        <div class="sk-cube sk-cube3"></div>
        <div class="sk-cube sk-cube4"></div>
        <div class="sk-cube sk-cube5"></div>
        <div class="sk-cube sk-cube6"></div>
        <div class="sk-cube sk-cube7"></div>
        <div class="sk-cube sk-cube8"></div>
        <div class="sk-cube sk-cube9"></div>
      </div>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  head: {
    title: 'Nuxt Cart',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'nuxt~cart',
        name: 'nuxt~cart',
        content: 'shopping spree platform for all kinds of fashion acessories'
      }
    ],
  },
  data() {
    return {
      title: 'Shopping spree with Nuxt~Cart',
      products: [],
    }
  },
  async beforeCreate() {
    await axios.get('https://fakestoreapi.com/products?limit=12')
      .then((res) => {
        this.products = res.data
      })
      .catch((err) => console.log(err))
  },
  methods: {
    checkProductSpecs(id) {
      this.$store.dispatch('productId', id)
      document.querySelector(".main-content").style.display = "none";
      document.querySelector(".loader-div").style.display = "block";
      setTimeout(() => {
        this.$router.push('/ProductDescription')
      }, 2000);
    }
  }
}
</script>
