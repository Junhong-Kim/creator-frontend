<template>
  <v-card class="ma-2">
    <v-layout row>
      <v-avatar
        size="100"
        color="grey lighten-4"
        class="ma-3"
      >
        <img :src="channel.thumbnail" alt="channel">
      </v-avatar>
      <v-container fill-height="">
        <v-layout
          column
          text-xs-left
          ma-2
        >
          <span class="headline">{{ channel.title }}</span>
          <span class="subheading">{{ channel.description }}</span>
        </v-layout>
        <v-btn
          v-if="true"
          depressed
          color="primary"
        >
          랭킹등록
        </v-btn>
        <v-btn
          v-else
          depressed
          disabled
        >
          1위
        </v-btn>
      </v-container>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IChannelThumbnail } from '@/interfaces';

@Component
export default class CreatorChannelThumbnail extends Vue {
  @Prop(Object) readonly channel!: IChannelThumbnail;
}
</script>
