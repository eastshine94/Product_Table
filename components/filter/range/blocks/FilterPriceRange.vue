<template>
  <span class="filterPriceRange">
    <input
      :value="minValue"
      type="text"
      placeholder="0"
      :maxlength="maxLength"
      @input="minValueInputChange"
    > 원
    ~
    <input
      :value="maxValue"
      type="text"
      placeholder="99,999,999"
      :maxlength="maxLength"
      @input="maxValueInputChange"
    > 원
  </span>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class FilterPriceRange extends Vue {
  // 입력 값을 comma(,) 포함 10자리 즉, 99,999,999까지 받을 수 있다.
  maxLength: number = 10
  get minValue (): string {
    return this.$store.state.product.filterRangeMin
  }

  set minValue (value: string) {
    this.$store.commit('product/SET_FILTER_RANGE_MIN', value)
  }

  get maxValue (): string {
    return this.$store.state.product.filterRangeMax
  }

  set maxValue (value: string) {
    this.$store.commit('product/SET_FILTER_RANGE_MAX', value)
  }

  // input 값이 숫자만 받게 만든다. 또한, product store에 filterRangeMin, filterRangeMax 값을 저장한다.
  minValueInputChange (e: Event) {
    const element: HTMLInputElement = e.target as HTMLInputElement
    const value: string = element.value
    const minValue: string = this.onlyNumber(value)
    element.value = minValue
    this.minValue = minValue
  }

  maxValueInputChange (e: Event) {
    const element: HTMLInputElement = e.target as HTMLInputElement
    const value: string = element.value
    const maxValue: string = this.onlyNumber(value)
    element.value = maxValue
    this.maxValue = maxValue
  }

  // 입력 값에 숫자만을 표시한다. 또한 toLocaleString를 통해 천 단위 마다 ,를 찍게한다. ex) 1,000
  onlyNumber (value: string): string {
    value = value.replace(/[^0-9]/g, '')
    value = value ? parseInt(value).toLocaleString() : ''
    return value
  }
}
</script>
<style lang="scss" scoped>
.filterPriceRange{
    & input {
        width : 8rem;
        padding: 5px;
        border: 1px solid #000;
        font-size: 14px;
        border-radius: 5px;
        &::placeholder{
            color: #dbd9d9;
        }
    }
}
@media only screen and (max-width: "640px"){
    .filterPriceRange{
        & input{
            width: 7rem;
        }
    }
}
</style>
