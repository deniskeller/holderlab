<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  layout: 'modal',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState('page', ['popup',
    'activeEmailReg',
    'pass_log']),
  
  active_email_reg(){
     return this.activeEmailReg
   },
  
  pass(){
     return this.pass_log
   } 
    
  },
  methods: {
    ...mapMutations('page', ['setPopup']),
    
    ...mapActions('page', ['confirmEmail','getMessage']),
    
    click_buttom(){
      if (!this.pass || !this.active_email_reg){
        this.$router.push({ path: '/landing-modal/hello/'});
      } else{
        this.confirmEmail({
          'email':this.active_email_reg,
          'password':this.pass
        })
      }
    }
  }
};
</script>

<template>
  <div class="content">
    <div class="modal modal-signing">
      
      <div class="modal-signing__title">
        THANK YOU <span class="modal-text__orange">HOLDER</span> FOR SIGNING UP!
      </div>
        
      <div class="modal-signing__text">
        <span class="modal-text__orange">Check your email</span> {{active_email_reg}}. We have sent you a link to confirm your email address. <br> Please click on the confirmation link inside this email to complete the registration process. It could take up to 10 minutes to show up in your inbox.
      </div>
        
      <BaseButton
        type="orange"
        class="modal-signing__btn"
        @click.native = "click_buttom()"
      >
        resend email
      </BaseButton>
        
      <div class="modal-signing__stages">
        <div class="modal-signing__stages-title">
          Didn’t receive the email?
        </div>
        <div class="modal-signing__stages-item">1. Check your spam folder</div>
        <div class="modal-signing__stages-item">2. Click on “resend email” button above</div>
        <div class="modal-signing__stages-item">3. Still having trouble, write about your porblem on contacts@holderlab.io</div>
          
      </div>
      
      
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  $this: &;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  height: 100%;
  background: url('/img/reset_password.png') no-repeat 100% 100%;
  -webkit-background-size: cover;
  background-size: cover;
  .modal-signing {
    width: 100%;
    max-width: em(670px);
    text-align: center;
    margin: 0 auto;
    @include ifmobile {
      padding: em(20px);
    }

    &__title {
      width: 100%;
      max-width: 13em;
      font-size: em(40px);
      font-weight: 600;
      color: $white;
      line-height: em(28px);
      text-align: center;
      margin: 0 auto;
      margin-bottom: em(15px);
      @include ifmobile {
        font-size: em(24px);
        max-width: 12em;
      }
      .modal-text__orange {
        color: $orange;
      }
    }

    &__text {
      width: 100%;
      max-width: em(540px);
      font-size: em(20px);
      color: $white;
      line-height: em(28px);
      margin-bottom: em(35px);
      text-align: left;
      @include ifmobile {
        font-size: em(14px);
        text-align: center;
      }
      .modal-text__orange {
        color: $orange;
      }
    }

    &__btn {
      margin-bottom: em(35px);
    }

    &__stages {
      font-size: em(20px);
      color: $white;
      text-align: left;
      @include ifmobile {
        font-size: em(14px);
        text-align: center;
      }
      &-title {
        color: $orange;
      }
    }
  }
}
</style>
