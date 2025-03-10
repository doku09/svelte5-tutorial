<script lang="ts">
    let x = 3;
    function getX() {
        return x; //얕은 반응
    }

    let y; 

    $: {
        y = getX() + 10;
    }
</script>

{y} <br />
x: {x}
<button on:click={()=> x++}> + Inc</button>