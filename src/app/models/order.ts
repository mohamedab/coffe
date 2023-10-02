import {Item} from "./item";

export class Order {
  orderId!: string;        // Unique ID for the order
  orderDate!: Date;        // Timestamp (you can use JavaScript Date object)
  items: Item[] = [];     // Array of ordered items with quantity and ingredients
  totalAmount!: number;    // Total cost of the order
  status!: string;         // Order status ("Pending," "In Progress," "Delivered," etc.)
  serverId!: string;     // Name of the server
  clientName!: string;     // Name of the client
}
