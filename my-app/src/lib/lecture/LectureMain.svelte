<script lang="ts">
  import DeepStateReactivity from "./DeepStateReactivity.svelte";
  import NotificationList from "./NotificationList.svelte";
  import Proxy from "./Proxy.svelte";
  import RandomNumber from "./RandomNumber.svelte";
  import RandomNumberV2 from "./RandomNumberV2.svelte";


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

<button onclick={() => {
	activeTab = 'notificationList';
}}>notificationList</button>

<button onclick={() => {
	activeTab = 'randomNumber';
}}>randomNumber</button>

<button onclick={() => {
	activeTab = 'randomNumber2';
}}>randomNumberV2</button>


{#if activeTab === 'proxy'}
<Proxy/>
{:else if activeTab === 'deepReact'}
<DeepStateReactivity/>
{:else if activeTab === 'notificationList'}
<NotificationList/>
{:else if activeTab === 'randomNumber'}
<RandomNumber/>
{:else if activeTab === 'randomNumber2'}
<RandomNumberV2/>
{/if}
