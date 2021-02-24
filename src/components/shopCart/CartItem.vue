<template>
  <div class="item">
    <div class="item__img-wrap">
      <img :src="require(`@/assets/products/${ product.img }`)" alt="" class="item__img">
    </div>
    <div class="item__name">{{ product.name }}</div>
    <div class="item__count">
      <button @click="minus" class="item__count-minus">&#45;</button>
      <input v-model="count" class="item__count-input" type="number">
      <button @click="plus" class="item__count-plus">&#43;</button>
    </div>
    <div class="item__priceSum">${{ priceSum }}</div>
    <div @click="deleteItem" class="item__delete">&#10761;</div>
  </div>
</template>

<script>
export default {
  props: ['product'],
  data () {
    return {
      name: '',
      count: null
    };
  },
  computed: {
    priceSum () {
      return this.product.count * this.product.price;
    }
  },
  methods: {
    minus () {
      this.count -= 1;
    },
    plus () {
      this.count += 1;
    },
    deleteItem () {
      this.$store.dispatch('deleteItem', { name: this.name });
    }
  },
  watch: {
    count: function (newValue, oldValue) {
      if (newValue <= 0) {
        this.count = 1;
      } else if (newValue >= 10) {
        this.count = 10;
      }
      this.$store.dispatch('changeCount', { name: this.name, count: this.count });
    }
  },
  mounted () {
    this.count = this.product.count;
    this.name = this.product.name;
  }
};
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: .1rem solid var(--color-primary-dark);
  padding-bottom: 2rem;
  margin-bottom: 5rem;

  &__img {
    display: block;
    width: 50%;

    &-wrap {
      width: 20%;
    }
  }

  &__name {
    font-family: 'Parisienne';
    font-size: 4rem;
    flex: 1;
    text-align: center;
  }

  &__count {
    width: 20%;
    text-align: center;

    &-input {
      font-family: 'Montserrat';
      font-size: 3rem;
      color: var(--color-primary-dark);
      background-color: var(--color-secondary);
      // border: none;
      border: .1rem solid var(--color-primary-dark);
      width: 30%;
      outline: none;
      text-align: center;
    }

    &-minus,
    &-plus {
      background-color: var(--color-secondary);
      color: var(--color-primary-dark);
      cursor: pointer;
      font-family: 'Montserrat';
      font-size: 3rem;
      width: 20%;
      border: .1rem solid var(--color-primary-dark);
    }
  }

  &__priceSum {
    font-family: 'Montserrat';
    font-style: italic;
    font-size: 3rem;
    text-align: center;
    width: 15%;
  }

  &__delete {
    cursor: pointer;
    width: 5%;
    font-size: 3rem;
    text-align: center;

    &:active {
      transform: translateY(.2rem);
    }
  }
}
</style>
