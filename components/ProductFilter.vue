<template>
  <section class="filterWrapper">
    <i class="material-icons filterIcon">filter_list</i>
    <FilterOption />
    <CurrentFilterOption />
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import FilterOption from './filter/FilterOpiton.vue'
import CurrentFilterOption from './filter/CurrentFilterOption.vue'

@Component({
  components: {
    FilterOption,
    CurrentFilterOption
  }
})
export default class ProductFilter extends Vue {

}
</script>

<style lang="scss" scoped>
  .filterWrapper{
    background-color: #ebebeb;
    padding: 10px;
    position: relative;
  }

  .filterIcon {
    position: absolute;
    top: 23px;
    left: 18px;
  }

  @media only screen and (max-width: "640px"){
    .filterWrapper{
      padding: 0;
    }
    .filterIcon {
      display: none;
    }
  }
</style>
