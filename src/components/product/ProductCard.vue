<template>
  <div class="product-card__container">
    <div @click="showDialog" class="product-card__info">
      <div class="product-card__mask">
        <div class="product-card__mask-text">Details</div>
      </div>
      <img
        :src="require(`@/assets/products/${ product.img }`)"
        alt="product"
        class="product-card__image"
      >
    </div>
    <h2 class="product-card__name">{{ product.name }}</h2>
    <div @click="addToCart" class="product-card__price">
      ${{ product.price }}
      <div class="product-card__cta">
        <i class="fas fa-shopping-cart"></i>&#43;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    showDialog () {
      this.$store.commit('openDialog', this.product);
    },
    addToCart () {
      const payload = {
        name: this.product.name,
        img: this.product.img,
        count: 1,
        price: this.product.price
      };
      this.$store.dispatch('addToCart', payload);
    }
  }
};
</script>

<style lang="scss" scoped>
.product-card {

  &__container{
    display: flex;
    flex-direction: column;
    font-size: 1.6rem;
    background-color: var(--color-secondary);
    color: white;
  }

  &__info{
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: zoom-in;
  }

  &__mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    height: 100%;
    width: 100%;

    transition: .3s linear;
    &:hover {
      opacity: 1;
    }

    &-text {
      font-size: 3rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__image {
    display: block;
    width: 100%;
    object-fit: contain;
    overflow: hidden;
  }

  &__name {
    font-size: 3rem;
    text-align: center;
    padding: .5rem 0;
    margin: .5rem 0;
    color: var(--color-primary-dark);
    background-color: var(--color-secondary);
  }

  &__price {
    font-family: 'Montserrat';
    font-size: 2rem;
    font-style: italic;
    letter-spacing: .3rem;
    text-align: center;
    padding: .5rem;
    color: var(--color-primary-dark);
    background-color: var(--color-secondary);
    border: .1rem solid var(--color-primary-dark);
    // transition: .3s linear;

    display: flex;
    justify-content: space-evenly;

    &:hover {
      cursor: pointer;
      font-weight: 700;
      font-style: normal;
      background-color: var(--color-primary-dark);
      color: var(--color-secondary);
    }

    &:hover .product-card__cta {
      display: inline-block;
    }

    &:active {
      transform: translateY(.1rem);
    }
  }

  &__cta {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: normal;
    display: none;

    align-self: center;
  }
}

.flex-space {
  flex: 1;
}
</style>
