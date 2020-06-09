<template>
  <!-- You can find this swiper instance object in current component by the "mySwiper"  -->
  <div v-swiper:mySwiper="swiperOption">
    <div class="swiper-wrapper">
      <div 
        v-for="banner in banners" 
        :key="banner.id" 
        class="swiper-slide">
        <img :src="banner" >
      </div>
    </div>
    <div class="swiper-pagination swiper-pagination-bullets" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: ['/img/slide1-m.svg', '/img/slide2-m.png'],
      swiperOption: {
        centeredSlides: true,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
          clickable: true
        },
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.my-swiper {
  /*width: 90px;*/
  /*height: 10em;*/
  .swiper-slide {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
