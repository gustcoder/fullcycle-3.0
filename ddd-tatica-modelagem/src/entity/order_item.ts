export default class OrderItem {
    _id: string;
    _productId: string;
    _name: string;
    _price: number;
    _quantity: number;

    constructor(id: string, productId: string, name: string, price: number, quantity: number) {
        this._id = id;
        this._productId = productId;
        this._name = name;
        this._price = price;
        this._quantity = quantity;
    }

    get price(): number {
        return this._price;
    }

    get quantity(): number {
        return this._quantity;
    }
}