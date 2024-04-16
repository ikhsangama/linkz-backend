import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {

    @PrimaryKey()
    uid!: string;

    @Property()
    latestLogin: Date = new Date();

    @Property({ nullable: false })
    createdAt: Date = new Date();

    @Property({ nullable: true })
    updatedAt?: Date;

    @Property({ nullable: true })
    deletedAt?: Date;
}