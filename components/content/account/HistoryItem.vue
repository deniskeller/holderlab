<script>
import { mapMutations } from 'vuex';

export default {
  components: {},
  props: {
    date: {
      type: String,
      default: null
    },
    text: {
      type: String,
      default: null
    },

    is_show_content: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: null
    },

    all_data: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      read_message: true
    };
  },

  computed: {},

  mounted() {},

  methods: {
    ...mapMutations('page', [
      'setPopup',
      'setActiveHistoryMessage',
      'setListOrderActiveMessages'
    ]),
    click_event() {
      this.read_message = false;
      if (this.is_show_content) {
        this.setActiveHistoryMessage(this.all_data);
        if (this.type == 'portfel_history') {
          this.setListOrderActiveMessages(this.all_data.data.content.data);
          this.setPopup('history__message-popup_2');
        } else {
          this.setPopup('history__message-popup_1');
        }
      }
    }
  }
};
</script>

<template>
  <div 
    class="history-item"
    :class="{ is_active: read_message }"
    @click="click_event">
    <div class="history-item__date">
      {{ date }}
    </div>
    <div class="history-item__text">
      {{ text }}
    </div>
    <div class="history-item__more">
      •••
    </div>
  </div>
</template>

<style lang="scss">
.history-item {
  $this: &;

  position: relative;
  min-height: em(72px);
  background: $light-blue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    #{$this}__more {
      color: $blue;
    }
  }

  &__date {
    color: $grey;
    text-align: right;
    white-space: nowrap;
    @include ifdesktop {
      width: em(96px);
      margin-right: em(20px);
    }
    @include ifmobile {
      width: em(160px);
      margin-right: em(6px);
    }
  }
  
  &__text {
    width: em(390px);
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &__more {
    $size: 26px;
    font-size: em($size);
    color: $grey;
    letter-spacing: 0.06em;
    display: block;
    padding: 0 em(10px);
    transition: color $speed;
    user-select: none;
  }

  &.is_active {
    background: $white;
    @extend %bottom-shadow;
    box-sizing: border-box;
    border: 1px solid $grey;
    /*pointer-events: none;*/

    &::before {
      content: '';
      display: block;
      position: absolute;
      width: em(8px);
      height: em(8px);
      background-color: $yellow;
      border-radius: 100%;
      left: em(20px);
    }
  }
}
</style>
