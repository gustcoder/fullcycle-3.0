import EventInterface from "./event.interface";

// handler é o camarada que executa uma açao quando um evento é chamado
export default interface EventHandlerInterface<T extends EventInterface = EventInterface> {
    handle(event: T): void;
}
