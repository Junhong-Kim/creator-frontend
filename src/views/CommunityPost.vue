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
              <v-icon
                small
                :color="likeIconColor"
                @click="postLike(post)"
                style="cursor: pointer;"
              >
                thumb_up
              </v-icon>
              <span class="text-xs-center caption mt-1">{{ post.likeCount }}</span>
            </v-layout>
          </v-flex>
          <v-flex pa-1>
            <v-layout column align-center>
              <v-icon small color="grey">comment</v-icon>
              <span class="text-xs-center caption mt-1">0</span>
            </v-layout>
          </v-flex>
          <v-flex pa-1>
            <v-layout column align-center>
              <v-icon small color="grey">visibility</v-icon>
              <span class="text-xs-center caption mt-1">0</span>
            </v-layout>
          </v-flex>
        </v-layout>
        <!-- comments -->
        <div>
          <v-layout
            v-for="(comment, index) in comments"
            row
            class="pa-2"
            :key="index"
          >
            <v-avatar
              size="25"
              class="mr-2"
            >
              <img :src="comment.user.picture" alt="picture">
            </v-avatar>
            <v-layout column>
              <v-layout column text-xs-left grey lighten-4 pa-1 style="border-radius: 5px;">
                <span class="font-weight-bold caption">{{ comment.user.displayName }}</span>
                <span class="caption" style="word-break: break-word;">{{ comment.contents }}</span>
              </v-layout>
              <span v-text="setDateFormat(comment.createdAt)" class="text-xs-right" style="font-size: 5px;"></span>
            </v-layout>
          </v-layout>
          <v-text-field
            v-model="newComment"
            label="새로운 댓글"
            hint="Enter Key로 새로운 댓글을 등록합니다."
            box
            append-icon="send"
            @keyup.enter="createComment"
            class="mt-3 body-1"
          ></v-text-field>
        </div>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from 'axios';
import API from '@/service/api';
import { IPost, IComment } from '@/interfaces';
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
  postId: string = '';
  likeIconColor: string = 'grey';
  editorOption: object = {
    modules: {
      toolbar: false,
    },
    theme: 'bubble',
  };
  comments: IComment[] = [];
  newComment: string = '';

  created() {
    this.postId = this.$route.params.postId;
    this.getPostDetail();
    this.getPostLike();
    this.getComments();
  }

  getPostDetail() {
    axios.get(API.POST_DETAIL(this.postId as string))
      .then((res) => {
        const data = res.data.data;
        this.post = data;
      });
  }

  getPostLike() {
    axios.get(API.POST_LIKE(this.postId as string))
      .then((res) => {
        const data = res.data.data;
        const isLike = data.some((item: { userId: number }) => {
          return item.userId === this.$store.getters.user.id;
        });
        this.likeIconColor = isLike ? 'primary' : 'grey';
      });
  }
  postLike(post: IPost) {
    axios.put(API.POST_LIKE(this.postId as string), {
      userId: this.$store.getters.user.id,
    }).then((res) => {
      const data = res.data.data;
      post.likeCount += data.isValid ? 1 : -1;
      this.likeIconColor = data.isValid ? 'primary' : 'grey';
    });
  }

  setDateFormat(date: string) {
    return moment(date).format('YYYY-MM-DD HH:mm');
  }

  getComments() {
    axios.get(API.POST_COMMENT_LIST(this.postId))
      .then((res) => {
        this.comments = res.data.data;
      });
  }

  createComment() {
    if (this.newComment === '') {
      alert('내용을 입력해주세요.');
    } else {
      axios.post(API.POST_COMMENT_LIST(this.postId), {
        contents: this.newComment,
        userId: this.$store.getters.user.id,
        postId: this.postId,
      }).then(() => {
        this.newComment = '';
        alert('댓글이 등록되었습니다');
      });
    }
  }
}
</script>
