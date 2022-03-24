import { defineConfig } from 'umi';

export default defineConfig({
  layout: {},
  mfsu: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/', component: '@/pages/layout/index',
      routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/about', component: '@/pages/more/about' },
        {
          path: '/product/:id', component: '@/pages/product/layout',
          routes: [
            { path: '/product/:id', component: '@/pages/product/[id]' }
          ]
        },
        {
          component: '@/pages/_404'
        }
      ],
    },
  ],
  fastRefresh: {},
});
