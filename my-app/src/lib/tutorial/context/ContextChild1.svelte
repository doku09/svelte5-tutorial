<script>
	import { getContext } from 'svelte';

	const value = getContext('counter');
</script>

<p>Count is {value.count}</p>