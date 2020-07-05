<template>
  <span class="filterRangeWrapper">
    <FilterDateRange v-if="selectedOption.value === 'created_at'" />
    <FilterPriceRange v-else />
    <button @click.prevent="onClickApplyButton">적용</button>
  </span>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { FilterPriceRange, FilterDateRange } from './blocks'
import { ProductOptionDto, FilterDto } from '@/types'

@Component({
  components: {
    FilterPriceRange,
    FilterDateRange
  }
})
export default class FilterRange extends Vue {
  get selectedOption () : ProductOptionDto {
    return this.$store.state.product.filterOption
  }

  get appliedFilters (): Array<FilterDto> {
    return this.$store.state.product.appliedFilters
  }

  // 버튼 클릭 필터 적용 & URI 쿼리 파라미터 변경
  async onClickApplyButton () {
    await this.$store.dispatch('product/onClickApplyFilterBtn')
    await this.changeQuery()
  }

  // URI 쿼리 파라미터 변경 ex) sale_price=5,000~50,000
  changeQuery () {
    const router = this.$router
    const query = this.$route.query
    const newQuery:{[key:string]: string|(string|null)[]} = { ...query }
    const appliedFilters: Array<FilterDto> = this.$store.state.product.appliedFilters
    appliedFilters.forEach((filter) => {
      const optionVal: string = filter.option.value
      const minValue: string = filter.minValue
      const maxValue: string = filter.maxValue
      newQuery[optionVal] = `${minValue}~${maxValue}`
    })
    if (JSON.stringify(query) !== JSON.stringify(newQuery)) {
      this.$store.commit('pagination/SET_CURRENT_PAGE', 1)
      newQuery.page = '1'
      router.replace({ query: newQuery })
    }
  }
}
</script>
<style lang="scss" scoped>
.filterRangeWrapper{
    & button {
        color: #fff;
        padding: 5px;
        margin-left: 3px;
        background-color: #949393;
        border-radius: 5px;
        &:active{
        background: #8d6060;
        }
    }
}

</style>
