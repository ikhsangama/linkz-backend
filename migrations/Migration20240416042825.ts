import { Migration } from '@mikro-orm/migrations';

export class Migration20240416042825 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "created_at" timestamptz not null, add column "deleted_at" timestamptz null;');
    this.addSql('alter table "user" rename column "soft_delete" to "updated_at";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "created_at", drop column "deleted_at";');

    this.addSql('alter table "user" rename column "updated_at" to "soft_delete";');
  }

}
