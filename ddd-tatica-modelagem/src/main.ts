import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";
import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/value-object/address";
import Product from "./domain/product/entity/product";

let customer = new Customer("1", "Gustavo Ramos");
const address = new Address("Rua Teste", 999, "Bairro Teste");

customer.changeAddress(address);
customer.activateCustomer();

let product1 = new Product("1", "Console Sony Playstation 4", 3150);
let product2 = new Product("2", "Controle DualShock 4 Branco Glacial", 267.90);
let product3 = new Product("3", "The Witcher 3 Complete Edition", 41.90);

let item1 = new OrderItem("1", product1.id, product1.name, product1.price, 1);
let item2 = new OrderItem("2", product2.id, product2.name, product3.price, 1);
let item3 = new OrderItem("3", product2.id, product2.name, product3.price, 1);

let orderItems = [item1, item2, item3];

let order = new Order("1", "1", orderItems);
