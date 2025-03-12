<script>
    let {data, header, row} = $props();
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