<script>
	import DongDerived from "./reactivity/DongDerived.svelte";
	import DongEffect from "./reactivity/DongEffect.svelte";
	import DongProps from "./props/DongProps.svelte";
	import DongState from "./reactivity/DongState.svelte";
	import DongAdvanceEffect from "./reactivity/DongAdvanceEffect.svelte";
  import PlayGround from "./reactivity/PlayGround.svelte";
  import Snippet from "./snippet/Snippet.svelte";
  import DongStoreMain from "./store/DongStoreMain.svelte";
  import ContextMain from "./context/ContextMain.svelte";
  import AdvanceObj from "./reactivity/AdvanceObj.svelte";
  import AdvancedComponent from "./reactivity/AdvancedComponent.svelte";

	// let activeTab = $state('$props');
	let activeTab = $state('advancedObj');
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

<button onclick={() => {
	activeTab = 'snippet';
}}>snippet</button>
<button onclick={() => {
	activeTab = 'store';
}}>store</button>
<button onclick={() => {
	activeTab = 'context';
}}>context</button>

<button onclick={() => {
	activeTab = 'advancedObj';
}}>advancedObj</button>
<button onclick={() => {
	activeTab = 'advanceSvelteComponent';
}}>advanceSvelteComponent</button>
<button onclick={() => {
	activeTab = 'play';
}}>play</button>

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
{:else if activeTab === 'snippet'}
<Snippet/>
{:else if activeTab === 'store'}
<DongStoreMain/>
{:else if activeTab === 'context'}
<ContextMain/>
{:else if activeTab === 'advancedObj'}
<AdvanceObj/>
{:else if activeTab === 'advanceSvelteComponent'}
<AdvancedComponent/>
{:else if activeTab === 'play'}
<PlayGround/>
{/if}