<script lang="ts">
	import ArrChild from "./ArrChild.svelte";
	import Bindable from "./Bindable.svelte";
import Component1 from "./Component1.svelte";
	import GrandParent from "./GrandParent.svelte";
	import MutateProps from "./MutateProps.svelte";
	import NoBindableProps from "./NoBindableProps.svelte";
	import UpdateProps from "./UpdateProps.svelte";

  // 1.props로 문자열을 전달한다. 없이도 가능하다
  let adjective:string = "cools"
  // 2. 부모 컴포넌트에서 props를 변경하면 자식 컴포넌트에서도 자동으로 업데이트된다. 
  let count2 = $state(0);
  // 3. 자식컴포넌트에서 props값을 직접 변경하면 반응형 상태(proxy)가 아닌 일반객체는 값이 갱신되지 않는다.
  let object3 = {count:0}
  // 4. 자식컴포넌트에서 반응형상태를 변경하면 경고발생( ownership_invalid_mutation)
  let object4 = $state({count:0})
  // 5. 기본값을 지정하면 ui업데이트안됨
  // 6. 양방향으로 데이터를 관리하려면 $bindable을 사용하자
  let message6 = $state('hello');
  // 7. ownership_invalid_binding
  let value7 = $state()
   // 8. 자식 컴포넌트에서 effect로 GET 호출하고 상위 컴포넌트에서 값변경 하면 무한루프
   let tmp8: TempArr = $state() as TempArr;
   let flag8:boolean = $state(false);
   const changeArr8 = () => {
    console.log('changeArr8');
    tmp8 = new TempArr();
   }

   class TempArr {
    arr: string[] = $state([]);
    constructor() {
      this.arr = []
    }
   }
</script>

<div class="testCase">
  <div class="subject">
    1.props로 문자열을 전달한다. 
    <br> - 기본값이 있으면 없어도된다. 
    <br> - 만약 네이밍이 예약어면 컴포넌트 내부에서 다른이름으로 쓸수있다.

  </div>
  <div class="component">
    <Component1 adjective="cool" a1="a1이다" c1="c1"/>
  </div>
  <div class="component">
    <Component1 adjective={adjective} super='super가 안에서는 trouper'/>
  </div>
</div>

<div class="testCase">
  <div class="subject">
    2. 부모 컴포넌트에서 props를 변경하면 자식 컴포넌트에서도 자동으로 업데이트된다. 
    <br>-자식 컴포넌트에서 재할당하면 일시적으로 자식 컴포넌트에서 상태만 변경되었다가 부모에서 변경하면 부모가 가지고있던값으로로
     자식까지 변경된다.
  </div>
  <div class="when">
    <button onclick={() => (count2 += 1)}>
      clicks (parent): {count2}
    </button>
  </div>
  <div class="component">
    <UpdateProps count={count2}/>
  </div>
</div>

<div class="testCase">
  <div class="subject">
    3. 자식컴포넌트에서 props값을 직접 변경하면 반응형 상태(proxy)가 아닌 일반객체는 값이 갱신되지 않는다.
  </div>
  <div class="when">
  </div>
  <div class="component">
    <MutateProps object={object3} />
  </div>
</div>

<div class="testCase">
  <div class="subject">
    4. 자식컴포넌트에서 반응형상태를 변경하면 경고발생
  </div>
  <div class="when">
  </div>
  <div class="component">
    <MutateProps object={object4} />
  </div>
</div>

<div class="testCase">
  <div class="subject">
    5. 부모컴포넌트에서 props를 넘기지 않고, 자식컴포넌트에 반응형 객체를 기본값으로 놓으면 ui 업데이트 되지않음
  </div>
  <div class="when">
  </div>
  <div class="component">
    <NoBindableProps/>
  </div>
</div>


<div class="testCase">
  <div class="subject">6. 양방향으로 데이터를 관리하려면 $bindable을 사용하자 </div>
  <div class="component">
    <div>Bindable bind:value={message6}</div>
    <Bindable bind:value={message6}/>
  </div>
  <div class="component">
    <div>Bindable value={message6}</div>
    <Bindable value={message6}/>
  </div>
  <div class="component">
    Bindable
    <Bindable/>
  </div>
  <div>
  <p>{message6}</p>
</div>
</div>


<div class="testCase">
  <div class="subject">7. 부모자식 간 값전달</div>
  <div class="when">
  </div>
  <div class="component">
    <GrandParent/>
  </div>
</div>

<div class="testCase">
  <div class="subject">8. 자식 컴포넌트에서 effect로 GET 호출하고 상위 컴포넌트에서 값변경 하면 무한루프</div>
  <div class="when">
    <button onclick={changeArr8}>assignArr8</button>
    <button onclick={() => {flag8 = true}}>flag8 = true</button>
    <button onclick={() => {flag8 = true}}>flag8.push</button>
  </div>
  <div class="component">
    {#if flag8}
    <ArrChild strArr = {tmp8.arr}/>
    {/if}
  </div>
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
  .component {
    border: 3px solid coral;
    margin: 5px 0px 5px 0px;
    padding: 5px 0px 5px 5px;
  }
</style>