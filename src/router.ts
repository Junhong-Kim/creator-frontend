import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/channel/search',
          name: 'channelSearch',
          component: () => import('./views/ChannelSearch.vue'),
        },
        {
          path: '/creator/ranking',
          name: 'creatorRanking',
          component: () => import('./views/CreatorRanking.vue'),
        },
        {
          path: '/editor/recruit',
          name: 'editorRecruit',
          component: () => import('./views/EditorRecruit.vue'),
        },
        {
          path: '/community/board',
          name: 'communityBoard',
          component: () => import('./views/CommunityBoard.vue'),
        },
        {
          path: '/community/posts/:postId',
          name: 'communityPost',
          component: () => import('./views/CommunityPost.vue'),
        },
        {
          path: '/new',
          name: 'textEditor',
          component: () => import('./views/QuillTextEditor.vue'),
        },
      ],
    },
  ],
});
