export default class Address {
    private _street: string = "";
    private _number: number = 0;
    private _neighborhood: string = "";

    constructor (street: string, number: number, neighborhood: string) {
        this._street = street;
        this._number = number;
        this._neighborhood = neighborhood;

        this.validate();
    }

    validate () {
        if (this._street.length === 0) {
            throw new Error("Street is required!");
        }
        if (this._number < 0) {
            throw new Error("Number must be greater than 0!");
        }
        if (this._neighborhood.length === 0) {
            throw new Error("Neighborhood is required!");
        }
    }

    get street () {
        return this._street;
    }

    get number () {
        return this._number;
    }

    get neighborhood () {
        return this._neighborhood;
    }    

    toString () {
        return `${this._street}, ${this._number} - ${this._neighborhood}`;
    }
}