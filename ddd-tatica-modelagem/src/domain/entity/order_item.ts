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
        this.validate();
    }

    validate(): void {
        if (this._quantity <= 0) {
            throw new Error('Quantity must be greater than zero!');
        }
    }

    get id(): string {
        return this._id;
    }

    get productId(): string {
        return this._productId;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price * this._quantity;
    }

    get quantity(): number {
        return this._quantity;
    }
}
