/* 
diferencas entre NEGOCIO X PERSISTENCIA (model)

ter 2 estruturas onde:
    - entity/customer.ts: regras de negocio (dominio) / Complexidade de Negocio, obedecendo suas regras
    - model/customer.ts: getters/setters apenas para persistencia (fala com mundo externo) / Complexidade Acidental

*/

import EventDispatcher from "../../@shared/event/event-dispatcher";
import EventHandlerInterface from "../../@shared/event/event-handler.interface";
import CustomerAddressUpdatedEvent from "../event/customer-address-updated.event";
import CustomerCreatedEvent from "../event/customer-created.event";
import CustomerAddressUpdatedEventHandler from "../event/handler/customer-address-updated.handler";
import FirstCustomerCreatedEventHandler from "../event/handler/first-customer-created-event.handler";
import SecondCustomerCreatedEventHandler from "../event/handler/second-customer-created-event.handler";
import Address from "../value-object/address";


export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address; // inicializacao nao obrigatoria com "!"
    private _active: boolean = false;
    private _rewardPoints: number = 0;
    private _eventDispatcher: EventDispatcher;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this._eventDispatcher = new EventDispatcher();
        this.validate();
        this.triggerCreateEvents();
    }

    validate() {        
        if (this._id.length === 0) {
            throw new Error("Id is required!");
        }

        if (this._name.length === 0) {
            throw new Error("Name is required!");
        }
    }

    triggerCreateEvents() {
        const customerFirstEventHandler = new FirstCustomerCreatedEventHandler();
        const customerSecondEventHandler = new SecondCustomerCreatedEventHandler();

        this._eventDispatcher.register("CustomerCreatedEvent", customerFirstEventHandler);
        this._eventDispatcher.register("CustomerCreatedEvent", customerSecondEventHandler);

        const firstEventData = {
            message: "Esse é o primeiro console.log do evento: CustomerCreated"
        };
        const firstEventCustomerCreated = new CustomerCreatedEvent(firstEventData);        
        this._eventDispatcher.notify(firstEventCustomerCreated);

        const secondEventData = {
            message: "Esse é o segundo console.log do evento: CustomerCreated"
        };
        const secondEventCustomerCreated = new CustomerCreatedEvent(secondEventData);        
        this._eventDispatcher.notify(secondEventCustomerCreated);   
    }

    get customerCreatedEventHandlers(): EventHandlerInterface[] {
        return this._eventDispatcher.getEventHandlers("CustomerCreatedEvent");
    }

    get customerAddressUpdatedEventHandlers(): EventHandlerInterface[] {
        return this._eventDispatcher.getEventHandlers("CustomerAddressUpdatedEvent");
    }       

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get name(): string {
        return this._name;
    }

    // nao possui expressividade, está aqui por estar/apenas permitir mudanca
    set name(name: string) {
        this._name = name;
        this.validate(); // garantir a consistencia da entidade
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    addRewardPoints(rewardPoints: number) {
        this._rewardPoints += rewardPoints;
    }    

    // aqui expressa uma intencao/pode conter regra de negocio (semantica faz a diferenca mesmo o resultado sendo o mesmo)
    changeName(name: string) {
        this._name = name;
        this.validate(); // garantir a consistencia da entidade
    }

    get address() {
        return this._address;
    }    

    changeAddress(address: Address) {
        this._address = address;
        const customerAddressUpdatedEventHandler = new CustomerAddressUpdatedEventHandler();
        this._eventDispatcher.register("CustomerAddressUpdatedEvent", customerAddressUpdatedEventHandler);

        const customerAddressUpdatedEventData = {
            message: `Endereço do cliente: ${this._id}, ${this._name} alterado para: ${this._address}`
        };
        const customerAddressUpdated = new CustomerAddressUpdatedEvent(customerAddressUpdatedEventData);        
        this._eventDispatcher.notify(customerAddressUpdated);        
    }

    // exemplo de expressar a regra, ao inves de apenas usar "getters x setters"
    activateCustomer() {
        // garantindo consistencia
        if (this._address === undefined) {
            throw new Error("Address is required to activate customer!")
        }
        this._active = true;
    }

    deactivateCustomer() {
        this._active = false;
    }

    isActive (): boolean {
        return this._active;
    }
}
