<template>
  <span class="filterDateRange">
    <input v-model="minValue" type="date" min="2000-01-01" :max="today">
    부터
    <input v-model="maxValue" type="date" min="2000-01-01" :max="today">
    까지
  </span>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class FilterDateRange extends Vue {
    d: Date = new Date()
    year:number = this.d.getFullYear()
    month:number = this.d.getMonth() + 1
    day:number = this.d.getDate()
    today:string = `${this.year}-${this.month.toString().padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`

    // 초기 설정이 되어 있지 않다면 오늘을 기본 값으로 한다.
    get minValue (): string {
      if (!this.$store.state.product.filterRangeMin) {
        this.minValue = this.today
        return this.today
      }

      return this.$store.state.product.filterRangeMin
    }

    set minValue (value: string) {
      this.$store.commit('product/SET_FILTER_RANGE_MIN', value)
    }

    get maxValue (): string {
      if (!this.$store.state.product.filterRangeMax) {
        this.maxValue = this.today
        return this.today
      }
      return this.$store.state.product.filterRangeMax
    }

    set maxValue (value: string) {
      this.$store.commit('product/SET_FILTER_RANGE_MAX', value)
    }
}
</script>
<style lang="scss" scoped>
.filterDateRange{
    & input {
        width : 8rem;
        padding: 5px;
        border: 1px solid #000;
        font-size: 14px;
        border-radius: 5px;
        &::-webkit-calendar-picker-indicator {
            padding: 0;
            margin: 0;
        }
    }
}
@media only screen and (max-width: "640px"){
    .filterDateRange{
        & input{
            width: 7rem;
        }
    }
}
</style>
