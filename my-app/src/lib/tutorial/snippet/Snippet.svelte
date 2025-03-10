<script>
	let { message = `it's great to see you!` } = $props();
</script>

{#snippet hello(name)}
	<p>hello {name}! {message}!</p>
{/snippet}

{@render hello('alice')}
{@render hello('bob')}

<hr>

{#snippet blastoff()}
	<span>🚀</span>
{/snippet}

{#snippet countdown(n)}
	{#if n > 0}
		<span>{n}...</span>
		{@render countdown(n - 1)}
	{:else}
		{@render blastoff()}
	{/if}
{/snippet}

{@render countdown(10)}

<hr>