import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

    getEventHandlers(eventName: string): EventHandlerInterface[] {
        return this.eventHandlers[eventName];
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        if(!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        if(this.eventHandlers[eventName].length !== 0) {
            delete this.eventHandlers[eventName];
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};    
    }

    notify(event: EventInterface): void {
    }    
}
