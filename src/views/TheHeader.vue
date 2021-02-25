<template>
  <header class="header" @click="closeHamburger">
    <nav class="nav">
      <router-link to="/" class="nav__link-home">
        <img src="@/assets/logo.png" alt="" class="nav__logo">
      </router-link>

      <label @click.stop class="nav__hamburger--btn" for="ham"><i class="fas fa-bars"></i></label>
      <input v-model="hamburgerToggle" @click.stop="toggleHamburger" class="nav__hamburger" type="checkbox" id="ham">

      <div class="nav__group">
        <router-link to="/products" class="nav__group--btn">
          <span class="nav__group--btn-text">Products</span>
        </router-link>
        <router-link to="/order" class="nav__group--btn">
          <span class="nav__group--btn-text">Order</span>
        </router-link>
        <div v-if="!isLogin" @click="login" class="nav__group--btn">
          <span class="nav__group--btn-text">Login</span>
        </div>
        <div v-else @click="logout" class="nav__group--btn">
          <span class="nav__group--btn-text">Logout</span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      hamburgerToggle: false
    };
  },
  computed: {
    isLogin () {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    login () {
      this.$store.commit('openLoginDialog');
    },
    logout () {
      this.$store.dispatch('logout');
    },
    closeHamburger () {
      this.hamburgerToggle = false;
    },
    toggleHamburger () {
      this.hamburgerToggle = !this.hamburgerToggle;
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  height: 6vw;
  min-height: 6.5rem;
  max-height: 9rem;
  background: rgba(178, 132, 81, .9) url(../assets/banner-1.png) center center fixed;
}

.nav {
  width: 90%;
  max-width: 150rem;
  height: 100%;
  color: var(--color-secondary);
  margin: 0 auto;
  font-size: 3.5rem;
  position: relative; //for RWD

  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: $bp-medium) {
    width: 100%;
    padding: 0 2rem;
  }

  &__link-home {
    height: 100%;
    display: block;
  }

  &__logo {
    display: block;
    height: 100%;
    object-fit: contain;
    overflow: hidden;
    padding-top: .5rem;
  }

  &__group {
    display: flex;

    @media only screen and (max-width: $bp-medium) {
      position: absolute;
      top: 100%;
      right: 0;
      width: 100%;
      flex-direction: column;
      z-index: 20;
      background: rgba(178, 132, 81, .9) url(../assets/banner-1.png) center center fixed;
      transition: max-height .2s ease-out;
      overflow: hidden;
      max-height: 0;
    }

    &--btn {
      cursor: pointer;
      padding: .5rem 2rem;
      font-weight: 700;
      display: flex;
      align-items: center;

      @media only screen and (max-width: $bp-medium) {
        border-top: .2rem solid rgba(255, 255, 255, .1);
      }

      &:hover {
        background: rgba(255, 255, 255, .1);
      }
    }
  }

  &__hamburger {
    display: none;

    &::before,
    &::after {
      display: block;
      height: 100%;
      position: absolute;
      transition: all .2s ease-out;
      width: 100%;
    }

    &:checked + .nav__group {
      max-height: 300%;
    }

    &--btn {
      cursor: pointer;
      font-size: 3rem;
      align-self: center;
      margin-top: 1rem;
      display: none;

      @media only screen and (max-width: $bp-medium) {
      display: block
      }
    }
  }
}
</style>
