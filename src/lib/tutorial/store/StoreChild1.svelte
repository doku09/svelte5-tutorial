<script lang="ts">
  import { userState } from "./state.svelte";
</script>
<h2>StoreChild1</h2>
<p>User name: {userState.name}</p>
<p>User age: {userState.age}</p>
<button onclick={() => {
	userState.name = 'child 1';
}}>
	change name
</button>