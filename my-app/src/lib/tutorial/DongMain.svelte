<script>
	import DongDerived from "./reactivity/DongDerived.svelte";
	import DongEffect from "./reactivity/DongEffect.svelte";
	import DongProps from "./props/DongProps.svelte";
	import DongState from "./reactivity/DongState.svelte";
	import DongAdvanceEffect from "./reactivity/DongAdvanceEffect.svelte";

	let activeTab = $state('$props');
</script>
<!-- ************************************************************ -->
<!-- ************************************************************ -->
<!-- ************************************************************ -->

<button onclick={() => {
	activeTab = '$state';
}}>$state</button>

<button onclick={() => {
	activeTab = '$derived';
}}>$derived</button>


<button onclick={() => {
	activeTab = '$effect';
}}>$effect</button>

<button onclick={() => {
	activeTab = '$props';
}}>$props</button>

{#if activeTab === '$state'}
<DongState/>
{:else if activeTab === '$derived'}
<DongDerived/>
{:else if activeTab === '$effect'}
<DongEffect/>
{:else if activeTab === 'advanceEffect'}
<DongAdvanceEffect/>
{:else if activeTab === '$props'}
<DongProps/>
{/if}