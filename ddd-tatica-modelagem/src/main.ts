import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("1", "Gustavo Ramos");
const address = new Address("Rua Teste", 999, "Bairro Teste");

customer.address = address;
customer.activateCustomer();

let item1 = new OrderItem("1", "Console Sony Playstation 4", 3150);
let item2 = new OrderItem("2", "Controle DualShock 4 Branco Glacial", 267.90);
let item3 = new OrderItem("3", "The Witcher 3 Complete Edition", 41.90);

let orderItems = [item1, item2, item3];

let order = new Order("1", "1", orderItems);
