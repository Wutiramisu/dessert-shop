<template>
  <div class="order__container">
    <div class="order__title">{{ orderTitle }}</div>
    <Spinner v-if="spinnerShow" />
    <div v-else v-for="order in getOrder" :key="order._id" class="order__card">
      <div class="card__title">
        <span class="card__title--text">Tracking</span>
        <span class="card__title--num">{{ order._id }}</span>
      </div>

      <div class="card__top">
        <div v-for="item in order.items" :key="item.name" class="card__products">
          <div class="card__products--name">{{ item.name }} ---</div>
          <div class="card__products--count">
          <span class="card__products--count-times">x</span>
          {{ item.count }}
          </div>
          <div class="flex-space"></div>
          <div class="card__products--price">$ {{ item.count * item.price }}</div>
        </div>
      </div>

      <div class="card__bottom">
        <div class="card__info">
          <div class="card__info--total">Total: $ {{ order.total }}</div>
          <div class="card__info--name">Receiver: {{ order.name }}</div>
          <div class="card__info--tel">Phone: {{ order.tel }}</div>
          <div class="card__info--address">Address: {{ order.address }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Spinner from '@/components/utils/Spinner.vue';
export default {
  components: { Spinner },
  data () {
    return {
      spinnerShow: true,
      orderTitle: ''
    };
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo;
    },
    getOrder () {
      return this.$store.getters.getOrder;
    }
  },
  mounted () {
    const payload = {
      username: this.userInfo.username,
      token: this.userInfo.token
    };
    this.$store.dispatch('getOrder', payload);
  },
  watch: {
    getOrder () {
      this.spinnerShow = false;
      if (this.getOrder.length === 0) {
        this.orderTitle = 'There is no orders';
      } else {
        this.orderTitle = 'Orders';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.order {

  &__container {
    font-family: 'Montserrat';
    font-size: 3rem;
    max-width: 90rem;
    color: var(--color-primary-dark);
  }

  &__title {
    font-family: 'Parisienne';
    font-size: 5rem;
    text-align: center;
    border-bottom: .1rem solid var(--color-primary-dark);
    margin: 5rem 0;
  }

  &__card {
    margin-bottom: 5rem;
    background-color: rgba(0, 0, 0, .3);
    // background-color: rgba(16, 29, 44, .5);
    border: .1rem solid var(--color-primary-dark);
  }
}

.card {

  &__title {
    color: var(--color-secondary);
    background-color: var(--color-primary-dark);
    padding: 1rem;
    display: flex;
    align-items: center;

    &--text {
      font-family: 'Parisienne';
      font-weight: 700;
      margin: 0 .5rem;
    }

    &--num {
      overflow-wrap: anywhere;
    }
  }

  &__top,
  &__bottom {
    padding: 1rem 2rem;
    border-bottom: .1rem solid var(--color-primary-dark);
  }

  &__products {
    display: flex;
    align-items: center;
    margin-top: .5rem;

    &--name {
      font-family: 'Parisienne';
      font-size: 3.5rem;
      margin-right: 1rem;
    }

    &--count {

      &-times {
        font-size: 2.5rem;
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    font-size: 2.5rem;

    &--name,
    &--tel,
    &--address {
      margin-top: 1rem;
      overflow-wrap: anywhere;
    }

    &--total {
      align-self: flex-end;
    }
  }
}

.flex-space {
  flex: 1;
}
</style>
