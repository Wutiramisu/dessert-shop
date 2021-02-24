<template>
  <footer class="footer">
    <div class="footer__container">
      <div class="footer__info">
        <div class="footer__phone">
          <i class="fas fa-phone-alt"></i>
          <span class="footer__phone--num">0912-345678</span>
        </div>
        <div class="footer__social">
          <router-link to="/" class="footer__social--fb">
            <i class="fab fa-facebook-square"></i>
          </router-link>
          <router-link to="/" class="footer__social--ig">
            <i class="fab fa-instagram"></i>
          </router-link>
        </div>
      </div>
      <p class="footer__text">All resources are from internet. For learning purpose only @ 2021</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style lang="scss" scoped>
.footer {
  font-size: 2.5rem;
  font-family: 'Montserrat';
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15rem;
  background: var(--color-primary-dark) url(../assets/banner-1.png);

  display: flex;
  align-items: center;

  &__container {
    margin: 0 auto;
    color: var(--color-secondary);
    align-content: center;
  }

  &__info {
    display: flex;
    align-items: center;
    margin: 1rem;
  }

  &__phone {
    flex: 1;
    text-align: center;

    &--num {
      margin: 0 2rem;
    }
  }

  &__social {
    flex: 1;
    text-align: center;
    font-size: 3.5rem;

    &--fb {
      margin-right: 3.5rem;
      position: relative;

      &::after {
        cursor: initial;
        position: absolute;
        top: 10%;
        left: 150%;

        content: "";
        display: block;
        height: 80%;
        width: .2rem;
        background: var(--color-secondary);
      }
    }
  }

  &__text {
    margin: 1rem;
  }
}
</style>
