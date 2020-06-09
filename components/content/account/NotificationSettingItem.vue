<script>
import SaveIcon from '~/components/icons/SaveIcon';
export default {
  components: {
    SaveIcon
  },
  props: {
    label: {
      type: String,
      default: null
    },
    data: {
      type: String,
      default: null
    },
    change: {
      type: Boolean,
      default: false
    },
    is_active: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      edit: false
    };
  },
  computed: {},
  mounted() {},
  methods: {
    editStart() {
      this.edit = true;
      setTimeout(() => {
        this.$refs.input.select();
      });
    },
    editEnd() {
      this.edit = false;
      this.data = this.$refs.input.value;
    }
  }
};
</script>

<template>
  <div class="notification-setting-item">
    <BaseCheckbox 
      :is_active ="is_active"
      v-model="is_active"
      class="notification-setting-item__chekbox">
      {{ label }}
    </BaseCheckbox>
    <div 
      v-if="!edit && data" 
      class="notification-setting-item__data">
      {{ data }}
    </div>
    <input
      v-if="edit"
      ref="input"
      :value="data"
      :placeholder="label"
      type="text"
      required
      class="notification-setting-item__input"
    >
    <div 
      v-if="!data" 
      class="notification-setting-item__soon">
      Soon
    </div>

    <BaseSettings
      v-if="!edit && data && change"
      class="notification-setting-item__settings"
      @click.native="editStart"
    />
    <SaveIcon
      v-if="edit"
      class="notification-setting-item__save"
      @click.native="editEnd"
    />
  </div>
</template>

<style lang="scss">
.notification-setting-item {
  position: relative;
  min-height: em(70px);
  box-sizing: border-box;
  border-bottom: 1px solid $grey;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include ifdesktop {
    padding: 0 em(43px) 0 em(20px);
  }
  @include ifmobile {
    padding: 0 em(43px) 0 em(15px);
  }
  &__settings,
  &__save {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    fill: $grey;
    transition: fill $speed;

    @include ifdesktop {
      right: 0;
    }
    @include ifmobile {
      right: em(15px);
    }

    &:hover {
      fill: $black;
    }
    &:active {
      fill: $blue;
    }
  }
  &__save {
    width: em(18px);
    height: em(18px);
    cursor: pointer;
  }

  &__input {
    $size: 16px;
    font-size: em($size);
    font-family: $font-Circe;
    width: 50%;
    border: none;
    background-color: $white;
    color: $blue;
    outline: none;
    text-align: right;

    &::placeholder {
      color: #dedede;
    }
  }

  &__soon {
    color: $grey;
  }
}
</style>
