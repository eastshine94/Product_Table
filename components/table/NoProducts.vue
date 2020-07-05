<template>
  <tr class="noProducts">
    <td colspan="4">
      해당 조건을 충족하는 상품이 존재하지 않습니다.<br>
      다른 조건으로 검색해보십시오.
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
})
</script>>

<style lang="scss" scoped>
  .noProducts {
    text-align: left;
    padding-left: 10px;
    & td{
      font-weight: bold;
      font-size: 20px;
    }

  }
</style>
