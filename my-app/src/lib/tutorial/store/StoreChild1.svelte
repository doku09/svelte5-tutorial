<script lang="ts">
  import { userState } from "./state.svelte";
</script>

<p>User name: {userState.name}</p>
<button onclick={() => {
	userState.name = 'child 1';
}}>
	change name
</button>