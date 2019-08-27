<template>
  <v-container v-if="post">
    <v-layout column>
      <v-breadcrumbs :items="currentPath" class="pl-0">
        <template v-slot:divider>
          <v-icon>chevron_right</v-icon>
        </template>
      </v-breadcrumbs>
      <v-layout column white pa-4 class="elevation-3">
        <!-- post title -->
        <v-layout
          row
          class="text-xs-left"
        >
          <v-container fill-height pl-3 pr-3 pt-2 pb-2 ma-0>
            <v-layout column>
              <span class="grey--text mb-1" style="font-size: 10px;" v-text="setDateFormat(post.createdAt)"></span>
              <span class="title">{{ post.title }}</span>
            </v-layout>
            <v-spacer></v-spacer>
            <v-avatar
              size="25"
              color="grey lighten-4"
              class="ma-2"
            >
              <img :src="post.user.picture" alt="picture">
            </v-avatar>
            <span class="subheading">{{ post.user.displayName }}</span>
          </v-container>
        </v-layout>
        <!-- post contents -->
        <quill-editor
          v-model="post.contents"
          :options="editorOption"
          :disabled="true"
          style="padding: 2px;"
        ></quill-editor>
        <v-divider class="ma-1"></v-divider>
        <!-- post info -->
        <v-layout row mt-2>
          <v-flex pa-1>
            <v-layout column align-center>
              <v-icon small color="black">thumb_up</v-icon>
              <span class="text-xs-center caption mt-1">{{ post.likeCount }}</span>
            </v-layout>
          </v-flex>
          <v-flex pa-1>
            <v-layout column align-center>
              <v-icon small color="black">comment</v-icon>
              <span class="text-xs-center caption mt-1">{{ post.likeCount }}</span>
            </v-layout>
          </v-flex>
          <v-flex pa-1>
            <v-layout column align-center>
              <v-icon small color="black">visibility</v-icon>
              <span class="text-xs-center caption mt-1">{{ post.likeCount }}</span>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- comments -->
        <div>
          <v-layout row class="pa-2">
            <v-avatar
              size="25"
              class="mr-2"
            >
              <img :src="post.user.picture" alt="picture">
            </v-avatar>
            <v-layout column>
              <v-layout column text-xs-left grey lighten-4 pa-1 style="border-radius: 5px;">
                <span class="font-weight-bold caption">{{ post.user.displayName}}</span>
                <span class="caption" style="word-break: break-word;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
              </v-layout>
              <span v-text="setDateFormat(post.createdAt)" class="text-xs-right" style="font-size: 5px;"></span>
            </v-layout>
          </v-layout>
        </div>
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
    return moment(date).format('YYYY-MM-DD HH:mm');
  }
}
</script>
