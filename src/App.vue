<template>
  <div class="container">
    <TheHeader />
    <transition>
      <router-view class="main"/>
    </transition>
    <ProductDialog />
    <LoginDialog />
    <CartIcon />
    <GoToTop />
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
  components: { TheHeader, TheFooter, GoToTop, CartIcon, ProductDialog, LoginDialog }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background: var(--color-secondary) url(./assets/banner-2.png);
}

.main {
  width: 80%;
  max-width: 140rem;
  margin: 0 auto;
  padding-bottom: 25rem;
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
