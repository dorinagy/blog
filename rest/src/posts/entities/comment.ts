import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import { User } from '../../users/entities/user';
import { BlogPost } from './blogpost';

@Entity()
export class Comment {
    @PrimaryKey()
    id!: number;

    @Property()
    text!: string;

    @Property({ onCreate: () => new Date() })
    createdAt!: Date;

    @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
    updatedAt!: Date;

    @ManyToOne(() => BlogPost)
    blogPost!: BlogPost;

    @ManyToOne(() => User)
    user!: User;
}
