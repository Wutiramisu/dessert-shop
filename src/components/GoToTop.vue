<template>
  <div class="scroll-wrap">
    <transition name="fade">
      <button class="scroll-btn" v-if="isVisible" @click="goToTop">
        <i class="fas fa-angle-up"></i>
      </button>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ScrollToTop',
  data () {
    return {
      isVisible: false,
      visibleY: 150
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
      this.isVisible = (this.visibleY < window.scrollY);
    },
    goToTop () {
      if (document.scrollingElement.scrollTop === 0) return;
      const totalScrollDistance = document.scrollingElement.scrollTop;
      let scrollY = totalScrollDistance;
      let oldTimestamp = null;
      function step (newTimestamp) {
        if (oldTimestamp !== null) {
          scrollY -= totalScrollDistance * (newTimestamp - oldTimestamp) / 400;
          if (scrollY <= 0) {
            // eslint-disable-next-line no-return-assign
            return document.scrollingElement.scrollTop = 0;
          }
          document.scrollingElement.scrollTop = scrollY;
        }
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-wrap{
  text-align: center;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.scroll-btn{
  width: 6rem;
  height: 6rem;
  position: fixed;
  right: 4rem;
  bottom: 17rem;
  z-index: 100;
  border-radius: 50%;
  background-color: rgba(178, 132, 81, .7);
  color: var(--color-secondary);
  font-size: 3rem;

  &:hover {
    background-color: rgba(198, 153, 99, 1);
    transition: .4s;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
