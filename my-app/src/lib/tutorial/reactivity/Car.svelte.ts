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