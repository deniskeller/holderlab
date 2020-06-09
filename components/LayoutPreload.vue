<script>
import BaseTitle from '~/components/base/BaseTitle';
import BaseContainer from '~/components/base/BaseContainer';
// import BaseAside from '~/components/base/BaseAside';
import BaseButton from '~/components/base/BaseButton';
import BaseInput from '~/components/base/BaseInput';
import BaseSelect from '~/components/base/BaseSelect';
import BaseSwitch from '~/components/base/BaseSwitch';
import BaseCoin from '~/components/base/BaseCoin';
import BaseCurrency from '~/components/base/BaseCurrency';
import BaseClose from '~/components/base/BaseClose';
import BaseContent from '~/components/base/BaseContent';
import BaseHeadline from '~/components/base/BaseHeadline';
import BaseHelpBanner from '~/components/base/BaseHelpBanner';
import BaseAngleBar from '~/components/base/BaseAngleBar';
import BasePercentTip from '~/components/base/BasePercentTip';
import BaseSearchField from '~/components/base/BaseSearchField';
import BaseRadio from '~/components/base/BaseRadio';
import BaseCheckbox from '~/components/base/BaseCheckbox';
import BaseCheckboxSlider from '~/components/base/BaseCheckboxSlider';
import BasePopup from '~/components/base/BasePopup';
import BaseAllocatedHeader from '~/components/base/BaseAllocatedHeader';
import BaseSettings from '~/components/base/BaseSettings';

export default {
  components: {
    BaseTitle,
    BaseContainer,
    BaseButton,
    BaseInput,
    BaseSelect,
    BaseSwitch,
    BaseCoin,
    BaseCurrency,
    BaseClose,
    BaseContent,
    BaseHeadline,
    BaseHelpBanner,
    BaseAngleBar,
    BasePercentTip,
    BaseSearchField,
    BaseRadio,
    BaseCheckbox,
    BaseCheckboxSlider,
    BasePopup,
    BaseAllocatedHeader,
    BaseSettings
  }
};
</script>

<template>
  <div class="layout-preload">
    <BaseContainer />
    <BaseButton />
    <BaseInput />
    <BaseSelect />
    <BaseCoin />
    <BaseCurrency />
    <BaseTitle />
    <BaseClose />
    <BaseContent />
    <BaseHeadline />
    <BaseAngleBar />
    <BasePercentTip />
    <BaseRadio />
    <BaseCheckbox />
    <BaseCheckboxSlider />
    <BasePopup />
    <BaseAllocatedHeader />
    <BaseSettings />
  </div>
</template>

<style>
.layout-preload {
  display: none;
}
</style>
