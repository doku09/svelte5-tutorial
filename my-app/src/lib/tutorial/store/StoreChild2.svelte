<script lang="ts">
import { userState } from "./state.svelte";
</script>
<h1>StoreChild2</h1>
<p>User name: {userState.name}</p>
<p>User age: {userState.age}</p>
<button onclick={() => {
	userState.name = 'child 2';
}}>
	change name
</button>