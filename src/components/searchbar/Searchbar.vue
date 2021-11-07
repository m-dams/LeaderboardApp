<template>
  <div class="ui icon input" style="width: 100%">
    <input type="text" placeholder="Search..." />
    <i class="search icon"></i>
  </div>
  <div
    class="card ui fluid"
    v-for="product in products"
    :key="product.id"
    style="margin: 0"
  ></div>
  <div class="ui cards" style="margin: 10px">
    <div
      class="card ui fluid"
      v-for="product in products"
      :key="product.id"
      style="margin: 0"
    >
      <div class="content">
        <img class="right floated mini ui image" :src="product.imageURL" />
        <div class="header">{{ product.title }}</div>
        <div class="meta">
          {{ product.upc }} | {{ product.weight }} Kg |
          {{ product.itemsperpack }} pack
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from "firebase";
import { onMounted, reactive } from "vue";
export default {
  setup() {
    const products = reactive([]);
    onMounted(async () => {
      //   try {
      //     const productsSnap = await firebase
      //       .firestore()
      //       .collection("products")
      //       .get();
      //     productsSnap.forEach((doc) => {
      //       products.push(doc.data());
      //     });
      //   } catch (e) {
      //     console.log("Error Loading Products");
      //   }
    });
    return { products };
  },
};
</script>
