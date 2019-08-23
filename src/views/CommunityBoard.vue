<template>
  <div class="elevation-1">
    <v-toolbar flat color="white">
      <v-toolbar-title>자유게시판</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn dark small depressed color="primary" @click="$router.push({ name: 'textEditor' })">글쓰기</v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :total-items="total"
      :items="posts"
      @update:pagination="setDataTable"
    >
      <template v-slot:items="props">
        <tr @click="$router.push({ name: 'communityPost', params: { postId: props.item.id }})">
          <td class="text-xs-center">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.title }}</td>
          <td class="text-xs-center">{{ props.item.user.displayName }}</td>
          <td class="text-xs-center">{{ setDateFormat(props.item.createdAt) }}</td>
          <td class="text-xs-center">{{ props.item.likeCount }} / {{ props.item.dislikeCount }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import API from '@/service/api';
import { getCookie } from '@/util';
import { IPost } from '@/interfaces';
import moment from 'moment';

@Component
export default class CommunityBoard extends Vue {
  headers: object[] = [
    { text: '번호', align: 'center', sortable: false, value: 'id' },
    { text: '제목', align: 'center', sortable: false, value: 'title' },
    { text: '작성자', align: 'center', sortable: false, value: 'createdBy' },
    { text: '작성일시', align: 'center', sortable: false, value: 'createdAt' },
    { text: '추천', align: 'center', sortable: false, value: 'like' },
  ];

  total: number = 0;
  posts: IPost[] = [];

  async setDataTable(data: {
    descending: boolean,
    page: number,
    rowsPerPage: number,
    sortBy: null,
    totalItems: number,
  }) {
    const offset = data.page * data.rowsPerPage - data.rowsPerPage;
    const limit = data.rowsPerPage;
    await this.getPostList(offset, limit);
  }

  async getPostList(offset: number, limit: number) {
    axios.get(API.POST_LIST, {
      headers: {
        'x-access-token': getCookie('x-access-token'),
      },
      params: {
        offset,
        limit,
      },
    }).then((res) => {
      const data = res.data;
      this.total = data.total;
      this.posts = data.data;
    });
  }

  setDateFormat(date: string) {
    return moment(date).format('YY-MM-DD HH:mm');
  }
}
</script>
