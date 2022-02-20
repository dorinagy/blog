import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';

@Entity()
export class Category {
  @PrimaryKey()
  id!: number;

  @Property({ unique: true })
  text!: string;
}
