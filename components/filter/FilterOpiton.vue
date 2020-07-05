<template>
  <div class="filterOptionWrapper">
    <SelectList :options="filterTargets" @selectedOption="onChangeFilterOption" />
    <form>
      <FilterRange />
    </form>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FilterRange from './range/FilterRange.vue'
import { SelectList } from '@/components/shared'
import { ProductOptionDto } from '@/types'

@Component({
  components: {
    SelectList,
    FilterRange
  }
})
export default class FilterOption extends Vue {
    filterTargets: Array<ProductOptionDto> = [
      { name: '판매가', value: 'sale_price' },
      { name: '판매원가', value: 'base_price' },
      { name: '등록시기', value: 'created_at' }
    ]

    // 처음 랜더링 될 때, 가장 첫 번째 값이 select 되도록 한다.
    created () {
      this.$store.commit('product/SET_FILTER_OPTION', this.filterTargets[0])
    }

    // 자식 컴포넌트에서 보낸 option을 product store에 filterOption state에 저장한다.
    onChangeFilterOption (selectedOption: ProductOptionDto) {
      this.$store.commit('product/SET_FILTER_OPTION', selectedOption)
    }
}
</script>
<style lang="scss" scoped>
  .filterOptionWrapper{
      display: flex;
      justify-content: space-around;
      width: 85%;
      margin: 0 auto;
      padding: 10px;
      background-color: #6d8591;
      border-radius: 5px;
      & select {
        width: 25%;
        color: #fff;
        background-color: #516a72;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid #000;
      }
      & form {
        display: inline-block;
        color: #fff;
      }
  }

  @media only screen and (max-width: "640px"){

    .filterOptionWrapper{
        width: 100%;
        border-radius: 0px;
        padding-right: 0px;
        padding-left: 0px;
    }
  }
</style>
