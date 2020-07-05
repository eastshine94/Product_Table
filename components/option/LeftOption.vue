<template>
  <div class="leftOptionWrapper">
    <button :class="{active: !showChart}" @click.prevent="onClickTableBtn">
      Table
    </button>
    <button :class="{active: showChart}" @click.prevent="onClickChartBtn">
      Chart
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class LeftOption extends Vue {
  get showChart (): boolean {
    return this.$store.state.base.showChart
  }

  onClickTableBtn () {
    this.$store.commit('base/SET_SHOW_CHART', false)
  }

  onClickChartBtn () {
    this.$store.commit('base/SET_SHOW_CHART', true)
  }
}
</script>

<style lang="scss" scoped>
.leftOptionWrapper {
  margin-top: 35px;
  & button {
    margin: 0;
    padding: 5px 20px;
    font-size: 15px;
    font-weight: bold;
    color: #fff;
    background-color: rgb(162, 152, 216);
    border: 1px solid rgb(4, 2, 37);
    cursor: pointer;
  }
  & .active{
    background-color: rgb(25, 18, 112);
  }
}

</style>
