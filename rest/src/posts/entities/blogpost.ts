import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class BlogPost {
    @PrimaryKey()
    id!: number;

    @Property()
    title?: string;
}
