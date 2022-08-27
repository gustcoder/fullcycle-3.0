import Order from "./order";
import OrderItem from "./order_item";
import Product from "./product";

describe("Order Unit Tests", () => {
    it("should test the order class", () => {
        const product = new Product("1", "Teclado Casiotone CT-S200", 899);
        const items = new OrderItem("1", product.id, product.name, product.price, 1);
        const order = new Order("1", "1", [items]);

        expect(order).toBeInstanceOf(Order);
    });

    it("should throw an error if id is empty", () => {
        expect(() => {
            const product = new Product("1", "Teclado Casiotone CT-S200", 899);
            const items = new OrderItem("", product.id, product.name, product.price, 1);
            const order = new Order("", "1", [items]);
        })
        .toThrowError("Order ID is required!");
    });

    it("should throw an error if customer id is empty", () => {
        expect(() => {
            const product = new Product("1", "Teclado Casiotone CT-S200", 899);
            const items = new OrderItem("1", product.id, product.name, product.price, 1);
            const order = new Order("1", "", [items]);
        })
        .toThrowError("Customer ID is required!");
    });

    it("should throw an error if items is empty", () => {
        expect(() => {
            const order = new Order("1", "1", []);
        })
        .toThrowError("Items must not be empty");
    });

    it("should test return of total", () => {
        const product1 = new Product("1", "Teclado Casiotone CT-S200", 900);
        const product2 = new Product("2", "Capa para teclado", 100);
        const product3 = new Product("3", "Palheta Dunlop 1.14mm", 5);

        const item1 = new OrderItem("1", product1.id, product1.name, product1.price, 1);
        const item2 = new OrderItem("2", product2.id, product2.name, product2.price, 1);
        const item3 = new OrderItem("3", product3.id, product3.name, product3.price, 2);

        const order = new Order("1", "1", [item1, item2, item3]);

        expect(order.total()).toBe(1010);
    });
});