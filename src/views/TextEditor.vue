<template>
  <div>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div>
        <button
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          bold&nbsp;
        </button>

        <button
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          italic&nbsp;
        </button>

        <button 
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          strike&nbsp;
        </button>

        <button
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          underline&nbsp;
        </button>

        <button
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          code&nbsp;
        </button>

        <button
          :class="{ 'is-active': isActive.paragraph() }"
          @click="commands.paragraph"
        >
          paragraph&nbsp;
        </button>

        <button
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          H1&nbsp;
        </button>

        <button
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2&nbsp;
        </button>

        <button
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3&nbsp;
        </button>

        <button
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          bullet_list&nbsp;
        </button>

        <button
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          ordered_list&nbsp;
        </button>

        <button
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          blockquote&nbsp;
        </button>

        <button
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          code_block&nbsp;
        </button>

        <button
          @click="commands.horizontal_rule"
        >
          horizontal_rule&nbsp;
        </button>

        <button
          @click="commands.undo"
        >
          undo&nbsp;
        </button>

        <button
          @click="commands.redo"
        >
          redo&nbsp;
        </button>
      </div>
    </editor-menu-bar>
    <editor-content
      :editor="editor"
      class="text-xs-left"
    ></editor-content>
  </div>
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
