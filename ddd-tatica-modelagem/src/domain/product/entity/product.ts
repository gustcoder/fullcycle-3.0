import ProductInterface from "./product-interface";

export default class Product implements ProductInterface {
    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name() { 
        return this._name; 
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    get price() {
        return this._price;
    }

    changePrice(price: number) {
        this._price = price;
        this.validate();
    }

    validate(): void {
        if (this._id.length === 0) {
            throw new Error('Product ID is required!');
        }
        if (this._name.length === 0) {
            throw new Error('Product name is required!');
        }
        // price pode ser zero, em casos de produto brinde etc
        if (this._price < 0) {
            throw new Error('Product price is invalid!');
        }
    }
}