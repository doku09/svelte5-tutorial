<script lang="ts">
  import AComp from "./AComp.svelte";
  import { carObj, reloadAppClWorkTree } from "./Car.svelte";

// 1. $state를 사용하지 않으면 html에 그린 변수가 반응하지 않는다.
let a1 = 0;
// 2. $state를 사용해도 변수가 반응한다.
let a2 = $state(0);
// 3. 객체의 속성을 일부 변경해도 UI 요소들이 변경된다.
let user3 = $state({
  name:'dong',
  age:20
})
// 4. 배열을 재할당하지 않아도 반응성이 유지됨(push()를 사용해도 반응함)
let strArr4 = $state([1,2,3]);
let ele4 = 4

// 5. 배열을 재할당해도 반응성이 유지됨
let strArr5 = $state([1,2,3]);
let ele5 = 4

// 6. $state.raw로 선언된 상태는 4와 같이 재할당이 이뤄져야 반응성을 탄다.
let user6 = $state.raw({
  name:'dong',
  age:20
});

let strArr6 = $state.raw([1,2,3]);
let ele6 = 4


// 7. 스냅샷
let counter = $state({ count: 0 });
// 8. 값에의한 전달?
function add8(a: number, b: number) {
	return a + b;
}
let a8 = 1;
let b8 = 2;
let total = add8(a8, b8);
console.log(total); // 3

a8 = 3;
b8 = 4;
console.log(total); // 당연히 3임.

function add9(getA: () => number,getB: () => number) {
  return () => getA() + getB();
}
let as = 1;
let bs = 2;
let total9 = add9(() => as, () => bs);
console.log(total9()); // 3

as = 3;
bs = 4;
console.log(total9()); // 3

// 9 .
class Person {
  name: string = $state('dong');
  constructor(name: string) {
    this.name = name;
  }
}
let person = $state(new Person('dong'));

// 10.



//
</script>

<div class="testCase">
<div class="subject">1. $state를 사용하지 않으면 DOM에 그려진 변수가 반응은 한다. (컴포넌트안에 state로 선언된 변수가 있으면 동작하지 않는다. 2번 테스트를 주석처리하면 동작함)</div>
<button onclick={() => {a1++;}}>a1++</button>
a1 = {a1}
{#if a1>0}
  {a1}
{/if}
</div>

<div class="testCase">
  <div class="subject">2. $state를 사용해도 변수가 반응한다.</div>
  <div class="when"><button onclick={() => {a2++;}}>a2++</button> </div>
  <div class="result">a2 = {a2} </div>
</div>

<div class="testCase">
  <div class="subject">3. 객체의 속성을 일부 변경해도 UI 요소들이 변경된다. </div>
  <div class="when"><button onclick={() => {user3.name = 'yussi'}}>name을 dong에서 yussi로</button> </div>
  <div class="when"><button onclick={() => {user3.age--}}>age 20에서 -1씩</button> </div>
  <div class="result">user3.name = {user3.name} , user3.age = {user3.age}</div>
</div>

<div class="testCase">
  <div class="subject">4. 배열을 재할당하지 않아도 반응성이 유지됨(push()를 사용해도 반응함) </div>
  <div class="when"><button onclick={() => {strArr4.push(ele4);ele4++;}}>배열에 문자더하기</button> </div>
  <div class="result">{strArr4}</div>
</div>

<div class="testCase">
  <div class="subject">5. 배열을 재할당해도 반응성이 유지됨 </div>
  <div class="when"><button onclick={() => {strArr5 = [...strArr5,ele5];ele5++;}}>배열에 문자더하기</button> </div>
  <div class="result">{strArr5}</div>
</div>


<div class="testCase">
  <div class="subject">6. $state.raw로 선언된 상태는 4와 같이 재할당이 이뤄져야 반응성을 탄다.</div>
  <div class="when"><button onclick={() => {user6.name = 'sosom'}}>user6.name = 'sosom'</button> </div>
  <div class="when"><button onclick={() => {user6.age--;}}>user6.age--</button> </div>
  <div class="when"><button onclick={() => {strArr6.push(ele6);ele6++}}>strArr6.push(ele6)</button> </div>
  // 재할당
  <div class="when"><button onclick={() => {user6 = {name:'sosomes',age:18}}}>user6 = user6</button> </div>
  <div class="when"><button onclick={() => {strArr6 = [...strArr6,ele6];ele6++;}}>strArr6 =strArr6 </button> </div>
    <div class="result">user6.name = {user6.name}</div>
    <div class="result"> user6.age={user6.age}</div>
    <div class="result"> strArr6={strArr6}</div>
    <div class="result"> strArr6={strArr6}</div>
</div>

<div class="testCase">
  <div class="subject">7. 스냅샷(기본적으로 스벨트가 프록시상태로 관리하기 때문에 깊은복사나 api요청을 보낼때는 snapshot을 사용하여 일반객체로 전환해야한다.)</div>
  <div class="when"><button onclick={() => {console.log($state.snapshot(counter));console.log(counter)}}>count 스냅샷 콘솔확인</button> </div>
  <div class="result">{$state.snapshot(counter)}</div>
  <div class="result">{counter}</div>
</div>

<div class="testCase">
  <div class="subject">8. 값에의한 전달?</div>
  <div class="result">스크립트 태그확인</div>
</div>

<div class="testCase">
  <div class="subject"> 9. 클래스는 생성시 state를 걸어야 재할당시 반응성을 탄다. </div>
  <div class="when"><button onclick={() => {
    person = new Person('yussi');
  }}>person.name변경</button> </div>
  <div class="result">person.name: {person.name}</div>
</div>

<div class="testCase">
  <div class="subject"> 10. 클래스 내부 상수는 반응성을 가진다. </div>
  <div class="when"><button onclick={() => {
    reloadAppClWorkTree();
  }}>person.name변경</button> </div>
  <div class="result">carObj.reloadKey: {carObj.reloadKey}</div>
  <AComp/>
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