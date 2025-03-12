<script lang="ts">
  import { Car } from "./Car.svelte";

// 1.
  
let currentEffect: (() => void) | null | undefined;

function createSignal(value: number|string) {
  const rx = new Set<() => void>();
  return {
    getValue: () => {
      if (currentEffect) rx.add(currentEffect);
      return value;
    },
    setValue: (newVal:number|string) => {
      value = newVal;
      for (const reaction of rx) {
        let oldEffect = currentEffect;
        currentEffect = null;
        reaction();
        currentEffect = oldEffect;
      }
    },
  };
}

function effect(fn:() => void) {
  currentEffect = fn;
  fn();
  currentEffect = undefined;
}

const age = createSignal(31);
const message = createSignal("you're not so young anymore.");

effect(() => {
  console.log('Re-Run?!');
  console.log(age.getValue());
  if (age.getValue() as number > 35) {
    console.log(message.getValue());
  }
});

age.setValue(36);
  message.setValue('you are old');





  let x = $state(5)
  function threeTimeX() {
    return x*3;
  }
  let y = $derived(threeTimeX() + 3);


const myCar = new Car();


</script>

{y}

{myCar.fuel}<br/>
should I refuel? {myCar.shouldRefuel}
<button onclick={()=> myCar.refuel()}>Refuel</button>
<button onclick={()=> myCar.drive(20)}>Drive</button>