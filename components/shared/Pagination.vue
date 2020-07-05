<template>
  <section class="paginationWrapper">
    <div class="paginationItem" @click="onFirstPage">
      &laquo;
    </div>
    <div class="paginationItem" @click="onPrevPage">
      &lt;
    </div>
    <div
      v-for="page in pages"
      :key="page"
      :class="{paginationItem: true,
               active : (currentPage === page)}"
      @click="onPage(page)"
    >
      {{ page }}
    </div>
    <div class="paginationItem" @click="onNextPage">
      &gt;
    </div>
    <div class="paginationItem" @click="onLastPage">
      &raquo;
    </div>
  </section>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {
  get pages (): Array<number> {
    return this.$store.state.pagination.pages
  }

  get currentPage (): number {
    return this.$store.state.pagination.currentPage
  }

  changeQuery () {
    const router = this.$router
    const query = this.$route.query
    router.replace({ query: { ...query, page: this.currentPage.toString() } })
  }

  async onFirstPage () {
    await this.$store.dispatch('pagination/onFirstPage')
    await this.changeQuery()
  }

  async onPrevPage () {
    await this.$store.dispatch('pagination/onPrevPage')
    await this.changeQuery()
  }

  async onPage (page: number) {
    await this.$store.commit('pagination/SET_CURRENT_PAGE', page)
    await this.changeQuery()
  }

  async onNextPage () {
    await this.$store.dispatch('pagination/onNextPage')
    await this.changeQuery()
  }

  async onLastPage () {
    await this.$store.dispatch('pagination/onLastPage')
    await this.changeQuery()
  }
}
</script>
<style lang="scss" scoped>
  .paginationWrapper {
      display: flex;
      justify-content: center;
      margin: 20px 0 20px 0;
  }

  .paginationItem {
      color: black;
      padding: 8px 16px 8px 16px;
      border: 1px solid #ddd;
      font-size: 0.9rem;
      cursor: pointer;
  }
  .active {
      background-color: #323e7c;
      color: white;
      border: 1px solid #4a57a8;
      pointer-events: none;
  }
</style>
