<template>
  <thead>
    <tr>
      <th
        v-for="header in headerData"
        :key="header.value"
        :class="header.className"
        @click.prevent="onClickHeader(header.value)"
      >
        {{ header.name }}
        <i v-show="showIcon(header.value, 'asc')" class="material-icons sortIcon">
          expand_less
        </i>
        <span v-show="showIcon(header.value, 'desc')" class="material-icons sortIcon">
          expand_more
        </span>
      </th>
    </tr>
  </thead>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { OrderCol, OrderDirection } from '@/types'

interface HeaderDto {
  name: string,
  value: OrderCol,
  className: string,
}
@Component
export default class ProductTableHeader extends Vue {
  headerData:Array<HeaderDto> = [
    { name: '상품명', value: 'name', className: 'productNameCol' },
    { name: '판매가', value: 'sale_price', className: 'productSalePriceCol' },
    { name: '판매원가', value: 'base_price', className: 'productBasePriceCol' },
    { name: '등록일', value: 'created_at', className: 'productCreatedAtCol' }
  ]

  get orderCol (): OrderCol {
    return this.$store.state.product.orderCol
  }

  set orderCol (col: OrderCol) {
    this.$store.commit('product/SET_ORDER_COL', col)
  }

  get orderDirection (): OrderDirection {
    return this.$store.state.product.orderDirection
  }

  set orderDirection (direction: OrderDirection) {
    this.$store.commit('product/SET_ORDER_DIRECTION', direction)
  }

  // 이미 선택된 col이면 차순을 바꾸고, 아니면 클릭한 col의 내림차순으로 정렬
  onClickHeader (col: OrderCol) {
    const orderCol = this.orderCol
    const orderDirection = this.orderDirection
    if (orderCol !== col) {
      this.orderCol = col
      this.orderDirection = 'desc'
    } else {
      this.orderDirection = orderDirection === 'desc' ? 'asc' : 'desc'
    }
    this.changeQuery()
  }

  showIcon (col:OrderCol, direction: OrderDirection) {
    return col === this.orderCol && direction === this.orderDirection
  }

  changeQuery () {
    const router = this.$router
    const query = this.$route.query
    router.replace({ query: { ...query, orderCol: this.orderCol, orderDirection: this.orderDirection } })
  }
}
</script>

<style lang="scss" scoped>
th {
  position: relative;
  cursor: pointer;
  font-size: 15px;
  background-color: #d6d2ff;
  &:active {
    border: 2px solid #000;
  }
}
.productNameCol{
  width: 40%;
}
.productSalePriceCol{
  width: 20%;
}
.productBasePriceCol{
  width: 20%;
}
.productCreatedAtCol{
  width: 20%;
}
.sortIcon {
  position: absolute;
  right: 5px;
  top: 7px;
}
</style>
