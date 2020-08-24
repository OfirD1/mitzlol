<!-- adopted from https://github.com/DivanteLtd/vue-storefront/blob/master/src/themes/default/components/core/BackToTop.vue -->
<template>
  <transition name="back-to-top-fade">
    <div
      class="vue-back-to-top"
      :style="`bottom:${this.bottom}; right:${this.right};`"
      v-show="visible"
      @click="backToTop"
    >
      <slot>
        <div class="default">
          <span>{{ text }}</span>
        </div>
      </slot>
    </div>
  </transition>
</template>
<script>
export default {
  name: "backToTop",
  props: {
    text: {
      type: String,
      default: "חזרה למעלה",
    },
    visibleoffset: {
      type: [String, Number],
      default: 100,
    },
    right: {
      type: String,
      default: "30px",
    },
    bottom: {
      type: String,
      default: "40px",
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  mounted() {
    window.smoothscroll = () => {
      let currentScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll);
        window.scrollTo(0, Math.floor(currentScroll - currentScroll / 5));
      }
    };
    window.addEventListener("scroll", this.catchScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.catchScroll);
  },
  methods: {
    // Catch window scroll event
    catchScroll() {
      this.visible = window.pageYOffset > parseInt(this.visibleoffset);
    },
    // Scroll back to top
    backToTop() {
      window.smoothscroll();
    },
  },
};
</script>
<style scoped>
.back-to-top-fade-enter-active,
.back-to-top-fade-leave-active {
  transition: opacity 0.7s;
}
.back-to-top-fade-enter,
.back-to-top-fade-leave-to {
  opacity: 0;
}
.vue-back-to-top {
  position: fixed;
  z-index: 1000;
  cursor: pointer;
}
.vue-back-to-top .default {
  width: 160px;
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  background-color: #a349a4;
  border-radius: 3px;
}
.vue-back-to-top .default span {
  color: #ffffff;
}
</style>