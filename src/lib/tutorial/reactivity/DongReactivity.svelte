<script lang="ts">
  /**********svelte 5*************/ 
  // let count = 0;
  // let doubleCount = count * 2;
  // $: doubleCount = count * 2;
  //=============================
  // let user:{name:String;age:number} = {
  //   name:'dong',
  //   age:20
  // }  
  // ==================================
  

  /**********svelte 5*************/ 
  // 1. state and derived
  let count = $state(0);
  let doubleCount = $derived(count*2);

  let user:{name:String;age:number} = $state({
    name:'dong',
    age:20
  }) 

  //========================================
  //effect
  // 2. effect안에서서
    let a = $state(0);
    let b = $state(0);
    let c = $state(0);
    $effect(() => {
      if(user.name && a) {
        alert(user.name);
        // increase();
        // c++;
      }
    })
    const increase = () => {
      c++;
    }

  // ==================================
  // 3. $effect.root 
  let count3 = $state(0);
	const cleanup = $effect.root(() => {
    debugger;
		$effect(() => {
      debugger;
			console.log(count3);
		});

    //cleanup이 실행되면 더이상 effect.root()는 동작하지 않는다.
		return () => {
      count3 = 0;
			console.log('effect root cleanup');
		};
	});
// ====================================================
// 상태 동기화를 위해 복잡한 $effect를 사용하면 안된다. V1
  let total = 100;
	let spent = $state(0);
	let left = $state(total);

	function updateSpent(e) {
		spent = +e.target.value;
		left = total - spent;
	}

	function updateLeft(e) {
		left = +e.target.value;
		spent = total - left;
	}
// ====================================================
// 상태 동기화를 위해 복잡한 $effect를 사용하면 안된다. V2
  let total2 = 100;
  let spent2 = $state(0);

  let left2 = {
    get value() {
      return total2 - spent2;
    },
    set value(v) {
      spent2 = total2 - v
    }
  }
</script>

<!-- ************************************************************ -->
<!-- ************************************************************ -->
<!-- ************************************************************ -->

<h2>$State && $derived</h2>
===================================================
<h3>primitive</h3>
<button onclick={() => {count++;}}>+1</button>
{count}
{doubleCount}



<div>====================================================</div>
<h3>Object</h3>

<div>user.name: {user.name}</div>
<div>user.age: {user.age}</div>

<button onclick={() => {
  user.name = 'hwan';
  user.age = 30;
}}>user.name = 'hwan'</button>



<div>====================================================</div>
<h3>외부에서 $effect 내부에 있는 값이이변경되었을때 반응성 테스트</h3>
<button onclick={() => {
  a = 0;
  b = 0;
  c = 0
}}>reset</button>
<div>a:{a},b:{b},c:{c}</div>
<button onclick={() => {a++;}}>a+1</button>
<button onclick={() => {a--;}}>a-1</button>
<button onclick={() => {b++;}}>b+1</button>
<button onclick={() => {b--;}}>b-1</button>
<button onclick={() => {c++;}}>c+1</button>
<button onclick={() => {c--;}}>c-1</button>



<div>====================================================</div>
<h3>객체 속성이 바꼈을떄 $effect 동작</h3>
<button onclick={() => {
  user.name = 'hwan';
}}>user.name = 'hwan'</button>



<div>====================================================</div>
<h3>$effect.root() cleanUp을 누르면 동작을 정리하고 내부 $effect를 실행하지 않음</h3>
count3: {count3}
<button onclick={() => {
  cleanup();
}}>cleanup()</button>
<button onclick={() => {
  count3++;
}}>count3++</button>




<div>====================================================</div>
<h3>상태 동기화를 위해 복잡한 $effect를 사용하면 안된다. (순환참조발생) 방법V1</h3>
복잡한 경우 이벤트 핸들러를 사용하여 상태값을 변경해야한다.
<div>
<label>
	<input type="range" value={spent} oninput={updateSpent} max={total} />
	{spent}/{total} spent
</label>

<label>
	<input type="range" value={left} oninput={updateLeft} max={total} />
	{left}/{total} left
</label>
</div>



====================================================
<h3>상태 동기화를 위해 복잡한 $effect를 사용하면 안된다. 방법V2</h3>
<div>만약 bind:value를 꼭 사용해야 한다면, getter와 setter를 활용하여 상태를 동기화하는 것이 좋습니다.
예를 들어, 다음과 같이 left 값을 객체로 만들어 get과 set을 활용할 수 있습니다.</div>
<label>
	<input type="range" bind:value={spent2} max={total2} />
	{spent2}/{total2} spent
</label>

<label>
	<input type="range" bind:value={left2.value} max={total2} />
	{left2.value}/{total2} left
</label>














=====================================================
<div style="padding-bottom:500px;"></div>


