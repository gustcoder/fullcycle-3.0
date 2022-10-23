import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

// camarada que registra e notifica tudo o que acontece
export default interface EventDispatcherInterface {
    register(eventName: string, eventHandler: EventHandlerInterface): void;
    unregister(eventName: string, eventHandler: EventHandlerInterface): void;
    unregisterAll(): void;
    notify(event: EventInterface): void;
}
