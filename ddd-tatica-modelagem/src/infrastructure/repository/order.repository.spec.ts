import { Sequelize } from 'sequelize-typescript';
import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/customer';
import Order from '../../domain/entity/order';
import OrderItem from '../../domain/entity/order_item';
import Product from '../../domain/entity/product';
import CustomerModel from '../db/sequelize/model/customer.model';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import OrderModel from '../db/sequelize/model/order.model';
import ProductModel from '../db/sequelize/model/product.model';
import CustomerRepository from './customer.repository';
import OrderRepository from './order.repository';
import ProductRepository from './product.repository';

describe("Customer Repository unit tests", () => {

    let sequelize:  Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        // informa ao sequelize que a Model existe
        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("1", "Gustavo Ramos");
        const customerAddress = new Address("Some street", 100, "Some");
        customer.address = customerAddress;
        
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("1", "Guitarra Tagima TW-55", 1000);
        await productRepository.create(product1);

        const orderItem1 = new OrderItem("1", product1.id, product1.name, product1.price, 1);

        const order1 = new Order("1", customer.id, [orderItem1]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);

        const orderModel = await OrderModel.findOne({ 
            where: { 
                id: order1.id 
            },
            include: ["items"] 
        });
        expect(orderModel?.toJSON()).toStrictEqual({
            customer_id: "1",
            id: "1",
            total: order1.total(),
            items: [
                {
                    id: orderItem1.id,
                    product_id: orderItem1.productId,
                    name: orderItem1.name,
                    order_id: order1.id,
                    price: orderItem1.price,
                    quantity: orderItem1.quantity
                }
            ]
        });
    });
});
