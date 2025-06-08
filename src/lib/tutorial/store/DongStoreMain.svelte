<script lang="ts">
	import { countStore, userState } from './state.svelte.js';
  import StoreChild1 from './StoreChild1.svelte';
  import StoreChild2 from './StoreChild2.svelte';


  //store
  let count = countStore;
  let xxx = $state(0);
  let countable = $derived(xxx * 2);

  // state
  $effect(() => {
    console.log(userState.name);
    
  })

</script>
<hr>
<div><button onclick={()=>{goto('/navigate')}}>navigate</button></div>
<div><button onclick={()=>{userState.age = 30}}>userState.age = 30</button></div>
<div><button onclick={()=>{countStore.update}}>userState.age = 30</button></div>
count: {$countStore}
{userState.name}: {userState.age}
<StoreChild1/>
<StoreChild2/>

