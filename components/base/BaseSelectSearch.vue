<script>
import countryData from '~/assets/data/country.json';

export default {
  props: {
    active_item: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      show: false,
      value: null,
      search: '',
      countryData,
      country: ''
    };
  },

  computed: {
    filteredItems() {
      if (this.search.trim().length === 0) {
        return this.countryData;
      }

      return this.countryData.filter(
        item =>
          item.country.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    show_item() {
      if (this.country !== '') {
        return this.country;
      } else {
        return this.active_item;
      }
    }
  },

  mounted() {
    // console.log(this.active_item);
    if (this.active_item) {
      this.country = this.active_item;
    }
  },

  methods: {
    setItem(item) {
      this.country = item.country;
      this.$emit('input', item.country);
    },
    keyUp(e) {
      if (e.keyCode === 27) {
        this.show = false;
        document.removeEventListener('click', this.hideList);
        document.removeEventListener('keyup', this.keyUp);
      }
    },
    showList() {
      document.addEventListener('click', this.hideList);
      document.addEventListener('keyup', this.keyUp);
    },
    hideList(e) {
      if (e.target !== this.$el) {
        this.show = false;
        document.removeEventListener('click', this.hideList);
        document.removeEventListener('keyup', this.keyUp);
      }
    }
  }
};
</script>

<template>
  <div class="base-select">
    <div
      class="vs-box"
      @click.stop="
        show = !show;
        showList();
      "
    >
      {{ show_item }}
      <div 
        v-if="!show_item" 
        class="base-select__input">
        <slot />
      </div>
      <svg 
        class="base-select__icon" 
        viewBox="0 0 12 6">
        <path d="M0.984375 0.984375H11.0156L6 6L0.984375 0.984375Z" />
      </svg>
    </div>
    <transition name="base-select-item-fade">
      <div 
        v-if="show" 
        class="base-select-item-list base-select-item__list">
        <div class="vs-menu-container">
          <div 
            class="base-search" 
            @click.stop>
            <input
              v-model="search"
              type="text"
              class="base-search__input"
              placeholder="Search country"
            >
            <svg 
              class="base-search__icon" 
              viewBox="0 0 18 18">
              <path
                d="M3.32812 9.70312C4.20312 10.5781 5.26562 11.0156 6.51562 11.0156C7.76562 11.0156 8.82812 10.5781 9.70312 9.70312C10.5781 8.82812 11.0156 7.76562 11.0156 6.51562C11.0156 5.26562 10.5781 4.20313 9.70312 3.32812C8.82812 2.45312 7.76562 2.01562 6.51562 2.01562C5.26562 2.01562 4.20312 2.45312 3.32812 3.32812C2.45312 4.20313 2.01562 5.26562 2.01562 6.51562C2.01562 7.76562 2.45312 8.82812 3.32812 9.70312ZM12.5156 11.0156L17.4844 15.9844L15.9844 17.4844L11.0156 12.5156V11.7188L10.7344 11.4375C9.54688 12.4688 8.14062 12.9844 6.51562 12.9844C4.70312 12.9844 3.15625 12.3594 1.875 11.1094C0.625 9.85938 0 8.32812 0 6.51562C0 4.70312 0.625 3.17188 1.875 1.92188C3.15625 0.640625 4.70312 0 6.51562 0C8.32812 0 9.85938 0.640625 11.1094 1.92188C12.3594 3.17188 12.9844 4.70312 12.9844 6.51562C12.9844 8.14062 12.4688 9.54688 11.4375 10.7344L11.7188 11.0156H12.5156Z"
              />
            </svg>
          </div>

          <div class="base-select-list">
            <BaseScrollBlock4>
              <div class="scroll">
                <div
                  v-for="item in filteredItems"
                  :key="item.id"
                  class="base-select-list__item"
                  @click.prevent="setItem(item)"
                >
                  <template>
                    {{ item.country }}
                  </template>
                </div>
              </div>
            </BaseScrollBlock4>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.vs-box {
  position: relative;
  $this: &;
  $size: 16px;
  font-size: em($size);
  font-family: $font-Circe;
  background-color: $white;
  width: 100%;
  box-sizing: border-box;
  border-radius: em(6px, $size);
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  border: 2px solid $grey;
  height: em(48px);
  padding: 0 em(60px, $size) 0 em(24px, $size);
}

.vs-menu-container {
  position: absolute;
  z-index: 1000;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: $white;
  border-radius: em(6px);
  box-shadow: 0 em(2px) em(30px) $grey;
  padding-bottom: em(10px);
}

/*.base-select.is-active .vs-menu-container {*/
/*  display: flex;*/
/*}*/

.scroll {
  height: 280px;
}

.base-select {
  $this: &;
  $size: 16px;

  position: relative;
  display: inline-block;
  cursor: pointer;

  &__input {
    font-size: em($size);
    font-family: $font-Circe;
    background-color: $white;
    width: 100%;
    box-sizing: border-box;
    border-radius: em(6px, $size);
    pointer-events: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;

    &.is_error {
      border-color: $red;
    }
  }

  .base-select__icon {
    width: em(12px);
    position: absolute;
    top: 50%;
    right: em(18px);
    fill: $grey;
    transform: translateY(-50%);
    transition: fill $speed;
  }

  .vs-box:hover {
    .base-select__icon {
      fill: $blue;
    }
  }
}

.base-select-list {
  &__item {
    padding: 0 em(26px);
    height: em(48px);
    transition: background-color $speed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    white-space: nowrap;

    &:hover {
      background-color: $light-blue;
    }
  }

  &__second {
    text-align: right;
  }
}

.base-select-fade-enter-active,
.base-select-fade-leave-active {
  transition-property: max-height;
  transition-timing-function: ease-in;
  transition-duration: $speed;
  max-height: em(200px);
}
.base-select-fade-enter,
.base-select-fade-leave-to {
  max-height: 100%;
}
.base-select-fade-leave-to {
  transition-duration: 0.1s;
  z-index: 1;
}

.base-search {
  width: 100%;
  padding-right: em(45px);
  padding-left: em(25px);
  box-sizing: border-box;

  background-repeat: no-repeat;
  position: relative;
  z-index: 1000;
  &__input {
    $size: 14px;
    font-size: em($size);
    font-family: $font-Circe;
    width: 100%;
    border: none;
    padding: em(15px) em(25px) em(15px) 0px;
    border-bottom: 2px solid $grey;
    background-color: $white;
    outline: none;

    &::placeholder {
      color: #dedede;
    }
  }

  &__icon {
    position: absolute;
    width: em(18px);
    fill: $blue;
    top: em(15px);
    @include ifdesktop {
      right: em(25px);
    }
    @include ifmobile {
      right: em(15px);
    }
  }
}
</style>
