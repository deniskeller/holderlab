<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import MyHolderlabItem from '~/components/content/account/MyHolderlabItem';
import countryData from '~/assets/data/country.json';

export default {
  components: {
    MyHolderlabItem
  },
  data() {
    return {
      countryData:'',
      value_radio:''
    };
  },
  computed: {
    ...mapState('page', ['userInfo','companyInfo']),
    
    user_country:{
      get(){
        return this.userInfo.country
      },
      set(value){
        this.changeUserCountry(value);
      }
    },
    
    user_city:{
      get(){
      return this.userInfo.city
      },
      set(value){
        this.changeUserCity(value);
      }
    },
    
    user_postal:{
      get(){
        return this.userInfo.postal
      },
      set(value){
        this.changeUserPostal(value);
      }
    },
    
    user_address:{
      get(){
        return this.userInfo.address
      },
      set(value){
        this.changeUserAddress(value);
      }
    },
    
    company_name:{
      get(){
      return this.companyInfo.name
      },
      set(value){this.changeCompanyName(value)}
    },
    
    company_vat_number:{
      get(){
      return this.companyInfo.number
      },
      set(value){
        this.changeCompanyNumber(value)
      }
    },
    
    company_country:{
      get(){
      return this.companyInfo.country
    },
      set(value){
        this.changeCompanyCountry(value)
      }
    },
    
    company_address:{
      get(){
      return this.companyInfo.address
      },
      set(value){
        this.changeCompanyAddress(value)
      }
    },
    
    company_city:{
      get(){
      return this.companyInfo.city
      },
      set(value){this.changeCompanyCity(value)}
    },
    
    company_postal:{
      get(){
        return this.companyInfo.postal
      },
      set(value){this.changeCompanyPostal(value)}
    },
  },
  mounted() {},
  
  methods: {
    ...mapMutations('page', ['setPopup',
    'changeUserCountry',
    'changeUserCity',
    'changeUserPostal',
    'changeUserAddress',
    'changeCompanyName',
    'changeCompanyPostal',
    'changeCompanyNumber',
    'changeCompanyCity',
    'changeCompanyAddress',
    'changeCompanyCountry']),
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
      {{value_radio}}
      <BaseRadioButton
        id="1"
        v-model="value_radio"
        label="Personal Account"
        v_value="radio-1"
        name="test-radio"
        class="subscriptions-popup-select-account__radio-button"
      />

      <BaseRadioButton
        id="2"
        v-model="value_radio"
        label="Business Account"
        v_value="radio-2"
        name="test-radio"
        class="subscriptions-popup-select-account__radio-button"
      />
    </div>

    <div class="subscriptions-popup-user-info">
      <div class="subscriptions-popup-user-info__business-items">
        <MyHolderlabItem
          :editable="true"
          label="COMPANY NAME"
          :data="company_name"
          class="business-item"
        />

        <MyHolderlabItem
          :editable="true"
          label="VAT NUMBER"
          :data="company_vat_number"
          class="business-item"
        />
          <BaseSelectSearch
          v-model="selected"
          type="form"
          class="subscriptions-popup-user-info__input"
        >
          Choose country
        </BaseSelectSearch>
  
        <MyHolderlabItem
          :editable="true"
          label="ADDRESS"
          :data="company_address"
          class="subscriptions-popup-user-info__item"
        />
  
        <MyHolderlabItem
          :editable="true"
          label="CITY"
          data="Sochi"
          class="subscriptions-popup-user-info__item"
        />
  
        <MyHolderlabItem
          :editable="true"
          label="POSTAL/ZIP CODE"
          data="34543123"
          class="subscriptions-popup-user-info__item"
        />
      </div>

      <BaseSelectSearch
        v-model="selected"
        type="form"
        class="subscriptions-popup-user-info__input"
      >
        Choose country
      </BaseSelectSearch>

      <MyHolderlabItem
        :editable="true"
        label="ADDRESS"
        :data="company_address"
        class="subscriptions-popup-user-info__item"
      />

      <MyHolderlabItem
        :editable="true"
        label="CITY"
        data="Sochi"
        class="subscriptions-popup-user-info__item"
      />

      <MyHolderlabItem
        :editable="true"
        label="POSTAL/ZIP CODE"
        data="34543123"
        class="subscriptions-popup-user-info__item"
      />
    </div>

    <div class="subscriptions-popup__save">
      <BaseButton type="primary" class="payment-avalible-button">
        SAVE
      </BaseButton>
    </div>
  </BasePopup>
</template>

<style lang="scss" scoped>
.subscriptions-popup {
  @include ifdesktop {
    width: em(788px);
    left: 50%;
    margin-left: em(-394px);
  }
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
  }
}
</style>
