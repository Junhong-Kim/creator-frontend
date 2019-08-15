<template>
  <div class="elevation-1">
    <v-toolbar flat color="white">
      <v-toolbar-title>자유게시판</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn dark small depressed color="primary">글쓰기</v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="items"
    >
      <template v-slot:items="props">
        <tr @click="$router.push({ name: 'communityPost', params: { postId: props.item.id }})">
          <td class="text-xs-center">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.title }}</td>
          <td class="text-xs-center">{{ props.item.createdBy }}</td>
          <td class="text-xs-center">{{ props.item.createdAt }}</td>
          <td class="text-xs-center">{{ props.item.like }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class CommunityBoard extends Vue {
  headers: object[] = [
    { text: '번호', align: 'center', sortable: false, value: 'id' },
    { text: '제목', align: 'center', sortable: false, value: 'title' },
    { text: '작성자', align: 'center', sortable: false, value: 'createdBy' },
    { text: '작성일시', align: 'center', sortable: false, value: 'createdAt' },
    { text: '추천', align: 'center', sortable: false, value: 'like' },
  ];

  items: object[] = [
    {
      id: 0,
      title: 'test title',
      createdBy: 'test user',
      createdAt: '0000-00-00 00:00',
      like: 0,
    },
  ];
}
</script>
