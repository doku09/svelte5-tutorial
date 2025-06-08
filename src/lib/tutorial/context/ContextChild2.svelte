<script>
	import { getContext, hasContext, setContext } from 'svelte';
    
	const value = getContext('counter');
	const person = getContext('person');
    const animal = getContext('animal');
    const Animal = $state({
	name: 'cat',
	age: 20
  })
  setContext('animal', Animal);
</script>

<p>{value.count}</p>
<button onclick={()=>{person.name='노홍철'}}>person.name</button>
<button onclick={()=>{person.name='hongchul'}}>person.name</button>
<p>Count is {value.count}</p>
<p>{person.name} : {person.age}</p>
<p>{animal.name} : {animal.age}</p>