<template>
  <tbody>
    <tr v-for="product in products" :key="product.id">
      <td :title="product.name">
        {{ product.name }}
      </td>
      <td :title="product.sale_price">
        {{ priceFormatting(product.sale_price) }}
      </td>
      <td :title="product.base_price">
        {{ priceFormatting(product.base_price) }}
      </td>
      <td :title="product.created_at">
        {{ dateFormatting(product.created_at) }}
      </td>
    </tr>
    <NoProducts v-if="products.length === 0" />
  </tbody>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import NoProducts from './NoProducts.vue'
import { ProductDto } from '@/types'
@Component({
  components: {
    NoProducts
  }
})
export default class ProductTableBody extends Vue {
  @Prop({ type: Array, required: true }) products!:Array<ProductDto>
  priceFormatting (price: number): string {
    return price.toLocaleString()
  }

  dateFormatting (date: string): string {
    return date.substr(0, 10)
  }
}
</script>

<style lang="scss" scoped>
tr {
  &:nth-child(2n){
    background-color: #f0f3fa;
  }
}
</style>
