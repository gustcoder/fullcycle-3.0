import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerAddressUpdatedEvent from "../customer-address-updated.event";

export default class CustomerAddressUpdatedEventHandler implements EventHandlerInterface<CustomerAddressUpdatedEvent> {
    handle(event: CustomerAddressUpdatedEvent): void {
        console.log(event.eventData.message);
    }
}
