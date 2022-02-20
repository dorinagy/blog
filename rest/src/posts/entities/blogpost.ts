import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { User } from '../../users/entities/user';
import { Category } from '../../categories/entities/category';
import { Comment } from './comment';

@Entity()
export class BlogPost {
    @PrimaryKey()
    id!: number;

    @Property()
    title!: string;

    @Property()
    text!: string;

    @Property({ onCreate: () => new Date() })
    createdAt!: Date;

    @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
    updatedAt!: Date;

    @OneToMany(() => Comment, (comment) => comment.blogPost)
    comments = new Collection<Comment>(this);

    @ManyToMany(() => Category, (category) => category.blogPosts)
    categories = new Collection<Category>(this);

    @ManyToOne(() => User)
    user!: User;
}
