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

function createOrder(): Order {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Gustavo Ramos");
    const customerAddress = new Address("Some street", 100, "Some");
    customer.address = customerAddress;
    
    customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Guitarra Tagima TW-55", 1000);
    productRepository.create(product1);

    const orderItem1 = new OrderItem("1", product1.id, product1.name, product1.price, 1);

    const order1 = new Order("1", customer.id, [orderItem1]);   

    return order1;
}

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
        const order1 = createOrder();

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
                    id: order1.items[0].id,
                    product_id: order1.items[0].productId,
                    name: order1.items[0].name,
                    order_id: order1.id,
                    price: order1.items[0].price,
                    quantity: order1.items[0].quantity
                }
            ]
        });
    });

    it("should update an existent order", async () => {
        const order1 = createOrder();

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);

        // creating a customer to update order        
        const customerRepository = new CustomerRepository();
        const customer2 = new Customer("2", "Teste da Silva");
        const customerAddress = new Address("Another street", 500, "Another");
        customer2.address = customerAddress;
        
        customerRepository.create(customer2);

        order1.customerId = customer2.id;

        await orderRepository.update(order1);

        const orderModel = await OrderModel.findOne({ 
            where: { 
                id: order1.id 
            },
            include: ["items"] 
        });

        expect(orderModel?.toJSON()).toStrictEqual({
            customer_id: "2",
            id: "1",
            total: order1.total(),
            items: [
                {
                    id: order1.items[0].id,
                    product_id: order1.items[0].productId,
                    name: order1.items[0].name,
                    order_id: order1.id,
                    price: order1.items[0].price,
                    quantity: order1.items[0].quantity
                }
            ]
        });
    });

    it("should find an order based on id", async () => {
        const order1 = createOrder();

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);

        const expectedOrder = await orderRepository.find(order1.id);

        expect(expectedOrder?.id).toBe("1");
        expect(expectedOrder?.customerId).toBe("1");
    });

    it("should throw an error when trying to find a non existent order id", async () => {
        expect(async () => {
            const orderRepository = new OrderRepository();    
            await orderRepository.find("999");
        }).rejects.toThrow('Error finding order!');
    });

    it("should return existent orders", async () => {
        const order1 = createOrder();

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        
        const foundOrders = await orderRepository.findAll();

        expect(foundOrders.length).toEqual(1);
        expect(foundOrders[0]?.id).toBe("1");
        expect(foundOrders[0]?.customerId).toBe("1");
        expect(foundOrders[0]?.total()).toBe(1000);
    });     

    it("should return empty when have no orders", async () => {
        const orderRepository = new OrderRepository();
        
        const expected = await orderRepository.findAll();

        expect(expected).toEqual([]);
    });    
});
