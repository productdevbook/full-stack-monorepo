import { Migration } from '@mikro-orm/migrations';

export class Migration20220727153303 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "subject" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "name" varchar(200) not null);');
    this.addSql('create index "subject_created_at_index" on "subject" ("created_at");');
    this.addSql('alter table "subject" add constraint "subject_name_unique" unique ("name");');
    this.addSql('alter table "subject" add constraint "subject_pkey" primary key ("id");');

    this.addSql('create table "site_theme" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "name" varchar(200) not null, "code" varchar(200) not null default \'t\');');
    this.addSql('create index "site_theme_created_at_index" on "site_theme" ("created_at");');
    this.addSql('alter table "site_theme" add constraint "site_theme_name_unique" unique ("name");');
    this.addSql('alter table "site_theme" add constraint "site_theme_pkey" primary key ("id");');

    this.addSql('create table "site_language" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "name" varchar(200) not null, "name_en" varchar(200) null, "code" varchar(200) not null);');
    this.addSql('create index "site_language_created_at_index" on "site_language" ("created_at");');
    this.addSql('alter table "site_language" add constraint "site_language_name_unique" unique ("name");');
    this.addSql('alter table "site_language" add constraint "site_language_pkey" primary key ("id");');

    this.addSql('create table "role" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "name" varchar(200) not null, "description" varchar(200) not null);');
    this.addSql('create index "role_created_at_index" on "role" ("created_at");');
    this.addSql('alter table "role" add constraint "role_name_unique" unique ("name");');
    this.addSql('alter table "role" add constraint "role_pkey" primary key ("id");');

    this.addSql('create table "permission" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "subject_id" uuid null, "action" text check ("action" in (\'manage\', \'create\', \'read\', \'update\', \'delete\')) not null);');
    this.addSql('create index "permission_created_at_index" on "permission" ("created_at");');
    this.addSql('alter table "permission" add constraint "permission_pkey" primary key ("id");');

    this.addSql('create table "permission_roles" ("permission_id" uuid not null, "role_id" uuid not null);');
    this.addSql('alter table "permission_roles" add constraint "permission_roles_pkey" primary key ("permission_id", "role_id");');

    this.addSql('create table "page" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "name" varchar(200) not null, "url" varchar(200) not null, "is_public" boolean not null default false, "is_sql" boolean not null default false, "is_organization" boolean not null default false, "sql" text null, "columns" text null);');
    this.addSql('create index "page_created_at_index" on "page" ("created_at");');
    this.addSql('alter table "page" add constraint "page_name_unique" unique ("name");');
    this.addSql('alter table "page" add constraint "page_pkey" primary key ("id");');

    this.addSql('create table "menu" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "name" varchar(200) not null, "icon" varchar(200) not null, "order" int not null default 0, "is_active" boolean not null default false, "parent_menu_id" uuid null);');
    this.addSql('create index "menu_created_at_index" on "menu" ("created_at");');
    this.addSql('alter table "menu" add constraint "menu_name_unique" unique ("name");');
    this.addSql('alter table "menu" add constraint "menu_pkey" primary key ("id");');

    this.addSql('create table "pageMenu" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "menu_id" uuid null, "page_id" uuid null);');
    this.addSql('create index "pageMenu_created_at_index" on "pageMenu" ("created_at");');
    this.addSql('alter table "pageMenu" add constraint "pageMenu_pkey" primary key ("id");');

    this.addSql('create table "pageMenuRole" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "page_menu_id" uuid null, "role_id" uuid null);');
    this.addSql('create index "pageMenuRole_created_at_index" on "pageMenuRole" ("created_at");');
    this.addSql('alter table "pageMenuRole" add constraint "pageMenuRole_page_menu_id_role_id_unique" unique ("page_menu_id", "role_id");');
    this.addSql('alter table "pageMenuRole" add constraint "pageMenuRole_pkey" primary key ("id");');

    this.addSql('create table "currency" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "name" varchar(200) not null, "code" varchar(200) not null);');
    this.addSql('create index "currency_created_at_index" on "currency" ("created_at");');
    this.addSql('alter table "currency" add constraint "currency_name_unique" unique ("name");');
    this.addSql('alter table "currency" add constraint "currency_pkey" primary key ("id");');

    this.addSql('create table "country" ("id" serial primary key, "name" varchar(200) null, "iso3" varchar(200) null, "iso2" varchar(200) null, "numeric_code" varchar(200) null, "phone_code" varchar(200) null, "capital" varchar(200) null, "currency" varchar(200) null, "currency_name" varchar(200) null, "currency_symbol" varchar(200) null, "tld" varchar(100) null, "native" varchar(200) null, "region" varchar(200) null, "sub_region" varchar(200) null, "time_zones" varchar(20000) null, "latitude" varchar(200) null, "longitude" varchar(200) null, "emoji" varchar(200) null, "emoji_u" varchar(200) null);');
    this.addSql('alter table "country" add constraint "country_name_unique" unique ("name");');

    this.addSql('create table "state" ("id" serial primary key, "name" varchar(200) not null, "country_code" varchar(200) not null, "country_name" varchar(200) not null, "state_code" varchar(200) not null, "type" varchar(200) null, "latitude" varchar(200) not null, "longitude" varchar(200) not null, "country_id" int not null);');

    this.addSql('create table "city" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "name" varchar(200) not null, "country_id" int null);');
    this.addSql('create index "city_created_at_index" on "city" ("created_at");');
    this.addSql('alter table "city" add constraint "city_name_country_id_unique" unique ("name", "country_id");');
    this.addSql('alter table "city" add constraint "city_pkey" primary key ("id");');

    this.addSql('create table "user" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "provider_account_id" varchar(255) null, "username" varchar(255) not null, "name" varchar(255) not null, "email" varchar(255) not null, "email_verified" timestamptz(0) null, "password" varchar(255) not null, "password_salt" varchar(255) not null, "display_name" varchar(255) not null, "image" varchar(255) null, "is_terms_accepted" boolean not null default false, "last_login_at" bigint null default null, "last_login_ip" varchar(255) null default null, "user_setting_id" uuid null);');
    this.addSql('comment on column "user"."last_login_at" is \'last login time\';');
    this.addSql('comment on column "user"."last_login_ip" is \'Last login IP\';');
    this.addSql('create index "user_created_at_index" on "user" ("created_at");');
    this.addSql('alter table "user" add constraint "user_provider_account_id_unique" unique ("provider_account_id");');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_user_setting_id_unique" unique ("user_setting_id");');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');

    this.addSql('create table "notification_token" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "token" varchar(200) not null, "device_id" varchar(500) not null, "created_by_id" uuid not null);');
    this.addSql('create index "notification_token_created_at_index" on "notification_token" ("created_at");');
    this.addSql('alter table "notification_token" add constraint "notification_token_token_unique" unique ("token");');
    this.addSql('alter table "notification_token" add constraint "notification_token_pkey" primary key ("id");');

    this.addSql('create table "user_device" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "fingerprint" varchar(255) not null, "token" varchar(255) null, "name" varchar(255) not null, "type" varchar(255) not null, "user_agent" jsonb not null, "last_login_at" bigint null, "last_login_ip" varchar(255) null, "first_login_at" bigint null, "first_login_ip" varchar(255) null, "user_id" uuid not null);');
    this.addSql('comment on column "user_device"."fingerprint" is \'device fingerprint\';');
    this.addSql('comment on column "user_device"."token" is \'login token jit\';');
    this.addSql('comment on column "user_device"."name" is \'device name\';');
    this.addSql('comment on column "user_device"."type" is \'Equipment type\';');
    this.addSql('comment on column "user_device"."user_agent" is \'device UA\';');
    this.addSql('comment on column "user_device"."last_login_at" is \'last login time\';');
    this.addSql('comment on column "user_device"."last_login_ip" is \'Last login IP\';');
    this.addSql('comment on column "user_device"."first_login_at" is \'Device first login time\';');
    this.addSql('comment on column "user_device"."first_login_ip" is \'Device first login IP\';');
    this.addSql('create index "user_device_created_at_index" on "user_device" ("created_at");');
    this.addSql('alter table "user_device" add constraint "user_device_pkey" primary key ("id");');

    this.addSql('create table "userRole" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "role_id" uuid not null, "user_id" uuid not null);');
    this.addSql('create index "userRole_created_at_index" on "userRole" ("created_at");');
    this.addSql('alter table "userRole" add constraint "userRole_role_id_user_id_unique" unique ("role_id", "user_id");');
    this.addSql('alter table "userRole" add constraint "userRole_pkey" primary key ("id");');

    this.addSql('create table "user_setting" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) null, "updated_at" timestamptz(0) null, "deleted_at" timestamptz(0) null, "deleted" boolean null default false, "hidden" boolean null default false, "disabled" boolean null default false, "archived" boolean null default false, "timezone" varchar(200) null, "user_id" uuid not null, "site_language_id" uuid null, "site_theme_id" uuid null, "country_id" int null, "city_id" uuid null, "currency_id" uuid null, "state_id" int null);');
    this.addSql('create index "user_setting_created_at_index" on "user_setting" ("created_at");');
    this.addSql('alter table "user_setting" add constraint "user_setting_user_id_unique" unique ("user_id");');
    this.addSql('alter table "user_setting" add constraint "user_setting_pkey" primary key ("id");');

    this.addSql('create table "role_users" ("role_id" uuid not null, "user_id" uuid not null);');
    this.addSql('alter table "role_users" add constraint "role_users_pkey" primary key ("role_id", "user_id");');

    this.addSql('alter table "permission" add constraint "permission_subject_id_foreign" foreign key ("subject_id") references "subject" ("id") on update cascade on delete set null;');

    this.addSql('alter table "permission_roles" add constraint "permission_roles_permission_id_foreign" foreign key ("permission_id") references "permission" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "permission_roles" add constraint "permission_roles_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "menu" add constraint "menu_parent_menu_id_foreign" foreign key ("parent_menu_id") references "menu" ("id") on update cascade on delete set null;');

    this.addSql('alter table "pageMenu" add constraint "pageMenu_menu_id_foreign" foreign key ("menu_id") references "menu" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "pageMenu" add constraint "pageMenu_page_id_foreign" foreign key ("page_id") references "page" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "pageMenuRole" add constraint "pageMenuRole_page_menu_id_foreign" foreign key ("page_menu_id") references "pageMenu" ("id") on update cascade on delete CASCADE;');
    this.addSql('alter table "pageMenuRole" add constraint "pageMenuRole_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete set null;');

    this.addSql('alter table "state" add constraint "state_country_id_foreign" foreign key ("country_id") references "country" ("id") on update cascade;');

    this.addSql('alter table "city" add constraint "city_country_id_foreign" foreign key ("country_id") references "country" ("id") on update cascade on delete set null;');

    this.addSql('alter table "user" add constraint "user_user_setting_id_foreign" foreign key ("user_setting_id") references "user_setting" ("id") on update cascade on delete set null;');

    this.addSql('alter table "notification_token" add constraint "notification_token_created_by_id_foreign" foreign key ("created_by_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "user_device" add constraint "user_device_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');

    this.addSql('alter table "userRole" add constraint "userRole_role_id_foreign" foreign key ("role_id") references "role" ("id") on delete cascade;');
    this.addSql('alter table "userRole" add constraint "userRole_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete CASCADE;');

    this.addSql('alter table "user_setting" add constraint "user_setting_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "user_setting" add constraint "user_setting_site_language_id_foreign" foreign key ("site_language_id") references "site_language" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user_setting" add constraint "user_setting_site_theme_id_foreign" foreign key ("site_theme_id") references "site_theme" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user_setting" add constraint "user_setting_country_id_foreign" foreign key ("country_id") references "country" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user_setting" add constraint "user_setting_city_id_foreign" foreign key ("city_id") references "city" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user_setting" add constraint "user_setting_currency_id_foreign" foreign key ("currency_id") references "currency" ("id") on update cascade on delete set null;');
    this.addSql('alter table "user_setting" add constraint "user_setting_state_id_foreign" foreign key ("state_id") references "state" ("id") on update cascade on delete set null;');

    this.addSql('alter table "role_users" add constraint "role_users_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "role_users" add constraint "role_users_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade on delete cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "permission" drop constraint "permission_subject_id_foreign";');

    this.addSql('alter table "user_setting" drop constraint "user_setting_site_theme_id_foreign";');

    this.addSql('alter table "user_setting" drop constraint "user_setting_site_language_id_foreign";');

    this.addSql('alter table "permission_roles" drop constraint "permission_roles_role_id_foreign";');

    this.addSql('alter table "pageMenuRole" drop constraint "pageMenuRole_role_id_foreign";');

    this.addSql('alter table "userRole" drop constraint "userRole_role_id_foreign";');

    this.addSql('alter table "role_users" drop constraint "role_users_role_id_foreign";');

    this.addSql('alter table "permission_roles" drop constraint "permission_roles_permission_id_foreign";');

    this.addSql('alter table "pageMenu" drop constraint "pageMenu_page_id_foreign";');

    this.addSql('alter table "menu" drop constraint "menu_parent_menu_id_foreign";');

    this.addSql('alter table "pageMenu" drop constraint "pageMenu_menu_id_foreign";');

    this.addSql('alter table "pageMenuRole" drop constraint "pageMenuRole_page_menu_id_foreign";');

    this.addSql('alter table "user_setting" drop constraint "user_setting_currency_id_foreign";');

    this.addSql('alter table "state" drop constraint "state_country_id_foreign";');

    this.addSql('alter table "city" drop constraint "city_country_id_foreign";');

    this.addSql('alter table "user_setting" drop constraint "user_setting_country_id_foreign";');

    this.addSql('alter table "user_setting" drop constraint "user_setting_state_id_foreign";');

    this.addSql('alter table "user_setting" drop constraint "user_setting_city_id_foreign";');

    this.addSql('alter table "notification_token" drop constraint "notification_token_created_by_id_foreign";');

    this.addSql('alter table "user_device" drop constraint "user_device_user_id_foreign";');

    this.addSql('alter table "userRole" drop constraint "userRole_user_id_foreign";');

    this.addSql('alter table "user_setting" drop constraint "user_setting_user_id_foreign";');

    this.addSql('alter table "role_users" drop constraint "role_users_user_id_foreign";');

    this.addSql('alter table "user" drop constraint "user_user_setting_id_foreign";');

    this.addSql('drop table if exists "subject" cascade;');

    this.addSql('drop table if exists "site_theme" cascade;');

    this.addSql('drop table if exists "site_language" cascade;');

    this.addSql('drop table if exists "role" cascade;');

    this.addSql('drop table if exists "permission" cascade;');

    this.addSql('drop table if exists "permission_roles" cascade;');

    this.addSql('drop table if exists "page" cascade;');

    this.addSql('drop table if exists "menu" cascade;');

    this.addSql('drop table if exists "pageMenu" cascade;');

    this.addSql('drop table if exists "pageMenuRole" cascade;');

    this.addSql('drop table if exists "currency" cascade;');

    this.addSql('drop table if exists "country" cascade;');

    this.addSql('drop table if exists "state" cascade;');

    this.addSql('drop table if exists "city" cascade;');

    this.addSql('drop table if exists "user" cascade;');

    this.addSql('drop table if exists "notification_token" cascade;');

    this.addSql('drop table if exists "user_device" cascade;');

    this.addSql('drop table if exists "userRole" cascade;');

    this.addSql('drop table if exists "user_setting" cascade;');

    this.addSql('drop table if exists "role_users" cascade;');
  }

}
