<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<template>
  <div class="dashboard-graph">
    <div class="dashboard-graph__grid">
      <div 
        v-for="index in 5 * 2" 
        :key="index" 
        class="dashboard-graph__cell" />
    </div>

    <div class="dashboard-graph__labels dashboard-graph__labels_column">
      <div class="dashboard-graph__label dashboard-graph__label_column">
        $668
      </div>
      <div class="dashboard-graph__label dashboard-graph__label_column">
        $654
      </div>
    </div>

    <div class="dashboard-graph__labels dashboard-graph__labels_row">
      <div class="dashboard-graph__label">
        4:14 PM
      </div>
      <div class="dashboard-graph__label">
        9:38 PM
      </div>
      <div class="dashboard-graph__label">
        0:38 AM
      </div>
      <div class="dashboard-graph__label">
        5:12 AM
      </div>
    </div>

    <svg
      class="dashboard-graph__curve dashboard-graph__curve_blue"
      viewBox="0 0 718 130"
    >
      <path
        d="M1 104.329C3.5035 108.207 9.81231 114.568 15.0196 108.983C21.5287 102.001 34.1128 60.3835 44.5608 78.7291C71.5986 126.204 100.138 132.255 128.678 78.7291C145.938 46.359 146.703 53.1297 162.726 78.7291C178.748 104.329 195.772 91.7616 200.278 79.66C204.785 67.5585 215.299 68.0239 220.807 78.7291C226.315 89.4344 238.331 128.532 257.358 128.997C276.385 129.463 285.898 73.6093 304.924 73.6093C323.951 73.6093 323.951 108.983 347.484 108.983C371.017 108.983 384.536 1 430.6 1C481.671 1 479.337 119.223 520.726 119.223C551.769 119.223 554.273 51.7334 573.8 51.7334C600.838 51.7334 628.877 147.615 717 5.65443"
      />
    </svg>

    <svg
      class="dashboard-graph__curve dashboard-graph__curve_red"
      viewBox="0 0 718 130"
    >
      <path
        d="M1 104.329C3.5035 108.207 9.81231 114.568 15.0196 108.983C21.5287 102.001 34.1128 60.3835 44.5608 78.7291C71.5986 126.204 100.138 132.255 128.678 78.7291C145.938 46.359 146.703 53.1297 162.726 78.7291C178.748 104.329 195.772 91.7616 200.278 79.66C204.785 67.5585 215.299 68.0239 220.807 78.7291C226.315 89.4344 238.331 128.532 257.358 128.997C276.385 129.463 285.898 73.6093 304.924 73.6093C323.951 73.6093 323.951 108.983 347.484 108.983C371.017 108.983 384.536 1 430.6 1C481.671 1 479.337 119.223 520.726 119.223C551.769 119.223 554.273 51.7334 573.8 51.7334C600.838 51.7334 628.877 147.615 717 5.65443"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-graph {
  position: relative;

  &__grid {
    display: flex;
    flex-wrap: wrap;
    border-right: 1px solid $grey;
    border-bottom: 1px solid $grey;
    box-sizing: border-box;
    margin-left: -1px;
  }

  &__cell {
    position: relative;
    border-top: 1px solid $grey;
    border-left: 1px solid $grey;
    box-sizing: border-box;
    width: 20%;
    @include ifdesktop {
      height: em(160px);
    }
    @include ifmobile {
      height: em(100px);
    }
  }

  &__labels {
    position: absolute;

    &_column {
      flex-direction: column-reverse;
      top: em(-14px);
      left: em(14px);
      height: 100%;
    }

    &_row {
      width: 100%;
      padding-left: 10%;
      box-sizing: border-box;
      text-align: center;
      display: flex;
      @include ifdesktop {
        bottom: 0;
      }
      @include ifmobile {
        color: $grey;
        bottom: em(-20px);
      }
    }
  }

  &__label {
    $size: 12px;
    font-size: em($size);
    width: 22%;
    box-sizing: border-box;

    &_column {
      height: 50%;
    }
  }

  &__curve {
    position: absolute;
    fill: none;
    width: 100%;
    height: 100%;
    left: 0;

    &_blue {
      stroke: $blue;
      top: 0;
    }
    &_red {
      top: em(-20px);
      stroke: $red;
    }
  }
}
</style>
