<script lang="ts">
let {strArr = $bindable([])} = $props();

let selected: (string | number)[] = $state([]);

$effect(() => {
  debugger;
  selected;
  console.log('ArrChild.svlete');
    if (selected !== strArr) {
      selected = strArr;
    }
  });
</script>

