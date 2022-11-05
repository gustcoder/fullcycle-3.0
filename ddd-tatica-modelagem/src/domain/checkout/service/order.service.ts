import Order from "../entity/order";
import { v4 as uuid } from "uuid";
import Customer from "../../customer/entity/customer";
import OrderItem from "../entity/order_item";

export default class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.total(), 0);
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        const order = new Order(uuid(), customer.id, items);
        const orderTotal = order.total();

        const rewardPoints = Math.ceil(orderTotal / 2);
        customer.addRewardPoints(rewardPoints);

        return order;
    }
}
