<template>
  <v-layout column class="elevation-2">
    <v-flex grey lighten-3 pa-2>
      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                :class="{ 'is-active': isActive.bold() }"
                @click="commands.bold"
                v-on="on"
              >
                <v-icon color="black">format_bold</v-icon>
              </v-btn>
            </template>
            <span>Bold</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                :class="{ 'is-active': isActive.italic() }"
                @click="commands.italic"
                v-on="on"
              >
                <v-icon color="black">format_italic</v-icon>
              </v-btn>
            </template>
            <span>Italic</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                :class="{ 'is-active': isActive.strike() }"
                @click="commands.strike"
                v-on="on"
              >
                <v-icon color="black">format_strikethrough</v-icon>
              </v-btn>
            </template>
            <span>Strike</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                :class="{ 'is-active': isActive.underline() }"
                @click="commands.underline"
                v-on="on"
              >
                <v-icon color="black">format_underline</v-icon>
              </v-btn>
            </template>
            <span>Underline</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                :class="{ 'is-active': isActive.code() }"
                @click="commands.code"
                v-on="on"
              >
                <v-icon color="black">code</v-icon>
              </v-btn>
            </template>
            <span>Code</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                :class="{ 'is-active': isActive.paragraph() }"
                @click="commands.paragraph"
                v-on="on"
              >
                <span class="title">P</span>
              </v-btn>
            </template>
            <span>Paragraph</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                @click="commands.heading({ level: 1 })"
                v-on="on"
              >
                <span class="title">H1</span>
              </v-btn>
            </template>
            <span>Header-1</span>
          </v-tooltip>


          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                @click="commands.heading({ level: 2 })"
                v-on="on"
              >
                <span class="title">H2</span>
              </v-btn>
            </template>
            <span>Header-2</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                @click="commands.heading({ level: 3 })"
                v-on="on"
              >
                <span class="title">H3</span>
              </v-btn>
            </template>
            <span>Header-3</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                :class="{ 'is-active': isActive.bullet_list() }"
                @click="commands.bullet_list"
                v-on="on"
              >
                <v-icon color="black">format_list_bulleted</v-icon>
              </v-btn>
            </template>
            <span>Bulleted list</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                :class="{ 'is-active': isActive.ordered_list() }"
                @click="commands.ordered_list"
                v-on="on"
              >
                <v-icon color="black">format_list_numbered</v-icon>
              </v-btn>
            </template>
            <span>Ordered list</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                :class="{ 'is-active': isActive.blockquote() }"
                @click="commands.blockquote"
                v-on="on"
              >
                <v-icon color="black">format_quote</v-icon>
              </v-btn>
            </template>
            <span>Block quote</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                :class="{ 'is-active': isActive.code_block() }"
                @click="commands.code_block"
                v-on="on"
              >
                <v-icon color="black">code</v-icon>
              </v-btn>
            </template>
            <span>Code block</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                @click="commands.horizontal_rule"
                v-on="on"
              >
                <v-icon color="black">remove</v-icon>
              </v-btn>
            </template>
            <span>Horizontal line</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                @click="commands.undo"
                v-on="on"
              >
                <v-icon color="black">undo</v-icon>
              </v-btn>
            </template>
            <span>Undo</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                @click="commands.redo"
                v-on="on"
              >
                <v-icon color="black">redo</v-icon>
              </v-btn>
            </template>
            <span>Redo</span>
          </v-tooltip>
        </div>
      </editor-menu-bar>
    </v-flex>
    <v-flex text-xs-left pt-4 pb-3 pl-4 pr-4>
      <editor-content
        :editor="editor"
      ></editor-content>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions';

@Component({
  components: {
    EditorMenuBar,
    EditorContent,
  },
})
export default class TextEditor extends Vue {
  editor: Editor = new Editor({
    extensions: [
      new Blockquote(),
      new CodeBlock(),
      new HardBreak(),
      new Heading({ levels: [1, 2, 3] }),
      new HorizontalRule(),
      new BulletList(),
      new OrderedList(),
      new ListItem(),
      new TodoItem(),
      new TodoList(),
      new Bold(),
      new Code(),
      new Italic(),
      new Link(),
      new Strike(),
      new Underline(),
      new History(),
    ],
    content: '테스트',
  });

  beforeDestroy() {
    this.editor.destroy();
  }
}
</script>

<style>
*:focus {outline:none}
</style>
