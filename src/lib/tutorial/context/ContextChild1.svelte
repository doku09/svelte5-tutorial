<script>
	import { getContext, setContext } from 'svelte';
  import ContextChild2 from './ContextChild2.svelte';

  const Animal = $state({
	name: 'dog',
	age: 1
  })
  setContext('animal', Animal);
  const animal = getContext('animal');
	const value = getContext('counter');
	const person = getContext('person');
</script>

<button onclick={()=>{person.name='유동환'}}>person.name</button>
<button onclick={()=>{person.name='yudong'}}>person.name</button>
<p>Count is {value.count}</p>
<p>{person.name} : {person.age}</p>
<h2>애니멀</h2>
{Animal.name} : {Animal.age}
{animal.name} : {animal.age}
<h2>child2</h2>
<ContextChild2/>