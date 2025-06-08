<script>
  import { onMount } from "svelte";

  class Mount{
    constructor() {
        onMount(() => {
            console.log('Mount constructor');
        });
    }
  }

  onMount(() => {
      console.log('1')
    })
    onMount(() => {
        console.log('2')
    })
    const mountInstance = new Mount();
    onMount(() => {
        console.log('3')
    })

</script>
