import Order from "../../domain/entity/order";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository {

    async create(order: Order): Promise<void> {
        try {
            await OrderModel.create(
                {
                    id: order.id,
                    customer_id: order.customerId,
                    items: order.items.map((item) => ({
                        id: item.id,
                        product_id: item.productId,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                    })),
                    total: order.total()
                },
                {
                    include: [{ model: OrderItemModel }]
                }
            );
        } catch (error) {
            throw new Error("Error creating order!" + error);
        }
    }
}
