<template>
  <div class="container">
    <TheHeader />
    <transition>
      <router-view class="main"/>
    </transition>
    <ProductDialog />
    <LoginDialog />
    <CartIcon
      :footerHeigh="footerHeigh"
      :clientHeight="clientHeight"
      :scrollTop="scrollTop"
      :innerHeight="innerHeight"
      :responseWidth="responseWidth"
    />
    <GoToTop
      :footerHeigh="footerHeigh"
      :clientHeight="clientHeight"
      :scrollTop="scrollTop"
      :innerHeight="innerHeight"
      :responseWidth="responseWidth"
    />
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from '@/views/TheHeader.vue';
import TheFooter from '@/views/TheFooter.vue';
import GoToTop from '@/components/utils/GoToTop.vue';
import CartIcon from '@/components/shopCart/CartIcon.vue';
import ProductDialog from '@/components/product/ProductDialog.vue';
import LoginDialog from '@/components/user/LoginDialog.vue';
export default {
  components: { TheHeader, TheFooter, GoToTop, CartIcon, ProductDialog, LoginDialog },
  data () {
    return {
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
  },
  mounted () {
    this.scrollEvent();
    this.resizeWidth();
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
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: rgb(16, 29, 44) url(./assets/banner-2.png) center center fixed;
}

.main {
  width: 80%;
  max-width: 140rem;
  margin: 0 auto;
  padding-bottom: 25rem;

  @media only screen and (max-width: $bp-largest) {
    width: 90%;
  }
  @media only screen and (max-width: $bp-medium) {
    width: 100%;
  }
}

.v-enter-active {
  transition: opacity 1.2s;
}
.v-leave-active {
  transition: opacity .2s;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
</style>
