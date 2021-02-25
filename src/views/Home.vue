<template>
  <div class="home-container">
    <Carousel
      :perPage="1"
      :autoplay="true"
      :loop="true"
      :autoplayTimeout="2000"
      :speed="800"
      :resistanceCoef="1"
      :paginationColor="'#A5A5A5'"
      :paginationActiveColor="'#C69963'"
      :paginationPosition="'bottom-overlay'"
      :paginationPadding="15"
      class="slide"
    >
      <Slide v-for="img in carouselImgs" :key="img" class="slide__main">
        <div class="slide__img-wrap"></div>
        <img :src="require(`@/assets/carousel/${ img }`)" alt="" class="slide__img">
      </Slide>
    </Carousel>
    <div class="home-container__bottom">
      <section class="about">
        <h2 class="about__title">About Us</h2>
        <p class="about__content">Lorem, ipsum consectetur dolor sit amet adipisicing elit. Dolor id ex voluptatum molestias? Possimus cupiditate architecto fuga atque excepturi fugiat ullam tenetur tempore amet alias, temporibus repudiandae unde,  voluptatibus reiciendis!</p>
      </section>

      <section class="product">
        <router-link to="/products?product=cake" class="product__field">
          <div class="product__img--text">Cake</div>
          <div class="product__img product__img--cake"></div>
        </router-link>
        <router-link to="/products?product=donut" class="product__field">
          <div class="product__img--text">Donut</div>
          <div class="product__img product__img--donut"></div>
        </router-link>
        <router-link to="/products?product=iceCream" class="product__field">
          <div class="product__img--text">Ice Cream</div>
          <div class="product__img product__img--iceCream"></div>
        </router-link>
      </section>

      <section class="feature">
        <h2 class="feature__title">3 Features</h2>
        <div class="feature__main">
          <div class="feature__card">
            <div class="feature__img feature__img--organic">
              <div class="feature__img-text">Organic</div>
            </div>
          </div>
          <div class="feature__card">
            <div class="feature__img feature__img--homemade">
              <div class="feature__img-text">Homemade</div>
            </div>
          </div>
          <div class="feature__card">
            <div class="feature__img feature__img--luxury">
              <div class="feature__img-text">Luxury</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
export default {
  name: 'Home',
  components: { Carousel, Slide },
  data () {
    return {
      carouselImgs: [
        'carousel-1.jpg',
        'carousel-2.jpg',
        'carousel-3.jpg',
        'carousel-4.jpg'
      ],
      featureImgs: [
        'organic.jpg',
        'homemade.jpg',
        'luxury.jpg'
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.home-container {

  &__bottom {
    width: 90%;
    max-width: 150rem;
    margin: 0 auto;
  }
}

.slide {

  &__img {
    width: 100%;
    display: block;
    object-fit: contain;
    overflow: hidden;

    &-wrap {
      position: absolute;
      content: "";
      width: 500%;
      height: 100%;
      background-color: rgba(16, 29, 44, .2);
    }
  }
}

.about {
  width: 90%;
  margin: 10rem auto;
  font-size: 4rem;
  color: var(--color-primary-dark);

  @media only screen and (max-width: $bp-large) {
    width: 100%;
    margin: 5rem auto;
  }

  @media only screen and (max-width: $bp-medium) {
    font-size: 3rem;
  }

  @media only screen and (max-width: $bp-small) {
    font-size: 2.5rem;
  }

  &__title {
    text-align: center;
  }
}

.product {
  display: flex;
  justify-content: center;
  margin: 10rem auto;

  @media only screen and (max-width: $bp-large) {
    width: 100%;
    margin: 5rem auto;
  }

  @media only screen and (max-width: $bp-small) {
    flex-direction: column;
    align-items: center;
  }

  &__field {
    width: 33%;
    overflow: hidden;
    position: relative;
    border: .1rem solid var(--color-primary-dark);

    @media only screen and (max-width: $bp-small) {
      width: 80%;
    }

    @media only screen and (min-width: $bp-small) {
      &:hover .product__img {
        transform: scale(1.1);
      }

      &:hover .product__img--text {
        bottom: -20%;
      }
    }

  }

  &__img {
    height: 200px;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    transition: .8s;

    &--cake {
      background-image: linear-gradient(to bottom, rgba(16, 29, 44, .3), rgba(16, 29, 44, .3)), url(../assets/products/cake-2.jpg);
    }

    &--donut {
      background-image: linear-gradient(to bottom, rgba(16, 29, 44, .3), rgba(16, 29, 44, .3)), url(../assets/products/donut-2.jpg);
    }

    &--iceCream {
      background-image: linear-gradient(to bottom, rgba(16, 29, 44, .3), rgba(16, 29, 44, .3)), url("../assets/products/ice cream-1.jpg");
    }

    &--text {
      position: absolute;
      bottom: -50%;
      left: 50%;
      z-index: 20;
      transform: translate(-50%, -50%);
      font-size: 5rem;
      color: var(--color-primary-dark);
      white-space: nowrap;
      background: rgba(0, 0, 0, .7);
      width: 100%;
      text-align: center;
      transition: .5s;

      @media only screen and (max-width: $bp-small) {
        bottom: -20%;
      }
    }
  }
}

.feature {
  display: flex;
  flex-direction: column;
  color: var(--color-primary-dark);
  font-size: 4rem;

  &__title {
    align-self: center;
    margin-bottom: 3rem;

    @media only screen and (max-width: $bp-small) {
      font-size: 3rem;
    }
  }

  &__main {
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: $bp-medium) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__card {
    width: 30%;
    height: 30vw;
    max-height: 55rem;
    text-align: center;

    @media only screen and (max-width: $bp-medium) {
      width: 50%;
      height: 50vw;
      margin-bottom: 3rem;
    }

    @media only screen and (max-width: $bp-medium) {
      width: 80%;
      height: 80vw;
      margin-bottom: 5rem;
    }
  }

  &__img {
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    position: relative;

    clip-path: polygon(100% 0, 100% 80%, 50% 100%, 0 80%, 0 0, 50% 0);

    &--organic {
      background-image: linear-gradient(to bottom, rgba(16, 29, 44, .1), rgba(16, 29, 44, .6)), url(../assets/feature/organic.jpg);
    }
    &--homemade {
      background-image: linear-gradient(to bottom, rgba(16, 29, 44, .1), rgba(16, 29, 44, .6)), url(../assets/feature/homemade.jpg);
    }
    &--luxury {
      background-image: linear-gradient(to bottom, rgba(16, 29, 44, .1), rgba(16, 29, 44, .6)), url(../assets/feature/luxury.jpg);
    }

    &-text {
      position: absolute;
      transform: translate(-50%, -50%);
      width: 60%;
      top: 10%;
      left: 50%;
      border-bottom: .1rem solid var(--color-primary-dark);

      @media only screen and (max-width: $bp-large) {
        font-size: 3rem;
      }

      @media only screen and (max-width: $bp-medium) {
        font-size: 4rem;
      }

      @media only screen and (max-width: $bp-small) {
        font-size: 3rem;
      }
    }
  }
}
</style>
