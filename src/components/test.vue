<template>
  <div>
    <div v-for="(diff, index) in compareTexts(oldText, newText)" :key="index" :style="{ textDecoration: diff[0] === -1 ? 'line-through' : 'underline', color: diff[0] === 1 ? 'blue' : 'inherit' }">
      {{ diff[1] }}
    </div>
  </div>
</template>

<script>
import { diff_match_patch } from 'diff-match-patch';

export default {
  data() {
    return {
      oldText: '哈哈哈哈这样不行',
      newText: '哈哈这样123123行,哈哈'
    };
  },
  methods: {
    compareTexts(oldText, newText) {
      const dmp = new diff_match_patch();
      const diffs = dmp.diff_main(oldText, newText);
      dmp.diff_cleanupSemantic(diffs);
      return diffs;
    }
  }
}
</script>
