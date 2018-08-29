import Vue from 'vue'
import Router from 'vue-router'
const Recommend = r => require.ensure([], () => r(require('components/recommend/recommend')))
const Singer = r => require.ensure([], () => r(require('components/singer/singer')))
const Rank = r => require.ensure([], () => r(require('components/rank/rank')))
const Search = r => require.ensure([], () => r(require('components/search/search')))
const SingerDetail = r => require.ensure([], () => r(require('components/singer-detail/singer-detail')))

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer,
      children: [
        {
          path: '/SingerDetail/:id',
          name: 'SingerDetail',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    }
  ]
})
