<template>
  <router-link
    to="/cart"
    v-if="!hideIcon && !isEmptyCart"
    class="cart__wrapper"
    :class="{ 'num-change': isChange }"
    :style="{ bottom: dynamicIconBottom + 'px' }"
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
      dynamicIconBottom: 170,
      initFixedPoistion: 170,
      footerHeigh: 150,
      clientHeight: null,
      scrollTop: null,
      innerHeight: null,
      responseWidth: null
    };
  },
  created () {
    window.addEventListener('scroll', this.scrollEvent);
    window.addEventListener('resize', this.resizeWidth);
    this.dynamicIconBottom = window.innerWidth <= 600 ? 0 : 170;
    this.resizeWidth();
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollEvent);
    window.removeEventListener('resize', this.resizeWidth);
  },
  methods: {
    scrollEvent () {
      this.clientHeight = document.body.clientHeight;
      this.scrollTop = document.scrollingElement.scrollTop;
      this.innerHeight = window.innerHeight;
    },
    resizeWidth () {
      this.responseWidth = window.innerWidth;
    }
  },
  computed: {
    cartNum () {
      return this.$store.getters.cartItems.length;
    },
    isEmptyCart () {
      if (this.responseWidth <= 600) return false;
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
        this.dynamicIconBottom = this.footerHeigh - bottomDistance + this.initFixedPoistion;
      } else if (this.dynamicIconBottom > this.initFixedPoistion) {
        this.dynamicIconBottom = this.initFixedPoistion;
      }
    },
    responseWidth (newValue) {
      if (newValue <= 600) {
        this.initFixedPoistion = 0;
        this.dynamicIconBottom = 0;
      } else {
        this.initFixedPoistion = 170;
        this.dynamicIconBottom = 170;
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

    @media only screen and (max-width: $bp-small) {
      font-size: 1.5rem;
      width: 50%;
      height: 4rem;
      right: 0;
      border-radius: 0;
    }

    &:hover {
      background-color: rgba(198, 153, 99, 1);
    }
  }

  &__icon {
    position: absolute;
    top: 65%;
    left: 48%;
    transform: translate(-50%, -50%);
    transition: transform .5s;

    @media only screen and (max-width: $bp-small) {
      top: 65%;
      left: 50%;
    }
  }

  &__num {
    font-family: 'Montserrat';
    font-weight: 700;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);

    @media only screen and (max-width: $bp-small) {
      top: 30%;
      left: 51%;
    }
  }
}

.num-change {
  background: rgb(198, 153, 99) !important;

  @media only screen and (min-width: $bp-small) {
    transform: rotateY(90deg);
  }
}
</style>
