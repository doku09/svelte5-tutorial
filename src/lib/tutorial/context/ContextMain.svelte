<script>
    import {getContext, hasContext, setContext} from 'svelte';
  import ContextChild1 from './ContextChild1.svelte';
  import ContextChild2 from './ContextChild2.svelte';

  const person = $state({
    name: 'youdonghwan',
    age:29
  })
  let value = $state({count:0})
    setContext('counter', value);
    setContext('person', person);
    if(hasContext('animal')){
      console.log('animal context already exists');
    } else {
      console.log('no anumal');
    }
    // const animal = getContext('animal');
</script>

<h2>부모컴포</h2>
{person.name} {person.age}
<!-- <p>애니멀: {animal.name}:{animal.age} </p> -->
<div><button on:click={()=>{value.count++}}>count++</button></div>
<div><button on:click={()=>{person.age++}}>person.age++</button></div>
<hr/>
<h2>child1</h2>
<ContextChild1/>
<!-- <h2>child2</h2>
<ContextChild2/> -->