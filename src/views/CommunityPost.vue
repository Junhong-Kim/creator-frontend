<template>
  <v-container v-if="post">
    <v-layout column>
      <v-breadcrumbs :items="currentPath" class="pl-0">
        <template v-slot:divider>
          <v-icon>chevron_right</v-icon>
        </template>
      </v-breadcrumbs>
      <v-layout column white pa-5 class="elevation-3">
        <v-layout
          row
          class="text-xs-left"
        >
          <v-container fill-height pl-3 pr-3 pt-2 pb-2 ma-0>
            <v-layout column>
              <span class="grey--text mb-1" style="font-size: 10px;" v-text="setDateFormat(post.createdAt)"></span>
              <span class="title">{{ post.title}} </span>
            </v-layout>
            <v-spacer></v-spacer>
            <v-avatar
              size="25"
              color="grey lighten-4"
              class="ma-2"
            >
              <img :src="post.user.picture" alt="picture">
            </v-avatar>
            <span class="subheading">{{ post.user.displayName}} </span>
          </v-container>
        </v-layout>
        <v-divider class="ma-1"></v-divider>
        <quill-editor
          v-model="post.contents"
          :options="editorOption"
          :disabled="true"
        ></quill-editor>
      </v-layout>
        <v-layout align-center justify-center row fill-height>
          <v-btn icon>
            <v-icon small>thumb_up</v-icon>
          </v-btn>
          <span class="text-xs-center caption">{{ post.likeCount }}</span>
          <v-btn icon>
            <v-icon small>thumb_down</v-icon>
          </v-btn>
          <span class="text-xs-center caption">{{ post.dislikeCount }}</span>
        </v-layout>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import API from '@/service/api';
import { IPost } from '@/interfaces';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
import moment from 'moment';

@Component({
  components: {
    quillEditor,
  },
})
export default class CommunityPost extends Vue {
  currentPath: object[] = [
    { text: '커뮤니티', disabled: true },
    { text: '자유게시판', disabled: true },
  ];
  post: IPost | null = null;
  postId: number | null = null;
  editorOption: object = {
    modules: {
      toolbar: false,
    },
    theme: 'bubble',
  };

  created() {
    const postId = this.$route.params.postId;
    this.getPostDetail(postId);
  }

  getPostDetail(postId: string) {
    axios.get(API.POST_DETAIL(postId))
      .then((res) => {
        const data = res.data.data;
        this.post = data;
      });
  }

  setDateFormat(date: string) {
    return moment(date).format('YY-MM-DD HH:mm');
  }
}
</script>
