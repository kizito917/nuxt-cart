<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <NuxtLink to="/Cart" class="cart-link">
        <v-icon>mdi-cart</v-icon>{{ cartCounter }}
        </NuxtLink>
      </v-btn>
    </v-app-bar>
    <nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Nuxt~Cart',
    }
  },
  computed: {
    cartCounter() {
      return this.$store.getters.getCartCount
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
