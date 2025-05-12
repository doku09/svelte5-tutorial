<script>
    let {data, header, row, children} = $props();
</script>

<table>
{@render header()}
<tbody>
{#each data as d}
    <tr>
    {@render row(d)}
    </tr>
{/each}
</tbody>
</table>


{#if children}
	{@render children()}
{:else}
	fallback content
{/if}