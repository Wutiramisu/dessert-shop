<template>
  <header class="header" @click="closeHamburger">
    <nav class="nav">
      <router-link to="/" class="nav__link-home">
        <img src="@/assets/logo.svg" alt="" class="nav__logo">
      </router-link>

      <div class="nav__space"></div>

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
  // background: rgba(178, 132, 81, .8);
  background: var(--color-primary-dark) url(../assets/banner-1.png);
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

  @media only screen and (max-width: $bp-small) {
    width: 100%;
  }

  &__link-home {
    width: 13.5vw;
    min-width: 14rem;
    max-width: 21rem;
    padding: .5rem 0;

  }

  &__logo {
    height: 100%;
    color: var(--color-secondary);

    @media only screen and (max-width: $bp-small) {
      margin-left: 2rem;
    }
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
      // background: rgba(178, 132, 81, .8);
      background: rgba(178, 132, 81, .9) url(../assets/banner-1.png);
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

      @media only screen and (max-width: $bp-small) {
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

      @media only screen and (max-width: $bp-small) {
        margin-right: 2rem;
      }
    }
  }

  &__space {
    flex: 1;
  }
}
</style>
