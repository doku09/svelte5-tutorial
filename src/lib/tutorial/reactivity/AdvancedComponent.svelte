<script>
  import AComp from "./AComp.svelte";
  import BComp from "./BComp.svelte";

    let Thing = $state();
  </script>
  <hr>
  <select bind:value={Thing}>
    <option value={AComp}>A</option>
    <option value={BComp}>B</option>
  </select>

  <button onclick={()=>{Thing=AComp}}>A</button>
  <button onclick={()=>{Thing=BComp}}>B</button>
  <Thing/>