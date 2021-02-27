<template>
  <div class="scroll-wrap">
    <transition name="fade">
      <button
        class="scroll-btn"
        :style="{ bottom: dynamicIconBottom + 'px' }"
        v-if="isVisible"
        @click="goToTop"
      >
        <i class="fas fa-angle-up"></i>
      </button>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ScrollToTop',
  props: ['footerHeigh', 'clientHeight', 'scrollTop', 'innerHeight', 'responseWidth'],
  data () {
    return {
      isVisible: false,
      visibleY: 150,
      dynamicIconBottom: 20,
      initFixedPoistion: 20
    };
  },
  created () {
    this.dynamicIconBottom = window.innerWidth <= 600 ? 0 : 20;
  },
  watch: {
    scrollTop () {
      this.isVisible = (this.visibleY < window.scrollY);

      // 距離底部距離 = 全網頁高度 - 捲軸往下捲的距離 - 當前頁面高度
      const bottomDistance = this.clientHeight - this.scrollTop - this.innerHeight;
      if (bottomDistance <= this.footerHeigh) {
        this.dynamicIconBottom = this.footerHeigh - bottomDistance + this.initFixedPoistion;
      } else if (this.dynamicIconBottom > this.initFixedPoistion) {
        this.dynamicIconBottom = this.initFixedPoistion;
      }
      // console.log(
      //   `
      //   距離底部距離: ${bottomDistance} px
      //   全頁高度: ${this.clientHeight}
      //   捲軸距離: ${this.scrollTop}
      //   頁面高度: ${this.innerHeight}
      //   出現的footer高度: ${this.footerHeigh - bottomDistance} px
      //   圖示定位: ${this.dynamicIconBottom} px
      //   `);
    },
    responseWidth (newValue) {
      if (newValue <= 600) {
        this.initFixedPoistion = 0;
        this.dynamicIconBottom = 0;
      } else {
        this.initFixedPoistion = 20;
        this.dynamicIconBottom = 20;
      }
    }
  },
  methods: {
    goToTop () {
      if (this.scrollTop === 0) return;
      const totalScrollDistance = this.scrollTop;
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
  z-index: 100;
  border-radius: 50%;
  background-color: rgba(178, 132, 81, .7);
  color: var(--color-secondary);
  font-size: 3rem;

  @media only screen and (max-width: $bp-small) {
    width: 50%;
    height: 4rem;
    left: 0;
    border-radius: 0;
  }

  &:hover {
    background-color: rgba(198, 153, 99, 1);
    transition: opacity .4s;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .4s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
