<template>
  <div class="loginDialog">
    <transition name="fade-back">
      <div v-if="loginDialog" @click="close" class="backdrop"></div>
    </transition>
    <transition name="fade">
      <dialog v-if="loginDialog" class="dialog" open>
        <form class="form">
          <label class="form__label" for="username">Username</label>
          <input class="form__input" v-model="username" type="text" id="username">
          <label class="form__label" for="password">Password</label>
          <input class="form__input" v-model="password" type="password" id="password">
          <div class="form__msg" :class="{ 'form__msg--loop': msgAnimation, 'form__msg--first': errMsg }">Try Again</div>
          <Spinner v-if="spinnerShow" />
          <div class="form__btn">
            <button class="form__btn--login" @click.prevent="login">Login</button>
            <button class="form__btn--register" @click.prevent="register">Register</button>
          </div>
        </form>
      </dialog>
    </transition>
  </div>
</template>

<script>
import Spinner from '@/components/utils/Spinner.vue';
export default {
  components: { Spinner },
  name: 'LoginDialog',
  data () {
    return {
      username: '',
      password: '',
      errMsg: false,
      msgAnimation: false,
      spinnerShow: false
    };
  },
  computed: {
    loginDialog () {
      return this.$store.getters.loginDialog;
    },
    actionFailed () {
      return this.$store.getters.errMsg.length;
    },
    isLogin () {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    close () {
      this.$store.commit('closeLoginDialog');
      this.username = '';
      this.password = '';
      // 因為組件掛載在全域，所以關掉的時候要將狀態重置，避免下次打開直接觸發動畫
      this.errMsg = false;
      this.msgAnimation = false;
      this.spinnerShow = false;
    },
    login () {
      this.spinnerShow = true;
      this.$store.dispatch('login', { username: this.username, password: this.password });
    },
    register () {
      this.spinnerShow = true;
      this.$store.dispatch('register', { username: this.username, password: this.password });
    }
  },
  watch: {
    actionFailed () {
      this.errMsg = true;
      this.msgAnimation = false;
      setTimeout(() => { this.msgAnimation = true; }, 200);
    },
    isLogin (newValue) {
      if (newValue) {
        this.$store.commit('clearErrMag');
        this.close();
        const samePage = this.$router.currentRoute === this.$router.originTo;
        if (!samePage) this.$router.push(this.$router.originTo);
      }
    },
    msgAnimation (newValue) {
      if (newValue) this.spinnerShow = false;
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
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
}

.dialog {
  position: fixed;
  top: 10vh;
  left: 30vw;
  width: 40vw;
  height: 50vh;
  max-height: 40rem;
  z-index: 300;
  border-radius: .2rem;
  border: none;
  padding: 2rem;
  overflow: hidden;
  background-color: rgba(16, 29, 44, .9);
//   background-color: var(--color-secondary);
  font-size: 3rem;
  color: var(--color-primary-dark);
  display: flex;
  align-items: center;
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;

  &__label {
    margin-top: 2rem;
  }

  &__input {
    color: var(--color-primary-light);
    background: none;
    border: none;
    border-bottom: .1rem solid var(--color-primary-dark);
    outline: none;
    padding: .5rem 1rem;
    font-size: 3rem;
  }

  &__msg {
    margin-top: 1rem;
    font-family: 'Montserrat';
    font-size: 2rem;
    font-weight: 700;
    color: rgba(255, 50, 50, .9);
    align-self: flex-end;
    transform: translate(0, 100%);
    opacity: 0;
    transition: .2s;

    &--first {
      transform: translate(0, 0);
      opacity: 1;
    }

    &--loop {
      transform: translate(0, 0);
      animation: shake 0.5s both;
    }
  }

  &__btn {
    align-self: flex-end;
    margin-top: 2rem;

    &--login,
    &--register {
      font-size: 2rem;
      border: .1rem solid var(--color-primary-dark);
      border-radius: 2rem;
      padding: .5rem 2rem;
      font-weight: 700;

      &:hover {
        background: var(--color-primary-dark);
        color: var(--color-secondary);
      }
    }

    &--login {
      margin-right: 3rem;
    }
  }
}

@keyframes shake {
   0%, 100% {transform: translateX(0);}
   20%, 60% {transform: translateX(-.3rem);}
   40%, 80% {transform: translateX(.3rem);}
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
