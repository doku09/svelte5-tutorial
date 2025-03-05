<script lang="ts">
  let {value=$bindable()}=$props();
</script>

<p>Value in Child: {value}</p>
<input bind:value>