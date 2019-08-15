<template>
  <div>{{ $route.params.postId }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

export default class CommunityPost extends Vue {}
</script>
