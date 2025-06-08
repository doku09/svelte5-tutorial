export class Car {
    fuel:number = $state(0);
    shouldRefuel = $derived(this.fuel<50);
    refuel() {
        this.fuel = 100
    }

    drive(distance:number) {
        this.fuel = this.fuel - distance;
    }
}


export const carObj = $state({
  reloadKey: 0
});

export const reloadAppClWorkTree = () => {
  carObj.reloadKey++;
};