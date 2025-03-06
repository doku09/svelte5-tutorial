
<script lang="ts">
let value = $state('a');

$effect(() => {
    console.log(value);
})
</script>
<div>
<input type="radio" id="a" name="test" value="a" bind:group={value}/><label for="a">a</label>
<input type="radio" id="b" name="test" value="b" bind:group={value}/><label for="a">b</label>
<input type="radio" id="c" name="test" value="c" bind:group={value}/><label for="a">c</label>

</div>
