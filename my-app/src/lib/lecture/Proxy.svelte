<script lang="ts">

	const target = {
		firstName: 'Ali',
		lastName: 'Alaa',
		occupations: [],
		get fullName() {
			return `${this.firstName} ${this.lastName}`;
		},
		set occupation(value: string) {
			console.log(`Adding ${value} to occupations`);
			this.occupations.push(value);
		}
	};

    // target.occupation = 'W 

	const handler = {
        get(target, prop) {
            console.log(target, prop);
            return prop in target ? target[prop] : 'NO';
        },
        set(target,prop,value) {
            console.log(`SEtting: ${prop} = ${value}`);
            target[prop] = value;
            return true;
        }
    }
	
    const proxy = new Proxy(target,handler);
    console.log(proxy.firstNamsse);
</script>

<!-- <style>
	:global {
		body {
			background-color: #222;
		}
	} -->
<!-- </style> -->