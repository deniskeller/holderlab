<script>
import { mapMutations, mapState, mapActions } from 'vuex';

import NavAccount from '~/components/nav/NavAccount';
import HistoryItem from '~/components/content/account/HistoryItem';
import MessagePopup from '~/components/content/account/MessagePopup';
import MessagePopupRate from '~/components/content/account/MessagePopupRate';
import AddToReadyMadePopup from '~/components/content/dashboard/AddToReadyMadePopup';

export default {
  components: {
    NavAccount,
    HistoryItem,
    MessagePopup,
    MessagePopupRate,
    AddToReadyMadePopup
  },
  head: {
    bodyAttrs: {
      class: 'account'
    }
  },

  computed: {
    ...mapState('page', [
      'messagePack',
      'laterMessage',
      'activeHistoryMessage'
    ]),

    today_mail_stack() {
      return this.messagePack.today_mail_stack;
    },

    yesterday_mail_stack() {
      return this.messagePack.yesterday_mail_stack;
    },

    weekly_mail_stack() {
      return this.messagePack.weekly_mail_stack;
    },

    mounth_mail_stack() {
      return this.messagePack.mounth_mail_stack;
    },

    later_message() {
      return this.laterMessage;
    },

    active_history_message() {
      return this.activeHistoryMessage;
    }
  },

  beforeDestroy() {
    this.setLaterMessage(null);
  },

  methods: {
    ...mapMutations('page', ['setPopup', 'setLaterMessage']),

    ...mapActions('page', ['getHistoryLatestMessage'])
  }
};
</script>

<template>
  <div class="history">
    <BaseContainer>
      <BaseContent>
        <div class="matrix__headline">
          <BaseHeadline 
            title="History" 
            class="matrix__headline-title" />
        </div>

        <BaseSearchField
          placeholder="SEARCH"
          class="history__search"
        />

        <div class="history__label">
          TODAY
        </div>
        
        <span
          v-for="(item, index1) in today_mail_stack"
          :key="'A' + index1">
          <HistoryItem
            :date="item.time"
            :text="item.title"
            :is_show_content="item.data.is_show"
            :type="item.type"
            :from="item.from"
            :all_data="item"
            class="history__item"
            :class="{ 'history__item' :  item.is_viewed }"
          />
        </span>

        <div class="history__label">
          YESTERDAY
        </div>
        
        <span
          v-for="(item, index2) in yesterday_mail_stack"
          :key="'B' + index2">
          <HistoryItem
            :date="item.time"
            :text="item.title"
            :is_show_content="item.data.is_show"
            :type="item.type"
            :from="item.from"
            :all_data="item"
            :class="{ 'history__item' :  item.is_viewed }"
          />
        </span>

        <div class="history__label">
          <!--THIS WEEK-->
          LAST SEVEN DAYS
        </div>
        <span
          v-for="(item, index3) in mounth_mail_stack"
          :key="'C' + index3">
          <HistoryItem
            :date="item.date"
            :text="item.title"
            :is_show_content="item.data.is_show"
            :type="item.type"
            :from="item.from"
            :all_data="item"
            :class="{ 'history__item' :  item.is_viewed }"
          />
        </span>
        

        <div class="history__label">
          <!--THIS MONTH-->
          LAST 30 DAYS
        </div>
        <span
          v-for="(item, index4) in weekly_mail_stack"
          :key="'D' + index4">
          <HistoryItem
            :date="item.date"
            :text="item.title"
            :is_show_content="item.data.is_show"
            :type="item.type"
            :from="item.from"
            :all_data="item"
            :class="{ 'history__item' :  item.is_viewed }"
          />
        </span>
        
        <div 
          v-if ="later_message"
          class="history__label">
          LATER
        </div>
        <span
          v-for="(item, index5) in later_message"
          :key="'E' + index5">
          <HistoryItem
            :date="item.date"
            :text="item.title"
            :is_show_content="item.data.is_show"
            :type="item.type"
            :from="item.from"
            :all_data="item"
            :class="{ 'history__item' :  item.is_viewed }"
          />
        </span>
        <!--:class="['history__item is_active', { 'history__item' :  item.is_viewed }]"-->

        <BaseButton
          v-if ="!later_message"
          type="primary" 
          class="history__button"
          @click.native="getHistoryLatestMessage()"
        >
          EARLIER
        </BaseButton>
      </BaseContent>

      <BaseAside>
        <NavAccount class="history__nav" />
        <BaseHelpBanner
          to="/help"
          icon="email"
          style="background-image: url(/img/help/1.png)"
          class="history__help-banner"
        >
          SUPPORT TEAM
        </BaseHelpBanner>
      </BaseAside>
    </BaseContainer>

    <MessagePopup
      class="history__message-popup history__message-popup_1"
    />

    <MessagePopup
      class="history__message-popup history__message-popup_2"
    />

    <AddToReadyMadePopup class="ready-made__add-to-ready-made-popup" />
  </div>
</template>

<style lang="scss">
.matrix__headline {
  @include ifmobile {
    background: $purple;
    text-align: center;
    color: $white;
    width: 100%;
  }
}

.history {
  &__nav {
    margin-bottom: em(50px);
    @include ifmobile {
      display: none;
    }
  }
  &__label {
    $size: 14px;
    font-size: em($size);
    font-weight: bold;
    margin: em(20px, $size) 0 em(14px);
    @include ifmobile {
      padding-left: em(15px);
    }
  }
  &__item {
    @include ifdesktop {
      margin-bottom: em(6px);
    }
    @include ifmobile {
      margin-bottom: em(2px);
    }
  }
  &__button {
    @include ifdesktop {
      margin-top: em(50px);
    }
    @include ifmobile {
      display: flex;
      margin: em(50px) auto 0;
    }
  }
  &__search {
    @include ifmobile {
      display: none;
    }
  }
}
</style>
