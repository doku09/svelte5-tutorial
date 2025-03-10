<script lang="ts">
    let count: number = $state(0);
    let doubled: number = $derived(count * 2);
    for(let i = 0; i < 10; i++) {
        count = i;
    }

    
</script>

<main>
    <h1>Reactive Statements Example</h1>
    <p>Count: {count}</p>
    <p>Doubled: {doubled}</p>
</main>