<script lang="ts">
  import DeepStateReactivity from "./DeepStateReactivity.svelte";
  import Proxy from "./Proxy.svelte";


	let activeTab = $state('$props');
</script>
<!-- ************************************************************ -->
<!-- ************************************************************ -->

<button onclick={() => {
	activeTab = 'proxy';
}}>proxy</button>

<button onclick={() => {
	activeTab = 'deepReact';
}}>deepReact</button>



{#if activeTab === 'proxy'}
<Proxy/>
{:else if activeTab === 'deepReact'}
<DeepStateReactivity/>
{/if}
