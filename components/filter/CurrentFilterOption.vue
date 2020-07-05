<template>
  <div class="currentFilterOptionWrapper">
    <span v-for="filter in appliedFilters" :key="filter.option.value" class="currentFilterOption">
      <b>{{ filter.option.name }}: </b>
      {{ filter.minValue }} ~ {{ filter.maxValue }}
      {{ filter.option.value === "created_at"? "까지":"원" }}
      <span class="material-icons cancelIcon" @click="onClickRemoveButton(filter.option.value)">clear</span>
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { FilterDto } from '@/types'

@Component
export default class CurrentFilterOption extends Vue {
  get appliedFilters (): FilterDto {
    return this.$store.state.product.appliedFilters
  }

  // appliedFilters에서 해당 key를 가진 것을 제거한다
  onClickRemoveButton (target: string) {
    const router = this.$router
    const query = this.$route.query
    const newQuery:{[key:string]: string|(string|null)[]} = { ...query }
    delete newQuery[target]
    this.$store.dispatch('product/onClickRemoveFilterBtn', target)
    this.$store.commit('pagination/SET_CURRENT_PAGE', 1)
    newQuery.page = '1'
    router.replace({ query: newQuery })
  }
}
</script>

<style lang="scss" scoped>
.currentFilterOptionWrapper{
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 85%;
  margin: 0 auto;
}

.currentFilterOption{
  position: relative;
  margin: 15px 10px 5px 0;
  background-color: #516a72;
  color: #fff;
  padding: 5px 30px 5px 5px;
  border-radius: 5px;
}
.cancelIcon {
  position: absolute;
  top: 8px;
  right: 5px;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
}
</style>
