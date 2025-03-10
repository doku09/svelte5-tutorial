<script lang="ts">
	import generateNotifications from '$lib/lecture/utils/generate-notifications';
  import Notification from './Notification.svelte';

	let notifications = $state(generateNotifications(3));
</script>

<ul>
	{#each notifications as notification,index}
		<li>
			<Notification
				{notification}
				onremove={(id) => {
                    debugger;
					notifications.splice(index, 1);
				}}
			/>
		</li>
	{:else}
		<p>No notifications</p>
	{/each}
</ul>

<style>
</style>