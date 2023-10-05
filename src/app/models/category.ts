import {Item} from "./item";

export class Category {
  name!: string;
  description!: string;
  imageUrl!: string;
  items: Item[] = [];
  active: boolean = false;
}
