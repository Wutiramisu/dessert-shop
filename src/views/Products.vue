<template>
  <div class="products">
    <div class="products__category">
      <h3 class="products__category--title">Products</h3>
      <ul>
        <li
          @click="productFilter('all')"
          class="products__category--name"
          :class="active === 'all' ? 'active' : ''"
        >
        All
        </li>
        <li
          @click="productFilter('cake')"
          class="products__category--name"
          :class="active === 'cake' ? 'active' : ''"
        >
        Cakes
        </li>
        <li
          @click="productFilter('donut')"
          class="products__category--name"
          :class="active === 'donut' ? 'active' : ''"
        >
        Donuts
        </li>
        <li
          @click="productFilter('iceCream')"
          class="products__category--name"
          :class="active === 'iceCream' ? 'active' : ''"
        >
        Ice Cream
        </li>
      </ul>
    </div>
    <div class="products__items">
      <ProdcutCard
        v-for="product in filterList"
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
      filterList: [],
      active: null
    };
  },
  computed: {
    getProducts () {
      return this.$store.getters.getProducts;
    }
  },
  methods: {
    productFilter (query = 'all') {
      if (query === 'all') {
        this.filterList = this.getProducts;
      } else {
        this.filterList = this.getProducts.filter(val => val.category === query);
      }
      this.active = query;
    }
  },
  mounted () {
    this.active = this.$route.query.product;
    this.productFilter(this.active);
  }
};
</script>

<style lang="scss" scoped>
.products {
  width: 80%;
  max-width: 140rem;
  margin: 0 auto;
  margin-top: 10rem;
  // padding-bottom: 35rem;
  display: flex;

  @media only screen and (max-width: $bp-large) {
    flex-direction: column;
  }

  @media only screen and (max-width: $bp-small) {
    width: 90%;
    margin-top: 5rem;
  }

  &__category {
    flex: 1;
    font-family: 'Montserrat';
    font-size: 2.5rem;
    font-style: italic;
    color: var(--color-primary-dark);
    padding-right: 5rem;

    @media only screen and (max-width: $bp-large) {
      padding: 0;
      margin-bottom: 2rem;
    }

    &--title {
      margin-bottom: 2rem;

      @media only screen and (max-width: $bp-large) {
        text-align: center;
      }
    }

    &--name {
      padding: .5rem 1rem ;
      border-bottom: .1rem solid var(--color-primary-dark);
      transition: .2s linear;

      &:hover {
        cursor: pointer;
        background-color: var(--color-primary-light);
        color: var(--color-secondary);
      }
    }
  }

  &__items {
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
