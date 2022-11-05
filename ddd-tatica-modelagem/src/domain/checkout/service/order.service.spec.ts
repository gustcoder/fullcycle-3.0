import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("OrderService unit tests", () => {
    it("should calculate the total of orders", () => {
        const item1 = new OrderItem("1", "1", "Processador AMD A10 6970K", 600, 1);
        const item2 = new OrderItem("1", "2", "Headset Multilaser Warrior", 60, 1);
        const item3 = new OrderItem("1", "3", "Mouse Logitech G203", 120, 1);

        const order1 = new Order("1", "1", [item1, item2]);
        const order2 = new Order("2", "1", [item3]);

        const orders = [order1, order2];

        const total = OrderService.total(orders);

        expect(total).toBe(780);
    });

    it("should give points of reward to the customer", () => {
        const customer1 = new Customer("1", "The Customer");
        
        const item1 = new OrderItem("1", "1", "Processador AMD A10 6970K", 600, 1);
        const item2 = new OrderItem("1", "2", "Headset Multilaser Warrior", 60, 1);

        const items = [item1, item2];

        const order = OrderService.placeOrder(customer1, items);

        expect(customer1.rewardPoints).toBe(330);
        expect(order.total()).toBe(660);
    });   
});
