<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      description: ''
    };
  },
  computed: {
    ...mapState('page', ['idActivePortfolio']),

    id_portfel: {
      get() {
        return this.idActivePortfolio;
      }
    },

    buttonInactive() {
      if (this.name && this.description) return false;
      else return true;
    }
  },

  beforeUpdate() {},

  mounted() {},

  methods: {
    ...mapMutations('page', ['setPopup']),

    ...mapActions('page', ['publishReadyMadePortfolio']),

    sendEvent() {
      this.publishReadyMadePortfolio({
        id_portfels: this.id_portfel,
        name: this.name,
        description: this.description,
        load_ready_made_portfel_button: ''
      });
    }
  }
};
</script>

<template>
  <BaseSmallPopup class="add-to-ready-made-popup">
    <BaseTitle class="add-to-ready-made-popup__title">
      Add to Ready-Made
    </BaseTitle>
    <div class="add-to-ready-made-popup__text">
      Add your portfolio named and description
    </div>
    <div class="add-to-ready-made-popup__form">
      <BaseInput
        v-model="name"
        name="name"
        icon="folder"
        placeholder="Create portfolio name"
        class="add-to-ready-made-popup__input"
      />
      <textarea
        v-model="description"
        placeholder="Add description"
        class="add-to-ready-made-popup__textarea"
      />
    </div>
    
   
      
    <BaseButton
      class="add-to-ready-made-popup__button"
      @click.native="setPopup(null)"
    >
      CANCEL
    </BaseButton>
  
    <BaseButton
      :is-inactive="buttonInactive"
      type="primary"
      class="add-to-ready-made-popup__button add-to-ready-made-popup__button-last"
      @click.native="sendEvent"
    >
      ADD TO READY-MADE
    </BaseButton>
      
    

    
  </BaseSmallPopup>
</template>

<style lang="scss" scoped>
.add-to-ready-made-popup {
  .base-popup__container {
    border: 1px solid $grey;
    box-shadow: 0 em(2px) em(1px) rgba(0, 0, 0, 0.1);
    @include ifdesktop {
      padding: em(72px) em(62px) em(45px);
    }
    @include ifmobile {
      padding: em(15px);
    }
  }

  &__form {
    margin: em(30px) 0 em(62px);
  }

  &__input {
    width: 100%;
  }

  &__textarea {
    $size: 16px;
    font-size: em($size);
    font-family: $font-Circe;
    width: 100%;
    height: em(135px);
    padding: em(14px, $size) em(24px, $size);
    box-sizing: border-box;
    border: 2px solid $grey;
    border-radius: em(6px, $size);
    background-color: $white;
    outline: none;
    margin-top: em(30px, $size);

    &.is_error {
      border-color: $red;
    }
  }

  &__button {
    margin-right: em(20px);
  }

  &__button-last {
    @include ifmobile {
      margin-right: 0;
    }
  }
}
</style>
