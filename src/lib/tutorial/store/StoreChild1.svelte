<script lang="ts">
  import { userState } from "./state.svelte";


  let config = userState;
</script>
<h2>StoreChild1</h2>
<p>User name: {config.name}</p>
<p>User age: {config.age}</p>
<button onclick={() => {
	config.name = 'child 1';
}}>
	change name
</button>