<script>
import { mapMutations } from 'vuex';
import TickIcon from '~/components/icons/TickIcon';

export default {
  components: {
    TickIcon
  },
  methods: {
    ...mapMutations('page', ['setPopup'])
  }
};
</script>

<template>
  <BaseLandingPopup class="ready-made-popap">
    <BaseHeadline
      title="Upgrade to holder plan level! Enjoy it"
      class="ready-made-popap__headline"
    />

    <table class="ready-made-popap__table">
      <tbody>
        <tr>
          <td
            class="ready-made-popap__td ready-made-popap__td_1 ready-made-popap__td_first"
          />
          <td class="ready-made-popap__td ready-made-popap__td_2">
            FREE
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_3">
            HOLDER <br >
            $ 7.99/M
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            HOLDER PRO <br >
            $ 13.99/M
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Link any available exchange
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2">
            <TickIcon class="ready-made-popap__tick" />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_3">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Use correlation matrix
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2">
            <TickIcon class="ready-made-popap__tick" />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_3">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Find efficient frontier
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2">
            <TickIcon class="ready-made-popap__tick" />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_3">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Customize optimal weight portfolio
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2">
            <TickIcon class="ready-made-popap__tick" />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_3">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Automatic portfolio rebalancing
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2">
            <TickIcon class="ready-made-popap__tick" />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_3">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Backtest any portfolio
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2" />
          <td class="ready-made-popap__td ready-made-popap__td_3">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Ready-made portfolio
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2" />
          <td class="ready-made-popap__td ready-made-popap__td_3">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Market scan tool
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2" />
          <td class="ready-made-popap__td ready-made-popap__td_2" />
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
        <tr>
          <td class="ready-made-popap__td ready-made-popap__td_1">
            Trailing stop + Emergency option
          </td>
          <td class="ready-made-popap__td ready-made-popap__td_2" />
          <td class="ready-made-popap__td ready-made-popap__td_2" />
          <td class="ready-made-popap__td ready-made-popap__td_4">
            <TickIcon
              class="ready-made-popap__tick ready-made-popap__tick_white"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="ready-made-popap__button-container">
      <BaseButton
        to="/ready-made/card"
        type="primary"
        class="ready-made-popap__button"
        @click.native="setPopup(null)"
      >
        UPGRADE
      </BaseButton>
      <BaseButton
        to="/ready-made/card"
        type="orange"
        class="ready-made-popap__button"
      >
        UPGRADE
      </BaseButton>
    </div>
  </BaseLandingPopup>
</template>

<style lang="scss" scoped>
.ready-made-popap {
  position: fixed;
  height: 100%;
  .base-popup__container {
    @include ifdesktop {
      padding-right: em(97px);
    }
  }
  &__headline {
    text-align: center;
    @include ifmobile {
      padding-top: em(20px);
    }
  }
  &__table {
    border-spacing: em(6px);
  }
  &__td {
    height: em(70px);
    box-sizing: border-box;

    &_1 {
      width: 40%;
      border: 1px solid $grey;
      padding-left: em(24px);
    }
    &_2,
    &_3,
    &_4 {
      $size: 12px;
      font-size: em($size);
      width: 10%;
      text-align: center;
      font-weight: bold;
    }
    &_2 {
      background: $light-blue;
      color: $blue;
    }
    &_3,
    &_4 {
      background: $blue;
      color: $white;
    }

    &_first {
      border: none;
    }
  }

  &__tick {
    width: em(12px);
    height: em(10px);
    fill: $blue;

    &_white {
      fill: $white;
    }
  }

  &__button-container {
    text-align: right;
    margin-top: em(30px);
    padding-right: em(6px);
  }
}
</style>
