import { uuid } from "uuidv4";
import OrderFactory from "./order.factory";

describe("Order Factory Tests", () => {
    it("should create a new order", () => {
        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    product: "Hyundai HB20s",
                    productId: uuid(),
                    quantity: 1,
                    price: 90000
                }
            ]
        }

        const order = OrderFactory.create(orderProps);

        expect(order.id).toBeDefined();
        expect(order.customerId).toEqual(orderProps.customerId);
        expect(order.items.length).toEqual(1);
    });
});
