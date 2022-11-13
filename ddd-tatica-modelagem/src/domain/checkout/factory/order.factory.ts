import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface OrderFactoryProps {
    id: string;
    customerId: string;
    items: {
        id: string;
        product: string;
        productId: string;
        quantity: number;
        price: number;
    }[];
}

export default class OrderFactory {
    public static create(props: OrderFactoryProps): Order {
        const items = props.items.map((item) => {
            return new OrderItem(
                item.id,
                item.productId,
                item.product,
                item.price,
                item.quantity
            );
        }) 

        return new Order(props.id, props.customerId, items);
    }
}
