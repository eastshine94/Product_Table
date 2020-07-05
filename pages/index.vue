<template>
  <main>
    <div class="container">
      <ProductFilter />
      <ProductOption />
      <Loading v-show="showLoadingPage && !showChart" />
      <ProductBoxPlot v-if="showChart" />
      <ProductTable v-show="!showLoadingPage && !showChart" />
      <Pagination v-show="!showLoadingPage && !showChart" />
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import '@/styles/baseSetting.scss'
import { ProductFilter, ProductTable, ProductOption } from '@/components'
import { Pagination, Loading } from '@/components/shared'
import ProductBoxPlot from '@/components/chart/ProductBoxPlot.vue'
@Component({
  components: {
    ProductFilter,
    ProductTable,
    ProductOption,
    Pagination,
    Loading,
    ProductBoxPlot
  }
})
export default class Home extends Vue {
  get showLoadingPage (): boolean {
    return this.$store.state.base.showLoadingPage
  }

  get showChart (): boolean {
    return this.$store.state.base.showChart
  }
}
</script>

<style lang="scss">
.container {
  width: 1000px;
  margin: 20px auto;
  position: relative;
  @media only screen and (max-width: "1000px"){
    width: 98%;
  }
}
</style>
