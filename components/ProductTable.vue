<template>
  <section class="productTableWrapper">
    <table class="productTable">
      <ProductTableHeader />
      <ProductTableBody :products="products" />
    </table>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { ProductTableHeader, ProductTableBody } from './table'
import { ProductDto, ProductUrlQueryDto, OrderCol, OrderDirection, FilterDto } from '@/types'

@Component({
  components: {
    ProductTableHeader,
    ProductTableBody
  }
})
export default class ProductTable extends Vue {
  get products (): Array<ProductDto> {
    return this.$store.state.product.products
  }

  get query (): ProductUrlQueryDto {
    return this.$route.query as ProductUrlQueryDto
  }

  // 처음 렌더링 될 때, products를 설정한다.
  async created () {
    const query = this.$route.query as ProductUrlQueryDto
    const currentPage: string|undefined = query.page
    const perPage: string|undefined = query.perPage
    const orderCol: OrderCol|undefined = query.orderCol
    const orderDirection: OrderDirection|undefined = query.orderDirection
    try {
      await this.initCurrentPage(currentPage)
      await this.initPerPage(perPage)
      await this.initOrderCol(orderCol)
      await this.initOrderDirection(orderDirection)
      await this.initAppliedFilter()
      await this.$store.dispatch('product/getProducts')
      await this.$store.dispatch('pagination/initPages')
    } catch (error) {
      this.$router.replace('/error')
    }
  }

  destroyed () {
    this.initCurrentPage('1')
    this.initPerPage('20')
    this.initOrderCol('sale_price')
    this.initOrderDirection('desc')
    this.$store.commit('product/INIT_APPLY_FILTER')
  }

  // query의 변화할 때마다 products를 불러온다.
  @Watch('query')
  async changeQuery () {
    await this.$store.commit('base/SET_SHOW_CHART', false)
    await this.$store.dispatch('product/getProducts')
    await this.$store.dispatch('pagination/initPages')
    window.scroll(0, 0)
  }

  initCurrentPage (currentPage: string|undefined) {
    if (currentPage) {
      this.$store.commit('pagination/SET_CURRENT_PAGE', parseInt(currentPage))
    }
  }

  initPerPage (perPage: string|undefined) {
    if (perPage) {
      this.$store.commit('product/SET_PER_PAGE', parseInt(perPage))
    }
  }

  initOrderCol (orderCol: OrderCol|undefined) {
    if (orderCol) {
      this.$store.commit('product/SET_ORDER_COL', orderCol)
    }
  }

  initOrderDirection (orderDirection: OrderDirection|undefined) {
    if (orderDirection) {
      this.$store.commit('product/SET_ORDER_DIRECTION', orderDirection)
    }
  }

  // query에서 적용된 필터의 값을 얻어내 설정한다.
  initAppliedFilter () {
    const query = this.$route.query
    const filterTarget: Array<OrderCol> = ['base_price', 'sale_price', 'created_at']
    const filterName: Array<string> = ['판매원가', '판매가', '등록시기']
    filterTarget.forEach((target, idx) => {
      if (query[target]) {
        const minMax: string = query[target] as string
        const splitMinMax = minMax.split('~')
        const min = splitMinMax[0]
        const max = splitMinMax[1]
        this.catchFilterError(min, max)
        const filter: FilterDto = { option: { name: filterName[idx], value: target }, minValue: min, maxValue: max }
        this.$store.commit('product/ADD_FILTER', filter)
      }
    })
  }

  // 잘못된 filter option의 url이 들어오면 에러페이지를 호출한다.
  catchFilterError (min: string, max: string) {
    if (min.length > 10 || max.length > 10) {
      throw new RangeError('잘못된 url')
    }
    const minToNumber: string = min.replace(/[-,]/g, '')
    const maxToNumber: string = max.replace(/[-,]/g, '')
    if (minToNumber.match(/[^0-9]/) || maxToNumber.match(/[^0-9]/)) {
      throw new TypeError('잘못된 url')
    } else if (parseInt(minToNumber) > parseInt(maxToNumber)) {
      throw new RangeError('잘못된 url')
    }
  }
}
</script>

<style lang="scss">
.productTableWrapper{
  margin-bottom: 10px;
}
.productTable{
  width: 100%;
  text-align: center;
  border: 1px solid #000;
  border-collapse: collapse;
  table-layout: fixed;

  & td, th {
    border: 1px solid #000;
    padding: 8px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 13px;
  }
}
</style>
