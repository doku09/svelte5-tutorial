<script lang="ts">
  // let props = $props();

  // interface Props {
  //   adjective:string;
  // super:string;
  // a1:string;
  // others:any;
  // }

  let {
    adjective = '',
  super: trouper = 'lights are gonna find me',  //renaming할수있음
  a1 = '없음',
  ...others //restProps
  }:{adjective:string;a1?:string;super:string;} = $props();

</script>

<p>this component is {adjective}</p>
<p>value: {trouper}</p>
<p>abc: a1:{a1}, b1:{others.b1}, c1:{others.c1}</p>