<script lang="ts">
    import { afterNavigate, beforeNavigate, goto } from "$app/navigation";
    import { page } from "$app/state";

    let srchParams = $state(new URLSearchParams(page.url.search));

    beforeNavigate((e) => {
        if (e.type === 'popstate') {
            const id = new URLSearchParams(e.to?.url.search).get('worStatusListParam') as string;
        }
    });

    afterNavigate((e) => {
        if (e.type === 'popstate') {
            const id = new URLSearchParams(e.to?.url.search).get('worStatusListParam') as string;
        }
    });


    export const mergeToQueryString = (urlSearchParam: URLSearchParams, params: Record<string, unknown>): string => {

        const query = new URLSearchParams(urlSearchParam);

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
            let v: string;
            if (value instanceof Date) {
                v = value.toISOString();
            } else if (typeof value === 'object') {
                v = JSON.stringify(value);
            } else {
                v = String(value);
            }
            // 값이 빈문자열일 경우, 기존의 쿼리스트링에서 삭제한다.
            if (v) query.set(key, encodeURIComponent(v));
            else query.delete(key);
            }
        });

  return query.toString();
};

</script>

<h1>Navigate</h1>
<div><button onclick={() => {goto('/tutorial')}}>tutorial</button></div>
<div><button onclick={() => {goto('/lecture')}}>lecture</button></div>
<div><button onclick={() => {goto('/navigate')}}>navigate</button></div>
<div><button onclick={() => {window.location.href = 'https://www.naver.com'}}>네이버로 이동</button></div>

<div>
<button onclick={() => {goto('.')}}>goto('.')</button>
<button onclick={() => {goto('./')}}>goto('./')</button>
<button onclick={() => {goto('/')}}>goto('/')</button>
<button onclick={() => {goto('')}}>goto('')</button>
<button onclick={() => {goto('?')}}>goto('?')</button>
</div>
<div>
<button onclick={() => {
    const query = new URLSearchParams();
    query.set('a', '1');

    goto(`?${mergeToQueryString(new URLSearchParams(page.url.searchParams), {'a': '1'})}`);
    
    }}>a,1
</button>

<button onclick={() => {
    goto(`?${mergeToQueryString(new URLSearchParams(page.url.searchParams), {'b': '2'})}`);
    
    }}>b,2
</button>

<button onclick={() => {
    const query = new URLSearchParams(page.url.search);
    query.set('d', '4');

    goto(`?${query.toString()}`);
    
    }}>d,4URLSearchParams(page.url.search)
</button>

<button onclick={() => {
    const query = new URLSearchParams(page.url.searchParams);
    query.set('e', '5');

    goto(`?${query.toString()}`);
    
    }}>e,5
</button>

<button onclick={() => {
    
    srchParams.set('f', '6');

    goto(`?${srchParams.toString()}`);
    
    }}>f,6
</button>

<button onclick={() => {
    const query = new URLSearchParams();
    query.set('c', '3');

    goto(`?${query.toString()}`);
    
    }}>c,3
</button>



</div>
<div>
    <h2>Page Information</h2>
    <div>Page URL: {page.url.toString()}</div>
    <div>Page URL Pathname: {page.url.pathname}</div>
    <div>Page URL Search: {page.url.search}</div>
    <div>Page URL Hash: {page.url.hash}</div>
    <div>Page Route ID: {page.route.id}</div>
    <div>Page Params: {JSON.stringify(page.params)}</div>
    <div>Page Route: {JSON.stringify(page.route)}</div>
    <div>Page Status: {page.status}</div>
    <div>Page Error: {page.error}</div>
    <div>Page Search Params: {JSON.stringify([...page.url.searchParams.entries()])}</div>
</div>

<div>
    <h2>Search Parameters</h2>
    {#each [...srchParams.entries()] as [key, value]}
        <div>Key: {key}, Value: {value}</div>
    {/each}
</div>