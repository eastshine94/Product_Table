<template>
  <div class="chartWrapper">
    <Loading v-if="showLoadingPage" />
    <div v-if="!showLoadingPage && isChartExist" id="chart" ref="chartarea" />
    <NoChart v-if="!isChartExist" />
  </div>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator'
import tuiChart from 'tui-chart'
import NoChart from './NoChart.vue'
import { ProductDto } from '@/types'
import { Loading } from '@/components/shared'
@Component({
  components: {
    NoChart,
    Loading
  }
})
export default class ProductBoxPlot extends Vue {
  get showLoadingPage (): boolean {
    return this.$store.state.base.showLoadingPage
  }

  get allProducts (): Array<ProductDto> {
    return this.$store.state.product.allProducts
  }

  isChartExist: boolean = true;
  category: Set<string> = new Set()
  categoryList = []
  basePrices:{[key:string]:Array<number>} = {}
  salePrices:{[key:string]:Array<number>} = {}
  max = 0
  async mounted () {
    try {
      await this.$store.dispatch('product/getAllProducts')
      await this.getData()
      await this.drawChart()
    } catch (error) {
      this.isChartExist = false
    }
  }

  getData () {
    this.allProducts.forEach((product) => {
      const created = product.created_at.substr(0, 7)
      const basePrice = product.base_price
      const salePrice = product.sale_price
      this.category.add(created)
      this.basePrices[created] ? this.basePrices[created].push(basePrice) : this.basePrices[created] = [basePrice]
      this.salePrices[created] ? this.salePrices[created].push(salePrice) : this.salePrices[created] = [salePrice]
      this.max = Math.max(this.max, basePrice)
    })
  }

  drawChart () {
    // 그래프를 그릴 곳
    const container: Element = this.$refs.chartarea as Element
    // 월별로 정렬하기 위해
    const categories = [...this.category].sort((a, b) => a.localeCompare(b))
    // 키 값을 없애고 이중 배열로 만든다.
    const basePriceData: Array<Array<number>> = []
    const salePriceData: Array<Array<number>> = []
    categories.forEach((key) => {
      basePriceData.push(this.basePrices[key])
      salePriceData.push(this.salePrices[key])
    })
    const data = {
      categories,
      series: [{
        name: '판매원가',
        data: basePriceData,
        outliers: [
          [1, this.max]
        ]
      }, {
        name: '판매가',
        data: salePriceData,
        outliers: [
          [1, this.max]
        ]
      }]
    }
    const options = {
      chart: {
        width: window.innerWidth <= 640 ? 640 : 1000,
        height: 540,
        title: '월별 상품 등록 가격',
        format: '1,000'
      },
      yAxis: {
        title: 'Price',
        min: 0,
        max: this.max + 20000
      },
      xAxis: {
        title: 'Month'
      },
      legend: {
        align: 'bottom'
      }
    }
    tuiChart.boxplotChart(container, data, options)
  }
}

</script>

<style lang="scss" scoped>
  .chartWrapper {
    overflow: hidden;
  }
</style>
