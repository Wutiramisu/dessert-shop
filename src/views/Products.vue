<template>
  <div class="products">
    <div class="products__category">
      <h3 class="products__list-title">Products</h3>
      <ul class="products__list">
        <li
          @click="showAll"
          class="list-item--all"
          :class="active === 'all' ? 'active' : ''"
        >
        All
        </li>
        <li
          @click="showCakes"
          class="list-item--cake"
          :class="active === 'cake' ? 'active' : ''"
        >
        Cakes
        </li>
        <li
          @click="showDonuts"
          class="list-item--donut"
          :class="active === 'donut' ? 'active' : ''"
        >
        Donuts
        </li>
        <li
          @click="showIceCream"
          class="list-item--iceCream"
          :class="active === 'iceCream' ? 'active' : ''"
        >
        Ice Cream
        </li>
      </ul>
    </div>
    <div class="products__item">
      <ProdcutCard
        v-for="product in productFilter"
        :key="product.name"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import ProdcutCard from '@/components/product/ProductCard.vue';
export default {
  components: { ProdcutCard },
  data () {
    return {
      products: [],
      productFilter: [],
      active: null
    };
  },
  methods: {
    async init () {
      this.products = await this.$store.getters.getProducts;
      this.active = this.$route.query.product;
      switch (this.$route.query.product) {
      case 'cake':
        this.showCakes();
        break;
      case 'donut':
        this.showDonuts();
        break;
      case 'iceCream':
        this.showIceCream();
        break;
      default:
        this.showAll();
        break;
      }
    },
    showAll () {
      this.productFilter = this.products;
      this.active = 'all';
    },
    showCakes () {
      this.productFilter = this.products.filter(val => val.category === 'cake');
      this.active = 'cake';
    },
    showDonuts () {
      this.productFilter = this.products.filter(val => val.category === 'donut');
      this.active = 'donut';
    },
    showIceCream () {
      this.productFilter = this.products.filter(val => val.category === 'iceCream');
      this.active = 'iceCream';
    }
  },
  mounted () {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.products {
  width: 80%;
  max-width: 140rem;
  margin: 0 auto;
  margin-top: 10rem;
  // padding: 10rem 0;

  display: flex;

  &__category {
    flex: 1;

    font-family: 'Montserrat';
    font-size: 2.5rem;
    font-style: italic;
    color: var(--color-primary-dark);
    padding-right: 5rem;
  }

  &__list-title {
    margin-bottom: 2rem;
  }

  &__list li{
    padding: .5rem 1rem ;
    border-bottom: .1rem solid var(--color-primary-dark);
    transition: .2s linear;

    &:hover {
      cursor: pointer;
      background-color: var(--color-primary-light);
      color: var(--color-secondary);
    }
  }

  &__item {
    margin-bottom: 3rem;
    flex: 3;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    column-gap: 3rem;
    row-gap: 5rem;
  }
}

.active {
  background-color: var(--color-primary-dark);
  color: var(--color-secondary);
  font-weight: 700;
}
</style>
