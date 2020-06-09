<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import MyHolderlabItem from '~/components/content/account/MyHolderlabItem';

export default {
  components: {
    MyHolderlabItem
  },
  data() {
    return {
      business: 'Business Account'
    };
  },
  computed: {
    ...mapState('page', ['userInfo', 'companyInfo']),

    user_country: {
      get() {
        return this.userInfo.country;
      },
      set(value) {
        this.changeUserCountry(value);
      }
    },

    user_city: {
      get() {
        return this.userInfo.city;
      },
      set(value) {
        this.changeUserCity(value);
      }
    },

    user_postal: {
      get() {
        return this.userInfo.postal;
      },
      set(value) {
        this.changeUserPostal(value);
      }
    },

    user_address: {
      get() {
        return this.userInfo.address;
      },
      set(value) {
        this.changeUserAddress(value);
      }
    },

    company_name: {
      get() {
        return this.companyInfo.name;
      },
      set(value) {
        this.changeCompanyName(value);
      }
    },

    company_vat_number: {
      get() {
        return this.companyInfo.vat_number;
      },
      set(value) {
        this.changeCompanyNumber(value);
      }
    },

    company_country: {
      get() {
        return this.companyInfo.country;
      },
      set(value) {
        this.changeCompanyCountry(value);
      }
    },

    company_address: {
      get() {
        return this.companyInfo.address;
      },
      set(value) {
        this.changeCompanyAddress(value);
      }
    },

    company_city: {
      get() {
        return this.companyInfo.city;
      },
      set(value) {
        this.changeCompanyCity(value);
      }
    },

    company_postal: {
      get() {
        return this.companyInfo.postal;
      },
      set(value) {
        this.changeCompanyPostal(value);
      }
    },
    
    subscriptions_save() {
      if (
        this.business === 'Personal Account' &&
        (this.company_address === '' ||
          this.company_city === '' ||
          this.company_postal === '' ||
          this.user_address === '' ||
          this.user_city === '' ||
          this.user_postal === '')
      ) {
        return true;
      }

      if (
        this.business === 'Business Account' &&
        (this.company_name === '' ||
          this.company_vat_number === '' ||
          this.company_address === '' ||
          this.company_city === '' ||
          this.company_postal === '' ||
          this.user_address === '' ||
          this.user_city === '' ||
          this.user_postal === '')
      ) {
        return true;
      }
      return false;
    }
  },

  mounted() {},

  methods: {
    ...mapActions('page', ['savedUserInfo', 
    'savedUserCompanyInfo',
    'getMessage']),

    ...mapMutations('page', [
      'setPopup',
      'changeUserCountry',
      'changeUserCity',
      'changeUserPostal',
      'changeUserAddress',
      'changeCompanyName',
      'changeCompanyPostal',
      'changeCompanyNumber',
      'changeCompanyCity',
      'changeCompanyAddress',
      'changeCompanyCountry'
    ]),
    click_save() {
      if (this.subscriptions_save){
        this.getMessage({
          message:'Fields must be filled',
          status:'info'
        });
      }else{
      
      if (this.business === 'Business Account') {
        this.savedUserCompanyInfo();
      } else {
        this.savedUserInfo();
      }}
    }
  }
};
</script>

<template>
  <BasePopup class="subscriptions-popup">
    <BaseHeadline
      title="Subscription Profile"
      class="subscriptions-popup__headline"
    />
    <div class="subscriptions-popup-select-account">
      <BaseRadioButton
        id="1"
        v-model="business"
        label="Personal Account"
        value="business"
        checked
        v_value="Personal Account"
        name="test-radio"
        class="subscriptions-popup-select-account__radio-button"
      />

      <BaseRadioButton
        id="2"
        v-model="business"
        label="Business Account"
        value="business"
        v_value="Business Account"
        name="test-radio"
        class="subscriptions-popup-select-account__radio-button"
      />
    </div>

    <div class="subscriptions-popup-user-info">
      <div
        v-if="business === 'Business Account'"
      >
        <div
          class="subscriptions-popup-user-info__business-items">
          <MyHolderlabItem
            :editable="true"
            :data="company_name"
            v-model="company_name"
            label="COMPANY NAME"
            class="business-item"
          />
          
          <MyHolderlabItem
            :editable="true"
            :data="company_vat_number"
            
            v-model="company_vat_number"
            label="VAT NUMBER"
            class="business-item"
          />
          
        </div>
        <div> 
          <!--не трогайте этот див иначе все будет плохо-->
          <BaseSelectSearch
            v-model = "company_country"
            :active_item = "company_country"
            class="subscriptions-popup-user-info__input"
          >
            Choose country
          </BaseSelectSearch>
        </div>
        
        <MyHolderlabItem
          :editable="true"
          :data="company_address"
          v-model="company_address"
          label="ADDRESS"
          class="subscriptions-popup-user-info__item"
        />

        <MyHolderlabItem
          :editable="true"
          :data="company_city"
          v-model="company_city"
          label="CITY"
          class="subscriptions-popup-user-info__item"
        />

        <MyHolderlabItem
          :editable="true"
          :data="company_postal"
          v-model="company_postal"
          label="POSTAL/ZIP CODE"
          class="subscriptions-popup-user-info__item"
        />
      </div>
      <div
        v-else>
        
        <BaseSelectSearch 
          :active_item = "user_country"
          v-model = "user_country"
          class="subscriptions-popup-user-info__input"
        >
          Choose country
        </BaseSelectSearch>
        
        <MyHolderlabItem
          :editable="true"
          :data="user_address"
          v-model="user_address"
          label="ADDRESS"
          class="subscriptions-popup-user-info__item"
        />

        <MyHolderlabItem
          :editable="true"
          :data="user_city"
          v-model="user_city"
          label="CITY"
          class="subscriptions-popup-user-info__item"
        />

        <MyHolderlabItem
          :editable="true"
          :data="user_postal"
          v-model="user_postal"
          label="POSTAL/ZIP CODE"
          class="subscriptions-popup-user-info__item"
        />
      </div>
    </div>

    <div class="subscriptions-popup__save">
      <!--:is-inactive="subscriptions_save"-->
      <BaseButton 
        type="primary" 
        class="payment-avalible-button"
        @click.native= "click_save()">
        SAVE
      </BaseButton>
    </div>
  </BasePopup>
</template>

<style lang="scss" scoped>
.subscriptions-popup {
  &__headline {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-select-account {
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: em(423px);
    margin-bottom: em(30px);
  }
  &-user-info {
    border-bottom: 1px solid $grey;
    margin-bottom: em(50px);
    &__business-items {
      border-bottom: 1px solid $grey;
      margin-bottom: em(30px);
    }
    &__input {
      width: 100%;
      max-width: em(423px);
      margin-bottom: em(30px);
    }
  }
  &__save {
    display: flex;
    justify-content: flex-end;
    @include ifmobile {
      justify-content: center;
    }
  }
}
</style>
