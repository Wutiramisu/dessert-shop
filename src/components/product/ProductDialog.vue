<template>
  <div class="productDialog">
    <transition name="fade-back">
    <div v-if="getDialogState" @click="close" class="backdrop"></div>
    </transition>
    <transition name="fade">
    <dialog v-if="getDialogState" class="dialog" open>
      <div class="dialog__container">
        <div class="dialog__title">{{ product.name }}</div>

        <div class="dialog__main">
          <div class="dialog__top">
            <img
            :src="require(`@/assets/products/${ product.img }`)"
            alt=""
            class="dialog__top--img"
            >
          </div>
          <div class="dialog__bottom">
            <p class="dialog__bottom--desc">Lorem ipsum dolor sit amet consectetur. Praesentium nisi dolorem nemo, eaque nostrum.</p>
            <div class="flex-space"></div>
            <div class="dialog__cta">
              <div class="dialog__cta-lt">
                <span class="dialog__cta-label" for="count">Count: </span>
                <button @click="minus" class="dialog__cta-minus">&#45;</button>
                <input v-model="count" class="dialog__cta-input" type="number" id="count">
                <button @click="plus" class="dialog__cta-plus">&#43;</button>
              </div>
              <div class="flex-space"></div>
              <div class="dialog__cta-rb">
                <button @click="addToCart" class="dialog__cta-btn">Add</button>
              </div>
              <!-- <div class="flex-space"></div> -->
            </div>
          </div>
        </div>
      </div>
    </dialog>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 1
    };
  },
  computed: {
    getDialogState () {
      return this.$store.getters.getDialogState;
    },
    product () {
      return this.$store.getters.getDialogProduct;
    }
  },
  methods: {
    close () {
      this.count = 1;
      this.$store.dispatch('closeDialog');
    },
    minus () {
      this.count -= 1;
    },
    plus () {
      this.count += 1;
    },
    addToCart () {
      const payload = {
        name: this.product.name,
        img: this.product.img,
        count: this.count,
        price: this.product.price
      };
      this.$store.dispatch('addToCart', payload);
      this.count = 1;
      this.close();
    }
  },
  watch: {
    count: function (newValue, oldValue) {
      if (newValue <= 0) {
        this.count = 1;
      } else if (newValue >= 10) {
        this.count = 10;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 200;
}

.dialog {
  position: fixed;
  top: 5vh;
  left: 30%;
  width: 40%;
  height: 90vh;
  max-height: 85rem;
  z-index: 300;
  border-radius: .2rem;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: .7%;
  margin: 0;
  overflow: hidden;
  background-color: var(--color-secondary);

  @media only screen and (max-width: $bp-largest) {
    left: 20%;
    width: 60%;
  }

  @media only screen and (max-width: $bp-medium) {
    top: 10vh;
    left: 15%;
    width: 70%;
    height: 80vh;
  }

  @media only screen and (max-width: $bp-small) {
    left: 10%;
    width: 80%;
    max-height: 55rem;
  }

  &__container {
    color: var(--color-primary-dark);
    width: 100%;
    height: 100%;
    padding: 1.5%;
    border: .15rem solid var(--color-primary-dark);

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    font-size: 5rem;
    text-align: center;
    letter-spacing: 1rem;

    @media only screen and (max-width: $bp-medium) {
      font-size: 4rem;
    }

    @media only screen and (max-width: $bp-small) {
      font-size: 3rem;
    }
  }

  &__main {
    width: 100%;
    height: 100%;
    padding: 2.5% 0;
    display: flex;
    flex-direction: column;

    align-items: center;
  }

  &__top{
    width: 80%;

    &--img {
      display: block;
      width: 100%;
      max-width: 45rem;
      margin: 0 auto;
      object-fit: contain;
      overflow: hidden;

      @media only screen and (max-width: $bp-medium) {
        width: 90%;
      }
    }
  }

  &__bottom {
    height: 100%;
    margin: 2rem;
    display: flex;
    flex-direction: column;

    &--desc {
      font-size: 3.5rem;

      @media only screen and (max-width: $bp-medium) {
        font-size: 3rem;
      }

      @media only screen and (max-width: $bp-small) {
        font-size: 2rem;
      }
    }
  }

  &__cta {
    font-family: 'Montserrat';
    font-size: 2.5rem;
    color: var(--color-primary-dark);
    display: flex;
    justify-content: flex-end;
    align-items: center;

    @media only screen and (max-width: $bp-medium) {
      font-size: 2rem;
    }

    &--lt {

    }

    &--rb {

    }

    &-label {
      margin-right: 1rem;
    }

    &-input {
      font-size: 3rem;
      color: var(--color-primary-dark);
      background-color: var(--color-secondary);
      border: none;
      width: 10%;
      outline: none;
      text-align: center;

      @media only screen and (max-width: $bp-medium) {
        font-size: 2rem;
      }
    }

    &-minus,
    &-plus {
      background-color: none;
      color: currentColor;
      font-family: 'Montserrat';
      font-size: 3rem;
      width: 5%;

      @media only screen and (max-width: $bp-medium) {
        font-size: 2rem;
        width: 10%;
      }
    }

    &-btn {
      font-size: inherit;

      &::after {
        content: "";
        display: block;
        height: .1rem;
        width: 0;
        background: var(--color-primary-dark);
        transition: all ease-in-out .2s;
      }

      &:hover::after {
        width: 100%;
      }

      &:active {
        transform: translateY(.2rem);
      }
    }
  }
}

.flex-space {
    flex: 1;
}

.fade-enter-active, .fade-leave-active,
.fade-back-enter-active, .fade-back-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to,
.fade-back-enter, .fade-back-leave-to {
  opacity: 0;
}
</style>
