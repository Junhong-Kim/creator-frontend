<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td class="text-xs-center">{{ props.item.id }}</td>
      <td class="text-xs-left">{{ props.item.title }}</td>
      <td class="text-xs-center">{{ props.item.createdBy }}</td>
      <td class="text-xs-center">{{ props.item.createdAt }}</td>
      <td class="text-xs-center">{{ props.item.like }}</td>
    </template>
  </v-data-table>
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
