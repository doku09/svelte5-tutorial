<script lang="ts">
	import { onMount, untrack } from "svelte";

// 1. effect는 DOM을 그린 후에 실행된다.
$effect(() => {
  console.log('$effect')
});

onMount(() => {
  console.log('onMount')
})
// 2. effect내에서 함수를 반환하면 effect가 다시 실행되기 직전과 실행이 끝나기 직전에 실행된다. 
let count2 = $state(0);
let milliseconds2 = $state(1000);

$effect(() => {
  // `milliseconds`가 변경될 때마다 새롭게 생성됨
  const interval = setInterval(() => {
			count2 += 1;
		}, milliseconds2);

  return () => {
    // 정리 함수: 
    // a) 효과가 다시 실행되기 직전에 실행됨
    // b) 컴포넌트가 제거될 때 실행됨
    clearInterval(interval);
  };
})

// 3. effect는 객체 자체가 변경될떄만 다시실행되고, 개별 속성이 변경될때는  실행하지 않는다. 
let state3 = $state({value: 0,age:20});
let derived3 = $derived({value:state3.value * 2});

// 이 효과는 한 번만 실행됨 (state가 재할당되지 않기 때문)
$effect(() => {
  console.log('state3');
		state3;
	});

	// `state.value`가 변경될 때마다 실행됨
	$effect(() => {
    console.log('state3.value');
		state3.value;
	});

	// `derived`는 매번 새로운 객체이므로, 변경될 때마다 실행됨
	$effect(() => {
    console.log('derived3');
		derived3;
	});

// 4. 마지막 실행에서 읽었던 조건만 의존성으로 등록한다. 
let a4 = $state(false);
let b4 = $state(0);
$effect(() => {
  console.log('running');

  if(a4) {
    // console.log('b: ', b4);
    b4;
  }
})

// 5. effect 안에 있는 함수에서 값을 읽으면 effect를 실행한다.
let a5 = $state(false);
let b5 = $state(0);

const logB5 = () => {
  // console.log('b: ', b5);
  b5;
}


$effect(() => {
  if(a5) {
    console.log('5번 실행');
    logB5();
  }
})

// 6. effect 안에 있는 함수에서 값이 할당되면 순환참조되어 무한루프를 실행한다.
let a6 = $state(false);
let b6 = $state(0);
const assignB6 = () => {
  // b6 = b6 * 2;
  b6 = b6 * 2;
  // b6 = untrack(() => b6) * 2;
}
$effect(() => {
  console.log('running6');

  if(a6) {
    assignB6();
  }
})

// 7. effect 안에 있는 함수에서 값을 할당하면 한번 실행된다
let a7 = $state(false);
let b7 = $state(0);
let c7 = $state(0);
const assignC7 = () => {
  c7 = b7 + 1;
  // untrack(() => c7) = b7 + 1;
}
$effect(() => {
  console.log('running');

  if(a7) {
    assignC7();
  }
})

// 8. untrack한 상태를 만들면 effect 안에서 한번만 동작하고 값이 업데이트 되어도 반응하지 않는다.
let a8 = $state(false);
let b8 = $state(1);

const assignB8 = () => {
  debugger;
  // console.log(b8)
  // console.log(b8)
  // console.log(b8)
  untrack(() => {
    // console.log(b8)
    b8 *= 2;
  }) 
  // b8 = untrack(() => b8) * 2;
}
$effect(() => {
  console.log('running8');

  if(a8) {
    assignB8();
  }
})

// 9. 배열은 변화해도 effect를 타지 않는다.?
let a9 = $state(false);
let arr9 = $state(['a','b','c']);
const assignArr9 = () => {
  arr9 = ['d']; //배열 값이 변하지 않으면 괜찮다.
}
$effect(() => {
  console.log('running9');

  if(a9) {
    assignArr9();
    // arr9 = [];
  }
})


// 10. 숫자배열 배열에 요소를 넣을때마다 넣는 값이 1씩 증가한다.
let a10 = $state(false);
let numArr10 = $state([1,2,3]);
let count10 = $state(4);
const assignArr10 = () => {

let arrTmp = [1,2,3,4,5];
  // 배열이 재할당되면 effect를 타나? [], [1,2,3,4]를 재할당했을때 안타는거 보면 그건 아니고.. 
  // numArr10 = [...arrTmp,count10]; // 정상- 배열은 배열안의 값이 변하지 않을걸 알고 정상처리
  numArr10.push(1);
  
  /** 무한루프 시리즈*/
  // numArr10 = [...arrTmp,untrack(() => count10)]; //state값을 조작하면 무한루프
  // count10 *= 2; //무한루프
  // count10 = count10++; //무한루프
  // numArr10 = [...numArr10,count10++]; //무한루프
  // numArr10 = [...numArr10,count10]; //무한루프 
  /** untrack */
  // untrack(() => count10++); //기본자료형은 값의 변화를 감지해서 반응성을 타는듯? 
}

$effect(() => {
  if(a10) {

    // if(numArr10){
      assignArr10();}
    // }
})

  // 11. 배열안의 객체를 forEach로 속성을 변경해도 무한루프를 돌지 않는다.
  let a11 = $state(false);
  let arr11 = $state([{name:'aa',age:10,checked:false},{name:'bb',age:11,checked:true},{name:'cc',age:12,checked:false},{name:'dd',age:13,
  checked:true}]);
  $effect(() => {
    if(a11) {

      arr11.forEach((e) => {
        e.checked = false;
      });
      
    }
  })

// 12. 객체 배열 무한루프 원인미상
let a12 = $state(false);
let arr12 = $state([]) as {name:string,age:number,checked:boolean}[];

$effect(() => {
  if(a12) {
    console.log('effect12 실행');
    let tmp12 = [
      {name:'aa',age:10,checked:false},
      {name:'bb',age:11,checked:true},
      {name:'cc',age:12,checked:false},
      {name:'dd',age:13,checked:true}];

    tmp12.forEach(
      obj => {
          arr12.push(obj);
        }
    );
  }
});



// 13. 기본값 배열 무한루프 원인미상
let a13 = $state(false);
let arr13:number[] = $state([1,2]);
let arr33 = $state([{tmp:'wow!'},{tmp:'wow!'},{tmp:'wow!'}])
let tmp1 = $state({tmp:'wow!', arr:[]});
let init13 = false;
$effect(() => {
  console.log('effect13 실행');
  if(a13) {
    // arr13.forEach((e) => {
    //   e = 1;
    // })

    // if(!init13) {
    // arr13 = [];
    // }
    // let tmp13:number[] = [1,2,3,4,5];    

    // arr13.push(6);
    // arr13 = [1,2,3,4,5];
    arr13 = arr13;
    let originArr = arr13;

    tmp1.tmp;

    arr13 = originArr;
    // originArr = []
    // originArr = [5];
    // arr13 = [];
    console.log(originArr === arr13);
    // tmp13.forEach(
    //   s => arr13.push(s)
    // );


 
    // arr13 = []


    // init13 = true;
    
    // console.log(arr13);
  }
})


// 14. 기본형값은 변하면서 추가되면 무한루프 (버튼권한 문제제)
const getFlag14 = () => {
  let returnValue = false;
    // if (boxData.boxType === WorBoxType.LABEL || boxData.boxType === WorBoxType.CATEGORY) {
    //   returnValue = true;
    // } else {
    if (b14) {
      let flag = false;
      if (b14) {
        flag = true;
      }
      if (flag === a14) {
        returnValue = true;
      }
    }
    // }
    return returnValue;
  }
  
  let a14 = $state(false);
  let b14 = $state(true);
  let totla14:number = $state(0);
  $effect(() => {
    if(a14) {
    console.log('running14');
    console.log(getFlag14());
    totla14 += getFlag14()? 1:0;
  }
})

// 15. 비동기적으로 읽힌값은 추적하지 않는다.
let arr15 = $state([]) as {name:string,age:number,checked:boolean}[];
let a15 = $state(false);
$effect(() => {
  untrack(() => {
    console.log($state.snapshot(arr15)); // <= arr15를 추적한다. 이거 풀면 무한루프
  })
  // arr15.forEach((e) => {
  //   e.checked = false;
  // });

  // arr15.map(e => ({...e, checked:false}));
  // arr15;
  // arr15 = [];
  // if(arr15 && arr15[0]){arr15[0].age=999;}
  // if(arr15 && arr15[0]){arr15=[...arr15];}
  // arr15[0]
  if(a15) {
  setTimeout(() => {
    console.log('running 15');
    let tmp15 = [
      {name:'aa',age:10,checked:false},
      {name:'bb',age:11,checked:true},
      {name:'cc',age:12,checked:false},
      {name:'dd',age:13,checked:true}];

    tmp15.forEach(
      obj => {
          arr15.push(obj);
        }
    );

  },0)
}
})
// 16. 값 업데이트 템플리셍서 업데이트
let count16 = $state(0);
let double16 = $state();
$effect(() => {
  console.log('running 16');
  double16 = count16*2
})

// 17. 함수에서 값 업데이트
let count17 = $state(0);
let double17 = $state();
$effect(() => {
  console.log('running 17');
  double17 = count17*2
})
const increment17 = () => {
  count17++;
  console.log({count17, double17});
}

// 18. 

  const fixed = {a:1, b:2, c:3, d:4, e:5} ;
  // const before = {a:5, b:4, c:3, d:2, e:1}

  const fixed2 = $state({a:1, b:2, c:3, d:4, e:5});
  const fixed3 = $state({a:1, b:2, c:3, d:4, e:5});
  let tmp18 = $state({a:5, b:4, c:3, d:2, e:1});
  let emptyArr18 = $state();

  const changeTmp = () => {
    // emptyArr18 = [];
    // emptyArr18 = emptyArr18 //초기값을 저장.
      // tmp18 = fixed2;
      // tmp18 = {...fixed};
      tmp18 = fixed;
      // 1. fixed 라는 순수 object로 프록시 객체를 새로만듦
      // 2. 1번에서 만든 프록시 객체를 tmp18에 대입입

      // Object.assign(tmp, fixed);

      // tmp18.a = 11;
      // tmp18.b = 22;
      // tmp18.c = 33;
  }
  const changefix1 = () => {
      fixed.a = 111
      fixed.b = 111
      fixed.c = 111
  }
  const changefix2 = () => {
      fixed2.a = 222
      fixed2.b = 222
      fixed2.c = 222
  }
  const changefix3 = () => {
      fixed3.a = 333
      fixed3.b = 333
      fixed3.c = 333
  }

  // 19. 원본객체와 프록시객체

  const execute19 = ()  => {
    debugger;
    let arr19 = [ 1, 2, 3,undefined ]
    let arr19_1 = $state(arr19)
    let arr19_2 = $state([1,2,3])


    arr19.push(4)
    // arr19.length++

    arr19_1.length++
    arr19_1.push(5)

    console.log(arr19.slice())
    // expected: [ 1, 2, 3, 4, empty ]
    // actual:   [ 1, 2, 3, 4, empty ]

    console.log(arr19_1.slice())
    // expected: [ 1, 2, 3, empty, 5 ]
    // actual:   [ 1, 2, 3,     4, 5 ]

    // arr19_1.length++
    // arr19_1.push(6)

    // arr19.push(7)
    // arr19.length++

    // console.log(arr19.slice())
    // expected: [ 1, 2, 3, 4, empty, 7, empty ]
    // actual:   [ 1, 2, 3, 4, empty, 7, empty ]

    // console.log(arr19_1.slice())
    // expected: [ 1, 2, 3, empty, 5, empty, 6 ]
    // actual:   [ 1, 2, 3,     4, 5,     7, 6 ]
  }

// 20. 배열객체 .push (12번과 연결)
let arr20 = $state([]) as {name:string,age:number,checked:boolean}[];
let a20 = $state(false);
$effect(() => {
  if(a20) {
    console.log('effect20 실행');
    arr20.push({name:'aa',age:10,checked:false});
    // arr20.push({name:'bb',age:11,checked:true});
    // arr20.push({name:'cc',age:12,checked:false});
  }
});

// 21. 기본형 배열 .push (12번과 연결) - 무한루프 
let tmp21 = [1,2,3];
// let arr21:number[] = $state([1,2,3]);
let arr21:number[] = $state(tmp21);
let a21 = $state(false);
$effect(() => {
  if(a21) {
    console.log('effect21 실행');
    // arr21.push(4);
    // arr21 = [1,2,3]
    // arr21.push(5);
    // arr21.push(6);
  }
});

</script>

<div class="testCase">
  <div class="subject">1. effect는 DOM을 그린 후에 실행된다. </div>
  <div class="when"><button onclick={() => {}}></button> </div>
  <div class="result">
  </div>
</div>

<div class="testCase">
  <div class="subject"> 2. effect내에서 함수를 반환하면 effect가 다시 실행되기 직전과 실행이 끝나기 직전에 실행된다.  </div>
  <div class="when"><button onclick={() => {milliseconds2 *= 2}}>slower</button> </div>
  <div class="when"><button onclick={() => {milliseconds2 /= 2}}>faster</button> </div>
  <div class="result">count2: {count2}</div>
  <div class="result"></div>
</div>

<div class="testCase">
  <div class="subject">3. effect는 객체 자체가 변경될떄만 다시실행되고, 개별 속성이 변경될때는  실행하지 않는다.  </div>
  <div class="when"><button onclick={() => {state3.value += 1}}>state3.value++</button> </div>
  <div class="when"><button onclick={() => {state3.age++;}}>state3.age</button> </div>
  <div class="when"><button onclick={() => {state3 = {
    value:999,
    age:998
  }}}>객체를 통쨰로 업데이트트</button> </div>
  <div class="result"> state3.value:{state3.value}</div>
  <div class="result"> state3.age:{state3.age}</div>
</div>

<div class="testCase">
  <div class="subject">4. 마지막 실행에서 읽었던 조건만 의존성으로 등록한다.  </div>
  <div class="when"><button onclick={() => {a4 = true}}>a를 true로</button> </div>
  <div class="when"><button onclick={() => {a4 = false}}>a를 false로</button> </div>
  <div class="when"><button onclick={() => {b4++;}}>b++</button> </div>
  <div class="result">a4: {a4}</div>
  <div class="result">b4: {b4}</div>
</div>

<div class="testCase">
  <div class="subject">5. effect 안에 있는 함수에서 값을 읽으면 effect를 실행한다. </div>
  <div class="when"><button onclick={() => {a5 = true}}>a를 true로</button> </div>
  <div class="when"><button onclick={() => {a5 = false}}>a를 false로</button> </div>
  <div class="when"><button onclick={() => {b5++;}}>b++</button> </div>
  <div class="result">a5: {a5}</div>
  <div class="result">b5: {b5}</div>
</div>

<div class="testCase">
  <div class="subject">6. effect 안에 있는 함수에서 값이 할당되면 순환참조되어 무한루프를 실행한다. </div>
  <div class="when"><button onclick={() => {a6 = true}}>a를 true로</button> </div>
  <div class="when"><button onclick={() => {a6 = false}}>a를 false로</button> </div>
  <div class="when"><button onclick={() => {b6++;}}>b++</button> </div>
  <div class="result">a6: {a6}</div>
  <div class="result">b6: {b6}</div>
</div>

<div class="testCase">
  <div class="subject">7. effect 안에 있는 함수에서 값을 할당하면 순환참조되어 무한루프를 실행한다. </div>
  <div class="when"><button onclick={() => {a7 = true}}>a를 true로</button> </div>
  <div class="when"><button onclick={() => {a7 = false}}>a를 false로</button> </div>
  <div class="when"><button onclick={() => {b7++;}}>b++</button> </div>
  <div class="when"><button onclick={() => {c7++;}}>c++</button> </div>
  <div class="result">a: {a7}</div>
  <div class="result">b: {b7}</div>
  <div class="result">c: {c7}</div>
</div>

<div class="testCase">
  <div class="subject">8. untrack한 상태를 만들면 effect 안에서 한번만 동작하고 값이 업데이트 되어도 반응하지 않는다. 6번테스트와 동일함 </div>
  <div class="when"><button onclick={() => {a8 = true}}>a를 true로</button> </div>
  <div class="when"><button onclick={() => {a8 = false}}>a를 false로</button> </div>
  <div class="when"><button onclick={() => {b8++;}}>b++</button> </div>
  <div class="result">a: {a8}</div>
  <div class="result">b: {b8}</div>
</div>


<div class="testCase">
  <div class="subject">9. 배열은 변화해도 effect를 타지 않는다.?</div>
  <div class="when"><button onclick={() => {a9 = true}}>a9를 true로</button> </div>
  <div class="when"><button onclick={() => {a9 = false}}>a9를 false로</button> </div>
  <div class="when"><button onclick={() => {arr9 = [...arr9,'d']}}>arr9 = arr9</button> </div>
  <div class="result">a: {a9}</div>
  <div class="result">arr9: {arr9}</div>
</div>

<div class="testCase">
  <div class="subject">10. 숫자배열 배열에 요소를 넣을때마다 넣는 값이 1씩 증가한다. </div>
  <div class="when"><button onclick={() => {a10 = true}}>a를 true로</button> </div>
  <div class="when"><button onclick={() => {a10 = false}}>a를 false로</button> </div>
  <div class="when"><button onclick={() => {numArr10 = [...numArr10,count10];count10++;}}>arr = arr</button> </div>
  <!-- <div class="when"><button onclick={() => {}}>arr = arr</button> </div> -->
  <div class="result">a: {a10}</div>
  <div class="result">numArr: {numArr10}</div>
</div>

<div class="testCase">
  <div class="subject">11. 배열안의 객체를 forEach로 변경하면 무한루프를 실행한다.(X) </div>
  <div class="when"><button onclick={() => {a11 = true}}>a를 true로</button> </div>
  <div class="when"><button onclick={() => {a11 = false}}>a를 false로</button> </div>
  <div class="result">a: {a11}</div>
  <div class="result">arr: {arr11}</div>
  <div class="result">
    {#each arr11 as item,i}
    <div class="result">{i}-{item.checked}</div>
    {/each}
  </div>
</div>

<div class="testCase">
  <div class="subject">12. 배열객체 무한루프 원인미상 </div>
  <div class="when"><button onclick={() => {a12 = true}}>a를 true로</button> </div>
  <div class="when"><button onclick={() => {a12 = false}}>a를 false로</button> </div>
  <div class="result">a: {a12}</div>
  <div class="result">arr: {arr12}</div>
  <div class="result">
    {#each arr12 as item,i}
    <div class="result">{i}-{item.checked}</div>
    {/each}
  </div>
</div>

<div class="testCase">
  <div class="subject">13. 기본형 배열열 무한루프 원인미상 </div>
  <div class="when"><button onclick={() => {a13 = true}}>a를 true로</button> </div>
  <div class="when"><button onclick={() => {a13 = false}}>a를 false로</button> </div>
  <div class="result">a: {a13}</div>
  <div class="result">arr: {arr13}</div>
  <div class="result">
    {#each arr13 as item,i}
    <div class="result">{i}-{item}</div>
    {/each}
  </div>
</div>
<div class="testCase">
  <div class="subject"> 14. boolean값이 $effect안에서 선언되고 변경되면 무한루프를 실행함.</div>
  <div class="when"><button onclick={() => {a14=true}}>a를true로</button> </div>
  <div class="result"></div>
</div>

<div class="testCase">
  <div class="subject">15. 배열객체 비동기 함수 안에있는건 추적하지 않음. </div>
  <div class="when"><button onclick={() => {a15 = true}}>a를 true로</button> </div>
  <div class="when"><button onclick={() => {a15 = false}}>a를 false로</button> </div>
  <div class="result">a: {a15}</div>
  <div class="result">arr: {arr15}</div>
  <div class="result">
    {#each arr15 as item,i}
    <div class="result">{i}-{item.checked}</div>
    {/each}
  </div>
</div>


<div class="testCase">
  <div class="subject">16. 값동기화 타이밍 이슈</div>
  <div class="when"><button onclick={() => {
    count16++;
    console.log({count16, double16});
  }}>count16++</button> </div>
  <div class="result">count16: {count16}</div>
  <div class="result">double16: {double16}</div>
</div>

<div class="testCase">
  <div class="subject">17. 값동기화 타이밍 이슈</div>
  <div class="when"><button onclick={increment17}>count17++</button> </div>
  <div class="result">count: {count17}</div>
  <div class="result">double: {double17}</div>
</div>

<div class="testCase">
  <div class="subject">18. state를 할당하면 일반객체도 state가된된니다 </div>
  <div class="when"><button onclick={changeTmp}>changeTmp</button> </div>
  <div class="when"><button onclick={changefix1}>changefix1</button> </div>
  <div class="when"><button onclick={changefix2}>changefix2</button> </div>
  <div class="when"><button onclick={changefix3}>changefix3</button> </div>
  <div class="result">

    <div>tmp.a : {tmp18.a}</div>
    <div>tmp.b : {tmp18.b}</div>
    <div>tmp.c : {tmp18.c}</div>
    
    <br/>
    <div>fixed.a : {fixed.a}</div>
    <div>fixed.b : {fixed.b}</div>
    <div>fixed.c : {fixed.c}</div>

    <br/>
    <div>fixed2.a : {fixed2.a}</div>
    <div>fixed2.b : {fixed2.b}</div>
    <div>fixed2.c : {fixed2.c}</div>
    
    <br/>
    <div>fixed3.a : {fixed3.a}</div>
    <div>fixed3.b : {fixed3.b}</div>
    <div>fixed3.c : {fixed3.c}</div>
  </div>
</div>

<div class="testCase">
  <div class="subject">19. 원본객체와 프록시객체</div>
  <div class="when"><button onclick={execute19}>execute19</button> </div>
</div>

<div class="testCase">
  <div class="subject">20. 배열객체 .push (12번과 연결) </div>
  <div class="when"><button onclick={() => {a20 = true}}>실행</button> </div>
</div>

<div class="testCase">
  <div class="subject">21. 기본객체체 .push (12번과 연결)</div>
  <div class="when"><button onclick={() => {a21 = true}}>실행</button> </div>
</div>




<div style="padding-bottom:500px;"></div>

<style>
  .testCase {
    border: 1px solid black;
    padding: 20px 0px 20px 20px;
    margin: 30px 0px 30px 0px;
    
  }
  .subject {
    margin-bottom: 13px;
    font-weight: 700;
    color: #1a1a2e;
  }
</style>