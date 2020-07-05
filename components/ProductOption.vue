<template>
  <section class="productOptionWrapper">
    <LeftOption />
    <RightOption />
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { RightOption, LeftOption } from '@/components/option'
@Component({
  components: {
    LeftOption,
    RightOption
  }
})
export default class ProductOption extends Vue {

}
</script>

<style lang="scss" scoped>
.productOptionWrapper{
  display: flex;
  justify-content: space-between;
}

</style>
