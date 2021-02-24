<template>
  <div>
    <div v-if="notEmpty" class="cart__container">
      <h2 class="cart__title">Shopping Cart</h2>
      <div class="cart__field">
        <div class="cart__field--product">Product</div>
        <div class="cart__field--count">Count</div>
        <div class="cart__field--price">Price</div>
        <div class="cart__field--del"></div>
      </div>
      <CartItem
        v-for="product in products"
        :key="product.name"
        :product="product"
      />
      <div class="cart__total">Total: ${{ total }}</div>

      <form class="cart__info" @submit.prevent="formSubmit" v-if="isLogin">
        <div class="cart__info--field">
          <label class="cart__info--label" for="name">Receiver</label>
          <input class="cart__info--input cart__info--input-name" v-model.trim="info.name" type="text" id="name" placeholder="name">
        </div>
        <div class="cart__info--field">
          <label class="cart__info--label" for="tel">Phone</label>
          <input class="cart__info--input cart__info--input-tel" v-model.trim="info.tel" type="tel" id="tel" maxlength="10" placeholder="phone number">
        </div>
        <div class="cart__info--field">
          <label class="cart__info--label" for="address">Address</label>
          <input class="cart__info--input cart__info--input-address" v-model.trim="info.address" type="text" id="address" placeholder="address">
        </div>
        <div v-if="!isValidate" class="cart__info--warn">Please complete the form</div>
        <button class="cart__info--submit">Submit</button>
      </form>
      <button v-else @click="loginDialog" class="cart__login">
        <span class="cart__login--emphasis">Login</span> To Submit Order
      </button>
    </div>
    <div v-else class="cart__container">
      <h2 class="cart__title">Shopping Cart Is Empty</h2>
    </div>
  </div>
</template>

<script>
import CartItem from '@/components/shopCart/CartItem.vue';
export default {
  name: 'ShopCart',
  components: { CartItem },
  data () {
    return {
      info: {
        name: '',
        tel: '',
        address: ''
      },
      isValidate: true
    };
  },
  computed: {
    products () {
      return this.$store.getters.cartItems;
    },
    total () {
      let total = 0;
      for (const product of this.products) {
        total += product.price * product.count;
      }
      return total;
    },
    notEmpty () {
      return this.products.length > 0;
    },
    isLogin () {
      return this.$store.getters.isLogin;
    },
    isOrderSuccess () {
      return this.$store.getters.isOrderSuccess;
    }
  },
  methods: {
    loginDialog () {
      this.$store.commit('loginDialogToggle');
    },
    infoValidate () {
      const validation =
        this.info.name.length > 0 &&
        this.info.tel.length > 0 &&
        this.info.address.length > 0;
      this.isValidate = validation;
    },
    formSubmit () {
      this.infoValidate();
      if (this.isValidate) {
        const payload = {
          username: this.$store.getters.userInfo.username,
          token: this.$store.getters.userInfo.token,
          name: this.info.name,
          tel: this.info.tel,
          address: this.info.address,
          items: this.products,
          total: this.total
        };
        this.$store.dispatch('newOrder', payload);
      } else {
        console.log('not pass');
      }
    }
  },
  watch: {
    isOrderSuccess (newValue) {
      if (newValue) {
        this.info.name = '';
        this.info.tel = '';
        this.info.address = '';
        this.$router.push('order');
        this.$store.dispatch('clearShopCart');
      };
    }
  },
  beforeDestroy () {
    this.$store.commit('initOrderState');
  }
};
</script>

<style lang="scss" scoped>
.cart {

  &__container{
    width: 80%;
    max-width: 140rem;
    margin: 0 auto;
    padding-top: 10rem;
    color: var(--color-primary-dark);
    font-family: 'Montserrat';
    font-size: 3rem;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-family: 'Montserrat';
    font-size: 5rem;
    margin-bottom: 5rem;
  }

  &__field {
    font-family: 'Montserrat';
    font-size: 3rem;
    width: 100%;
    text-align: center;
    margin-bottom: 3rem;
    border: .1rem solid var(--color-primary-dark);
    display: flex;

    &--product {
      flex: 1;
    }

    &--count {
      width: 20%;
      border-left: .1rem solid var(--color-primary-dark);
      border-right: .1rem solid var(--color-primary-dark);
    }

    &--price {
      width: 15%;
    }

    &--del {
      width: 5%;
    }
  }

  &__total {
    letter-spacing: .2rem;
    // margin-right: 5%;
    align-self: flex-end;
  }

  &__info {
    width: 70%;
    margin: 5rem 0;
    display: flex;
    flex-direction: column;

    &--field {
      width: 100%;
      margin-bottom: 1rem;
      display: flex;
      flex-direction: column;
    }

    &--label {
      margin: 1rem 0;
    }

    &--input {
      font-family: 'Montserrat';
      font-size: 3rem;
      color: var(--color-primary-light);
      // background: none;
      background: rgba(16, 29, 44, .6);
      border: .1rem solid var(--color-primary-dark);
      border-radius: 1rem;
      outline: none;
      padding: .5rem 1rem;
    }

    &--warn {
      margin: 1rem 0;
      width: 100%;
      font-size: 2.5rem;
      color: rgba(255, 50, 50, .9);
    }

    &--submit {
      width: 40%;
      margin: 1rem 0;
      font-size: 3rem;
      border: .1rem solid transparent;
      padding: .5rem 1rem;
      align-self: center;

      &:hover {
        border: .1rem solid var(--color-primary-dark);
      }
    }
  }

  &__login {
    font-size: 3rem;
    margin: 5rem 0;

    &--emphasis {
      font-style: italic;
      text-decoration: underline;
    }
  }
}
</style>
