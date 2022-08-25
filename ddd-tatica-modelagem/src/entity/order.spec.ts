import Order from "./order";
import OrderItem from "./order_item";

describe("Order Unit Tests", () => {
    it("should test the order class", () => {
        const items = new OrderItem("1", "Teclado Casiotone CT-S200", 899);
        const order = new Order("1", "1", [items]);

        expect(order).toBeInstanceOf(Order);
    });

    it("should throw an error if id is empty", () => {
        expect(() => {
            const items = new OrderItem("1", "Teclado Casiotone CT-S200", 899);
            const order = new Order("", "1", [items]);
        })
        .toThrowError("Order ID is required!");
    });

    it("should throw an error if customer id is empty", () => {
        expect(() => {
            const items = new OrderItem("1", "Teclado Casiotone CT-S200", 899);
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
        const item1 = new OrderItem("1", "Teclado Casiotone CT-S200", 900);
        const item2 = new OrderItem("2", "Capa para teclado", 100);
        const item3 = new OrderItem("3", "2x Palhetas Dunlop 1.14mm", 10);
        const order = new Order("1", "1", [item1, item2, item3]);

        expect(order.total()).toBe(1010);
    });
});