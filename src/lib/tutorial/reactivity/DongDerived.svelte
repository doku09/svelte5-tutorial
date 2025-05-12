<script lang="ts">
  // 1. state인 count가 변하면 derived인 double도 변한다.
  let count1 = $state(0);
  let doubled1 = $derived(count1 * 2);

  //2. derived.by는 짧은 표현식으로 표현하기 어려운 복잡한 파생상태를 만든다.
	let numbers2 = $state([1, 2, 3]);
	let total2 = $derived.by(() => {
		let total2 = 0;
		for (const n of numbers2) {
			total2 += n;
		}
		return total2;
	});

  // 3. derived는 변경되지 않으면 렌더링하지 않는다. 값이 변경될때만 업데이트한다.
  let count3 = $state(0);
  let large3 = $derived(count3 > 10);

  // 4. 객체 상태에서 derived 재할당
  let person4 = {
    name:'dong',
    age:20
  }

  let flag4 = $state(false);
  let dePerson4 = $derived.by(() => {
    let tmp = person4;
    if(flag4) {
      tmp = {
        name:'hwang',
        age:28
      }
    }
    return tmp;
  })

  // 5. 객체가 없을때 derived는 &&연산을 주면 값이 없어도 에러가 나지 않는다. 
  // let person5:{name:string,age:number} = $state({name:'initName',age:1}) as {name:string,age:number};
  let person5:{name:string,age:number} = $state() as {name:string,age:number};
  let name5 = $derived(person5&&person5.name);
  let age5 = $state(person5&&person5.age);

  $effect(() => {
    if(person5 && person5.age) {
    age5 = person5.age;
    }
  })

  // 6. derived.by도 종속성에 따라 반응한다.
  let a6 = $state(1);
  // let arr6 = $state([1,2,3]);
  
  const  returnValue =  () => {
    // return arr6.length > 1;
    return true;
  }
  let b6 = $derived.by(() => {
    console.log('running derived.by()')
    console.log('a6:',a6);
    return a6 * 2;
  });

// 7.
let a7 = $state(1); let b7 = $state(2); let c7 = $state(3);
let d7= $state(1); let e7 = $state(2);

function addNumber()  {
  return a7 + b7 + c7 + d7 + e7;
}

// 8. 객체형 derived 
const value = () => ({
  username:'dong',
  age:20
})
let b8= $state(value())
let a8 = $derived(b8);

// 9. state에 state? 
class Person9 {
  username = $state('dong')
  age = $state(20)
  dog = $state({
    name:'qqu',
    age: 19
  })

  constructor() {
    this.username = 'after'
    this.age = 30
    this.dog = {
      name:'qqu',
      age: 19
    } 
  }

  public getMydog() {
    return this.dog;
  }
}
  let p9 = new Person9();
  let d9 = $state(p9.getMydog());


//10. derived.by로 배열객체가 변할때 반응성으로 변하게한다. 
let a10 = $state([
  {username:'aa',age:20},
  {username:'bb',age:30},
  {username:'cc',age:40},
  {username:'dd',age:50}
]);

const toListData = (list) => {
  const newList = [];
  list.forEach((item) => {

    newList.push({
      myName:item.username,
      myAge:item.age
    });
    return newList;
  })
  debugger;
  return newList;
}

let b10 = $derived.by(() => {
  
  console.log('10번 derived.by()')
  // return a10.filter((item) => item.age > 30);
  return toListData(a10);
})

let c10 = {username:'ee',age:60};
  const a10push = () => {
    c10.age = Math.floor(Math.random() * 100);
    a10.push(c10);
  }
</script>

<div class="testCase">
  <div class="subject"> 1. state인 count가 변하면 derived인 double도 변한다.</div>
  <div class="when"><button onclick={() => {count1++}}>count1++</button> </div>
  <div class="result">count1++:{count1}</div>
  <div class="result">doubled1:{doubled1}</div>
</div>

<div class="testCase">
  <div class="subject"> 2. derived.by는 짧은 표현식으로 표현하기 어려운 복잡한 파생상태를 만든다. </div>
  <div class="when"><button onclick={() => numbers2.push(numbers2.length + 1)}>
    numbers2.push(numbers2.length + 1)
  </button> </div>
  <div class="result">{numbers2.join(' + ')} = {total2}</div>
  <div class="result"></div>
</div>

<div class="testCase">
  <div class="subject">3. count가 10이 넘어가면 boolean값을 true로 업데이트한다.  </div>
  <div class="when"><button onclick={() => {count3++}}>count3++</button> </div>
  <div class="result">count:{count3}</div>
  <div class="result">{large3}</div>
</div>

<div class="testCase">
  <div class="subject">4. 객체 상태에서 derived 재할당 </div>
  <div class="when"><button onclick={() => {flag4 = true}}>flag4 = true</button> </div>
  <div class="when"><button onclick={() => {flag4 = false;}}>flag4 = false</button> </div>
  <div class="result">dePerson4.age = {dePerson4.age}</div>
  <div class="result">dePerson4.name = {dePerson4.name}</div>
</div>

<div class="testCase">
  <div class="subject">5. 객체가 없을때 derived는 에러가난다. </div>
  <div class="when"><button onclick={() => {
    person5 = {
    name:'dong',
    age:20
  }
  }}>person5 할당</button> </div>

<div class="when"><button onclick={() => {
  person5 = {
  name:'hwang',
  age:50
}
}}>person5 재할당</button> </div>
   
  <div class="when"><button onclick={() => {
    if(person5 && person5.age){
      person5.age = 10;
    }
  }}>person5.age=10</button> </div>


  <div class="result">{name5}</div>
  <div class="result">{age5}</div>
</div>

<div class="testCase">
  <div class="subject"> 6. derived.by도 종속성?</div>
  <div class="when"><button onclick={() => {a6+=1}}>a6+1</button> </div>
  <div class="when"><button onclick={() => {console.log(b6)}}>get.b6</button> </div>
  <!-- <div class="when"><button onclick={() => {arr6.push(1)}}>arr6.push(1)</button> </div> -->
  <div class="result">
    <h3>a6:{a6}</h3>
    <!-- <h3>b6:{b6}</h3> -->
  </div>
  <div class="result"></div>
</div>

<div class="testCase">
  <div class="subject"> 7. derived와 함수</div>
  <div class="when"><button onclick={() => {a7+=1}}>a+1</button> </div>
  <div class="when"><button onclick={() => {b7+=1}}>b+1</button> </div>
  <div class="result"><h3>{addNumber()}</h3>
  </div>
</div>


<div class="testCase">
  <div class="subject"> 8.</div>
  <div class="when"><button onclick={() => {b8.age=30}}>b8.age=30</button> </div>
  <div class="when"><button onclick={() => {a8.age=40}}>a8.age=40</button> </div>
  <div class="result">a8.username:{a8.username}</div>
  <div class="result">a8.age:{a8.age}</div>
  <div class="result">b8.username:{b8.username}</div>
  <div class="result">b8.age:{b8.age}</div>
</div>

<div class="testCase">
  <div class="subject"> 9.</div>
  <div class="when"><button onclick={() => {p9.username='changeName'}}>p9.p9.username='changeName'</button> </div>
  <div class="when"><button onclick={() => {p9.age=40}}>p9.age=40</button> </div>
  <div class="when"><button onclick={() => {d9={name:'tong',age:2}}}>d9를 통째로 업데이트 치면 state상태가 안되나?</button> </div>

  <div class="when"><button onclick={() => {d9.name='changeDogName'}}>d9.name='changeDogName'</button> </div>
  <div class="when"><button onclick={() => {d9.age=25}}>d9.age=25</button> </div>

  <div class="when"><button onclick={() => {d9.name='haha'}}>d9.name='changeDogName'</button> </div>
  <div class="when"><button onclick={() => {d9.age=10}}>d9.age=25</button> </div>
  <div class="result">p9.username:{p9.username}</div>
  <div class="result">p9.age:{p9.age}</div>
  <div class="result">d9.username:{d9.name}</div>
  <div class="result">d9.age:{d9.age}</div>
</div>

<div class="testCase">
  <div class="subject"> 10. derived.by로 배열 반환</div>
  <div class="when"><button onclick={a10push}>a10push</button> </div>
  {#each a10 as item}
    <div class="result"><h3>{item.username}:{item.age}</h3></div>
  {/each}
  <div>========B===============</div>
  {#each b10 as item(item)}
    <div class="result"><h3>{item.myName}:{item.myAge}</h3></div>
  {/each}
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