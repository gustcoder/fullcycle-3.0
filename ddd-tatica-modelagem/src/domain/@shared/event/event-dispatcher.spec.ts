import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Event Dispatcher Testes", () => {
    it("should register an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);
    });

    it("should unregister an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")[0]).toMatchObject(eventHandler);
        
        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeUndefined();
    });

    it("should unregister all events handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.register("AnotherProductCreatedEvent", eventHandler);        
        eventDispatcher.register("OneMoreProductCreatedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent").length).toBe(1);
        
        expect(eventDispatcher.getEventHandlers("AnotherProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("AnotherProductCreatedEvent").length).toBe(1);
        
        expect(eventDispatcher.getEventHandlers("OneMoreProductCreatedEvent")).toBeDefined();
        expect(eventDispatcher.getEventHandlers("OneMoreProductCreatedEvent").length).toBe(1);

        eventDispatcher.unregisterAll();
        
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeUndefined();
        expect(eventDispatcher.getEventHandlers("AnotherProductCreatedEvent")).toBeUndefined();
        expect(eventDispatcher.getEventHandlers("OneMoreProductCreatedEvent")).toBeUndefined();
    });
    
    it("should notify an event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers("ProductCreatedEvent")).toBeDefined();

        const productCreatedEvent = new ProductCreatedEvent({
            name: "New Product",
            description: "This is a new product created",
            price: 1000,
            email: "customer@example.com"
        });

        eventDispatcher.notify(productCreatedEvent);

        // quando o evento notify é executado, o método handle deve ser chamado
        expect(spyEventHandler).toBeCalled();
    });
})
