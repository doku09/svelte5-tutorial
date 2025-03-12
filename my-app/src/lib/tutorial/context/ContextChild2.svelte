<script>
	import { getContext, hasContext } from 'svelte';
    let value = {count:0};
	if(hasContext('counter')){
       value = getContext('counter');
        console.log(value);
    }
</script>

<p>{value.count}</p>