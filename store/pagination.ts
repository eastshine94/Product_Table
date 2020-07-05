import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

// 페이지 리스트를 만든다.
const makePages = (length: number, startAt: number) => {
  return [...Array(length).keys()].map(val => val + startAt)
}

@Module({ namespaced: true })
export default class Pagination extends VuexModule {
    // 현재 페이지
    currentPage = 1
    // 마지막 페이지
    lastPage: number = 1;
    // 몇 개의 페이지를 표시 할 것인가
    pagesNum: number = 5;
    // 현재 표시된 페이지들
    pages: Array<number> = [];

    @Mutation
    SET_PAGES (pages: Array<number>) {
      this.pages = pages
    }

    @Mutation
    SET_CURRENT_PAGE (page: number) {
      this.currentPage = page
    }

    @Mutation
    SET_LAST_PAGE (num: number) {
      this.lastPage = num
    }

    // 렌더링 시 페이지 리스트를 설정
    @Action
    initPages () {
      const firstPage = Math.floor((this.currentPage - 1) / this.pagesNum) * this.pagesNum + 1
      const pages = makePages(this.pagesNum, firstPage).filter(page => page <= this.lastPage)
      this.context.commit('SET_PAGES', pages)
    }

    // 첫 페이지로 이동
    @Action
    onFirstPage () {
      if (this.pages.length > 0) {
        if (this.currentPage !== 1) {
          if (this.pages[0] > 1) {
            const firstPages = makePages(this.pagesNum, 1).filter(page => page <= this.lastPage)
            this.context.commit('SET_PAGES', firstPages)
          }
          this.context.commit('SET_CURRENT_PAGE', 1)
        }
      }
    }

    // 이전 페이지로 이동
    @Action
    onPrevPage () {
      if (this.pages.length > 0) {
        const prevFirstPage = this.pages[0] - this.pagesNum
        if (prevFirstPage > 0) {
          const prevPages = makePages(this.pagesNum, prevFirstPage).filter(page => page <= this.lastPage)
          this.context.commit('SET_PAGES', prevPages)
          this.context.commit('SET_CURRENT_PAGE', prevFirstPage + this.pagesNum - 1)
        }
      }
    }

    // 다음 페이지로 이동
    @Action
    onNextPage () {
      if (this.pages.length > 0) {
        const nextFirstPage = this.pages[0] + this.pagesNum
        if (nextFirstPage <= this.lastPage) {
          const nextPages = this.pages.filter(page => page + this.pagesNum <= this.lastPage)
            .map(page => page + this.pagesNum)
          this.context.commit('SET_PAGES', nextPages)
          this.context.commit('SET_CURRENT_PAGE', nextFirstPage)
        }
      }
    }

    // 마지막 페이지로 이동
    @Action
    onLastPage () {
      if (this.pages.length > 0) {
        if (this.currentPage !== this.lastPage) {
          const firstInLastPage = Math.floor((this.lastPage - 1) / this.pagesNum) * this.pagesNum + 1

          if (firstInLastPage > this.currentPage) {
            const lastPages = makePages(this.pagesNum, firstInLastPage).filter(page => page <= this.lastPage)
            this.context.commit('SET_PAGES', lastPages)
          }
          this.context.commit('SET_CURRENT_PAGE', this.lastPage)
        }
      }
    }
}
