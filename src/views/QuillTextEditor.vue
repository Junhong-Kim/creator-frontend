<template>
  <v-container>
    <v-flex xl10 offset-xl-1>
      <v-layout column>
        <v-breadcrumbs :items="currentPath" class="pl-0">
          <template v-slot:divider>
            <v-icon>chevron_right</v-icon>
          </template>
        </v-breadcrumbs>
        <v-text-field
          v-model="title"
          solo
          hide-details
          placeholder="Title"
          color="black"
          style="border: 1px solid #e0e0e0;"
          class="mb-3"
        >
        </v-text-field>
        <quill-editor
          v-model="contents"
          :options="editorOption"
          class="white elevation-2"
        ></quill-editor>
        <v-layout row mt-3>
          <v-flex>
            <v-btn small round color="primary" @click="createPost">등록</v-btn>
            <v-btn small round color="grey lighten-5" @click="$router.go(-1)">취소</v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-flex>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AxiosServie from '@/service/axios';
import API from '@/service/api';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';

@Component({
  components: {
    quillEditor,
  },
})
export default class QuillTextEditor extends Vue {
  currentPath: object[] = [
    { text: '커뮤니티', disabled: true },
    { text: '자유게시판', disabled: true },
    { text: '글쓰기', disabled: true },
  ];
  title: string = '';
  contents: string = '';
  editorOption: object = {
    placeholder: 'Contents..',
  };

  createPost() {
    AxiosServie.instance.post(API.POST_LIST, {
      title: this.title,
      contents: this.contents,
      userId: this.$store.getters.user.id,
    }).then(() => {
      alert('새 글이 등록되었습니다.');
    }).finally(() => {
      this.$router.go(-1);
    });
  }
}
</script>

<style>
.ql-editor {
  height: 300px;
}
</style>
