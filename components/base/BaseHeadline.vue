<script>
import SaveIcon from '~/components/icons/SaveIcon';
import { mapActions } from 'vuex';
export default {
  components: {
    SaveIcon
  },

  props: {
    title: {
      type: String,
      default: null
    },
    editable: {
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
    ...mapActions('page', ['postChangeNamePortflio']),

    editStart() {
      this.edit = true;
      setTimeout(() => {
        this.$refs.input.select();
      });
    },
    editEnd() {
      this.edit = false;
      this.title = this.$refs.input.value;
      this.postChangeNamePortflio({
        name: this.$refs.input.value
      });
    }
  }
};
</script>

<template>
  <div 
    :class="{ 'base-headline_row': !editable }" 
    class="base-headline">
    
    <div class="base-headline__info">
      <BaseTitle 
        v-if="!edit && title" 
        class="base-headline__title">{{ title }}</BaseTitle>
      
      <input
        v-if="edit"
        ref="input"
        :value="title"
        type="text"
        maxlength="15"
        class="base-headline__input"
      >
    </div>
    
      
    <div class="base-headline__aside">
      
      <BaseSettings
        v-if="!edit && editable"
        class="base-headline__settings"
        @click.native="editStart"
      />
      <SaveIcon
        v-if="edit"
        class="base-headline__save"
        @click.native="editEnd"
      />
    </div>
    
    <slot />
    
    
    
  </div>
</template>

<style lang="scss">
.base-headline {
  @include ifdesktop {
    margin-bottom: em(40px);
  }
  @include ifmobile {
    position: relative;
    /*padding: 0 em(15px);*/
    /*background: $purple;*/
    /*text-align: center;*/
    /*color: $white;*/
    padding-bottom: em(20px);
    /*&::before {*/
    /*  content: '';*/
    /*  display: block;*/
    /*  position: absolute;*/
    /*  width: 100%;*/
    /*  height: em(500px);*/
    /*  top: em(-500px);*/
    /*  left: 0;*/
    /*  background-color: $purple;*/
    /*}*/
  }
  /*&__title {*/
  /*  @include ifmobile {*/
  /*    padding: 0 1em;*/
  /*  }*/
  /*}*/
}
.base-headline {
  position: relative;
  box-sizing: border-box;

  &__info {
  }

  &__aside {
    margin-left: em(20px);
  }

  &__settings,
  &__save {
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
    fill: $grey;
    transition: fill $speed;
    vertical-align: middle;

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
    font-size: em(36px);
    font-family: $font-Circe;
    width: 100%;
    max-width: em(130px);
    border: none;
    background-color: $white;
    color: $blue;
    outline: none;

    &::placeholder {
      color: #dedede;
    }
  }
}
</style>
