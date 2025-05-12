<script>
  import { SvelteDate, SvelteMap, SvelteSet, SvelteURL, SvelteURLSearchParams } from "svelte/reactivity";

    const sDate = new SvelteDate();
    const sMap = new SvelteMap();
    const sSet = new SvelteSet();
    // const url = new SvelteURL();
    const searchParams = new SvelteURLSearchParams();
    sMap.set('sk','sv');
    sSet.add('ss')
    const date = new Date()
    const map = $state(new Map())
    const set = $state(new Set());

    set.add('s');
    map.set('k','v');
    
</script>
<hr>
<button onclick={() => {
    map.set('k','v2');
    sMap.set('k','sv2');
}}>change!</button>


{map.get('k')}
{sMap.get('sk')}
<hr>
<button onclick={() => {
    set.add(sSet.size);
    sSet.add(sSet.size);
}}>change!</button>
{#each [...set] as item}
{item }
{/each}
{#each [...sSet] as item}
{item }
{/each}
