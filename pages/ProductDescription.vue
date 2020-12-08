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
      <v-row class="product-desc-row">
        <v-col cols="12" md="5">
          <div class="product-desc-img">
            <div class="product-desc-div">
                <v-img :src="image" class="img" />
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="7">
            <div>
                <h2>{{ title }}</h2>
                <v-rating
                    v-model="rating"
                    color="yellow darken-3"
                    background-color="yellow darken-3"
                    empty-icon="$ratingFull"
                    half-increments
                    hover
                    large
                ></v-rating>
                <h3>${{ price }}</h3><br />
                <v-chip
                    class="ma-2"
                    color="success"
                    outlined
                    >
                    <v-icon left>
                        mdi-server-plus
                    </v-icon>
                    {{ category }}
                </v-chip><br /><br />
                <span>Description: {{ description }} 
                </span><br />
                <v-btn 
                class="dark-primary toCart"
                :loading="loading4"
                :disabled="loading4"
                @click="stopLoader"
                >
                    <v-icon>mdi-cart</v-icon>
                    Add to cart
                </v-btn>
            </div>
        </v-col>
      </v-row>
      <v-snackbar
        :timeout="-1"
        :value="snackBarVal"
        absolute
        centered
        shaped
        bottom
        class="snackbar"
        >
        Added to cart.
      </v-snackbar>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            items: [
                {
                text: 'Home',
                disabled: false,
                to: '/home',
                },
                {
                text: 'Cart',
                disabled: false,
                to: 'Cart',
                },
                {
                text: 'Product Description',
                disabled: true,
                to: 'ProductDescription',
                },
            ],
            image: "",
            rating: 4.7,
            category: '',
            description: '',
            price: 0,
            title: '',
            id: '',
            loader: null,
            loading4: false,
            snackBarVal: false
        }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]
        setTimeout(() => {
            (this[l] = false)
            this.snackBarVal = true
            setTimeout(() => {
                this.snackBarVal = false
            }, 2000);
        }, 2000)
        this.loader = null
      },
    },
    beforeCreate() {
        var productIdFromState = this.$store.state.product_id
        axios.get('https://fakestoreapi.com/products/' + productIdFromState)
        .then((res) => {
            var {category,description,price,title,image,id} = res.data
            this.category = category
            this.description = description
            this.price = price
            this.title = title
            this.image = image
            this.id = id
        })
        .catch((err) => console.log(err))
    },
    methods: {
        stopLoader() {
            this.loader = 'loading4'
            var productAddedToCart = {
                    name: this.title,
                    image: this.image,
                    price: this.price,
                    id: this.id
                }
            this.$store.dispatch('selectedProduct', productAddedToCart)
        }
    }
}
</script>