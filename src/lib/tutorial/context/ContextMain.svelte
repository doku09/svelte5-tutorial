<script>
    import {setContext} from 'svelte';
  import ContextChild1 from './ContextChild1.svelte';
  import ContextChild2 from './ContextChild2.svelte';

  let value = $state({count:0})
    setContext('counter', value);
</script>
<div><button on:click={()=>{value.count++}}>count++</button></div>
<ContextChild1/>
<ContextChild2/>