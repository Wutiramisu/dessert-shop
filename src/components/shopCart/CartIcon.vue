<template>
  <router-link
    to="/cart"
    v-if="!hideIcon && !isEmptyCart"
    class="cart__wrapper"
    :class="{ 'num-change': isChange }"
    :style="{ bottom: iconBottom + 'px' }"
  >
    <i class="fas fa-shopping-cart cart__icon"></i>
    <div class="cart__num">{{ cartNum }}</div>
  </router-link>
</template>

<script>
export default {
  data () {
    return {
      hideIcon: false,
      isChange: false,
      iconBottom: 100,
      footerHeigh: 150,
      clientHeight: null,
      scrollTop: null,
      innerHeight: null
    };
  },
  created () {
    window.addEventListener('scroll', this.scrollEvent);
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollEvent);
  },
  methods: {
    scrollEvent () {
      this.clientHeight = document.body.clientHeight;
      this.scrollTop = document.scrollingElement.scrollTop;
      this.innerHeight = window.innerHeight;
    }
  },
  computed: {
    cartNum () {
      return this.$store.getters.cartItems.length;
    },
    isEmptyCart () {
      return this.cartNum === 0;
    }
  },
  watch: {
    $route (to) {
      if (to.path === '/cart' || to.path === '/order') {
        this.hideIcon = true;
      } else {
        this.hideIcon = false;
      }
    },
    cartNum () {
      this.isChange = !this.isChange;
      setTimeout(() => {
        this.isChange = !this.isChange;
      }, 500);
    },
    scrollTop () {
      const bottomDistance = this.clientHeight - this.scrollTop - this.innerHeight;
      if (bottomDistance <= this.footerHeigh) {
        this.iconBottom = this.footerHeigh - bottomDistance + 100;
      } else if (this.iconBottom > 100) {
        this.iconBottom = 100;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cart {

  &__wrapper {
    font-size: 2.5rem;
    width: 7rem;
    height: 7rem;
    position: fixed;
    right: 3.5rem;
    z-index: 100;
    border-radius: 50%;
    background-color: rgba(178, 132, 81, .7);
    color: var(--color-secondary);
    transition: transform .5s, background-color .5s;

    &:hover {
      background-color: rgba(198, 153, 99, 1);
    }
  }

  &__icon {
    position: absolute;
    top: 65%;
    left: 48%;
    transform: translate(-50%, -50%);
  }

  &__num {
    font-family: 'Montserrat';
    font-weight: 700;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.num-change {
  background: rgb(198, 153, 99) !important;
  transform: rotateY(90deg);
}
</style>
