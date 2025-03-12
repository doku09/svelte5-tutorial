<script lang="ts">
  import { afterNavigate, beforeNavigate, goto } from '$app/navigation';
	import { userState } from './state.svelte.js';
  import StoreChild1 from './StoreChild1.svelte';
  import StoreChild2 from './StoreChild2.svelte';


  $effect(() => {
    console.log(userState.name);
  })

</script>
<hr>
<div><button onclick={()=>{goto('/navigate')}}>navigate</button></div>
<div><button onclick={()=>{userState.age = 30}}>userState.age = 30</button></div>
<StoreChild1/>
<StoreChild2/>

