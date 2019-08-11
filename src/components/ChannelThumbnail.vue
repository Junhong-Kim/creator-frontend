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
          v-if="isRegist"
          depressed
          disabled
        >
          등록됨
        </v-btn>
        <v-btn
          v-else
          depressed
          color="primary"
          @click="registChannel(channel.id)"
        >
          등록
        </v-btn>
      </v-container>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IChannelThumbnail } from '@/interfaces';
import axios from 'axios';
import API from '@/service/api';

@Component
export default class CreatorChannelThumbnail extends Vue {
  isRegist: boolean = false;

  @Prop(Object) readonly channel!: IChannelThumbnail;

  registChannel(channelId: string) {
    axios.post(API.YOUTUBE_CHANNELS, {
      channelId,
    }).then(() => {
      this.isRegist = true;
    }).catch(() => {
      alert('등록된 채널입니다.');
    });
  }
}
</script>
