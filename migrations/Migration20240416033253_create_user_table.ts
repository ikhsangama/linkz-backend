import { Migration } from '@mikro-orm/migrations';

export class Migration20240416033253_create_user_table extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("uid" varchar(255) not null, "latest_login" timestamptz not null, "soft_delete" timestamptz null, constraint "user_pkey" primary key ("uid"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}
