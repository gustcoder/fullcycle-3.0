import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {

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

    async update(order: Order): Promise<void> {
        try {
            await OrderModel.update(
                {
                    customer_id: order.customerId,
                    items: order.items,
                    total: order.total()
                },
                {
                    where: {
                        id: order.id
                    },
                }
            );
        } catch (error) {
            throw new Error("Error updating order!");
        }
    }

    async find(orderId: string): Promise<Order | null> {
        try {
            const findOrder = await OrderModel.findOne({
                include: [{ model: OrderItemModel }],
                where: { 
                    id: orderId 
                },
                rejectOnEmpty: true
            });

            const items = findOrder.items.map((item) => {
                let newItem = new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity);

                return newItem;
            });

            const order = findOrder ? new Order(findOrder.id, findOrder.customer_id, items) : null;

            return order;
        } catch (error) {
            throw new Error("Error finding order!" + error);
        }
    }

    async findAll(): Promise<[] | Order[]> {
        const orders = await OrderModel.findAll(
            {
                include: [{ model: OrderItemModel }]
            }
        );
        
        var items: OrderItem[] = [];
        for (let o = 0; o < orders.length; o++) {
            for (let i = 0; i < orders[o].items.length; i++) {
                const item = new OrderItem(
                    orders[o].items[i].id, 
                    orders[o].items[i].product_id, 
                    orders[o].items[i].name, 
                    orders[o].items[i].price, 
                    orders[o].items[i].quantity
                );
                items.push(item);
            }
        }
        
        return orders.map((order) => new Order(order.id, order.customer_id, items));
    }
}
