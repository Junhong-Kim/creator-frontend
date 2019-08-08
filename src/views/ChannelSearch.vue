<template>
  <v-layout v-if="channels" column>
    <v-flex text-xs-left ml-2 mr-2>
      <span class="body-1 grey--text font-weight-bold">YouTube 채널</span>
    </v-flex>
    <v-flex v-for="channel in channels" :key="channel.id">
      <ChannelThumbnail :channel="channel"></ChannelThumbnail>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Watch} from 'vue-property-decorator';
import ChannelThumbnail from '@/components/ChannelThumbnail.vue';
import axios from 'axios';
import API from '@/service/api';
import { IUser } from '@/interfaces';

@Component({
  components: {
    ChannelThumbnail,
  },
})
export default class ChannelSearch extends Vue {
  channels: IUser[] | null = null;

  created() {
    this.searchChannels(this.$route.query.keyword as string);
  }

  @Watch('$route.query.keyword')
  onKeywordChanged(newValue: string) {
    this.searchChannels(newValue);
  }

  searchChannels(keyword: string) {
    this.$Progress.start();
    axios.get(API.YOUTUBE_CHANNELS, {
      params: { keyword },
    }).then((res) => {
      const data = res.data.data;
      this.channels = data;
      this.$Progress.finish();
    }).catch(() => {
      this.$Progress.fail();
    });
  }
}
</script>
