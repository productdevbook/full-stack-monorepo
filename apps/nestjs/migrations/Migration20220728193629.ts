import { Migration } from '@mikro-orm/migrations';

export class Migration20220728193629 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "directus_revisions" drop constraint "directus_revisions_activity_foreign";');

    this.addSql('alter table "directus_collections" drop constraint "directus_collections_group_foreign";');

    this.addSql('alter table "directus_shares" drop constraint "directus_shares_collection_foreign";');

    this.addSql('alter table "directus_panels" drop constraint "directus_panels_dashboard_foreign";');

    this.addSql('alter table "directus_settings" drop constraint "directus_settings_project_logo_foreign";');

    this.addSql('alter table "directus_settings" drop constraint "directus_settings_public_background_foreign";');

    this.addSql('alter table "directus_settings" drop constraint "directus_settings_public_foreground_foreign";');

    this.addSql('alter table "directus_operations" drop constraint "directus_operations_flow_foreign";');

    this.addSql('alter table "directus_files" drop constraint "directus_files_folder_foreign";');

    this.addSql('alter table "directus_folders" drop constraint "directus_folders_parent_foreign";');

    this.addSql('alter table "directus_settings" drop constraint "directus_settings_storage_default_folder_foreign";');

    this.addSql('alter table "directus_operations" drop constraint "directus_operations_reject_foreign";');

    this.addSql('alter table "directus_operations" drop constraint "directus_operations_resolve_foreign";');

    this.addSql('alter table "directus_revisions" drop constraint "directus_revisions_parent_foreign";');

    this.addSql('alter table "directus_permissions" drop constraint "directus_permissions_role_foreign";');

    this.addSql('alter table "directus_presets" drop constraint "directus_presets_role_foreign";');

    this.addSql('alter table "directus_shares" drop constraint "directus_shares_role_foreign";');

    this.addSql('alter table "directus_users" drop constraint "directus_users_role_foreign";');

    this.addSql('alter table "directus_sessions" drop constraint "directus_sessions_share_foreign";');

    this.addSql('alter table "directus_dashboards" drop constraint "directus_dashboards_user_created_foreign";');

    this.addSql('alter table "directus_files" drop constraint "directus_files_modified_by_foreign";');

    this.addSql('alter table "directus_files" drop constraint "directus_files_uploaded_by_foreign";');

    this.addSql('alter table "directus_flows" drop constraint "directus_flows_user_created_foreign";');

    this.addSql('alter table "directus_notifications" drop constraint "directus_notifications_recipient_foreign";');

    this.addSql('alter table "directus_notifications" drop constraint "directus_notifications_sender_foreign";');

    this.addSql('alter table "directus_operations" drop constraint "directus_operations_user_created_foreign";');

    this.addSql('alter table "directus_panels" drop constraint "directus_panels_user_created_foreign";');

    this.addSql('alter table "directus_presets" drop constraint "directus_presets_user_foreign";');

    this.addSql('alter table "directus_sessions" drop constraint "directus_sessions_user_foreign";');

    this.addSql('alter table "directus_shares" drop constraint "directus_shares_user_created_foreign";');

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

    this.addSql('drop table if exists "directus_activity" cascade;');

    this.addSql('drop table if exists "directus_collections" cascade;');

    this.addSql('drop table if exists "directus_dashboards" cascade;');

    this.addSql('drop table if exists "directus_fields" cascade;');

    this.addSql('drop table if exists "directus_files" cascade;');

    this.addSql('drop table if exists "directus_flows" cascade;');

    this.addSql('drop table if exists "directus_folders" cascade;');

    this.addSql('drop table if exists "directus_migrations" cascade;');

    this.addSql('drop table if exists "directus_notifications" cascade;');

    this.addSql('drop table if exists "directus_operations" cascade;');

    this.addSql('drop table if exists "directus_panels" cascade;');

    this.addSql('drop table if exists "directus_permissions" cascade;');

    this.addSql('drop table if exists "directus_presets" cascade;');

    this.addSql('drop table if exists "directus_relations" cascade;');

    this.addSql('drop table if exists "directus_revisions" cascade;');

    this.addSql('drop table if exists "directus_roles" cascade;');

    this.addSql('drop table if exists "directus_sessions" cascade;');

    this.addSql('drop table if exists "directus_settings" cascade;');

    this.addSql('drop table if exists "directus_shares" cascade;');

    this.addSql('drop table if exists "directus_users" cascade;');

    this.addSql('drop table if exists "directus_webhooks" cascade;');
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

    this.addSql('create table "directus_activity" ("id" serial primary key, "action" varchar not null default null, "user" uuid null default null, "timestamp" timestamptz not null default CURRENT_TIMESTAMP, "ip" varchar null default null, "user_agent" varchar null default null, "collection" varchar not null default null, "item" varchar not null default null, "comment" text null default null);');

    this.addSql('create table "directus_collections" ("collection" varchar not null default null, "icon" varchar null default null, "note" text null default null, "display_template" varchar null default null, "hidden" bool not null default false, "singleton" bool not null default false, "translations" json null default null, "archive_field" varchar null default null, "archive_app_filter" bool not null default true, "archive_value" varchar null default null, "unarchive_value" varchar null default null, "sort_field" varchar null default null, "accountability" varchar null default \'all\', "color" varchar null default null, "item_duplication_fields" json null default null, "sort" int4 null default null, "group" varchar null default null, "collapse" varchar not null default \'open\');');
    this.addSql('alter table "directus_collections" add constraint "directus_collections_pkey" primary key ("collection");');

    this.addSql('create table "directus_dashboards" ("id" uuid not null default null, "name" varchar not null default null, "icon" varchar not null default \'dashboard\', "note" text null default null, "date_created" timestamptz null default CURRENT_TIMESTAMP, "user_created" uuid null default null, "color" varchar null default null);');
    this.addSql('alter table "directus_dashboards" add constraint "directus_dashboards_pkey" primary key ("id");');

    this.addSql('create table "directus_fields" ("id" serial primary key, "collection" varchar not null default null, "field" varchar not null default null, "special" varchar null default null, "interface" varchar null default null, "options" json null default null, "display" varchar null default null, "display_options" json null default null, "readonly" bool not null default false, "hidden" bool not null default false, "sort" int4 null default null, "width" varchar null default \'full\', "translations" json null default null, "note" text null default null, "conditions" json null default null, "required" bool null default false, "group" varchar null default null, "validation" json null default null, "validation_message" text null default null);');

    this.addSql('create table "directus_files" ("id" uuid not null default null, "storage" varchar not null default null, "filename_disk" varchar null default null, "filename_download" varchar not null default null, "title" varchar null default null, "type" varchar null default null, "folder" uuid null default null, "uploaded_by" uuid null default null, "uploaded_on" timestamptz not null default CURRENT_TIMESTAMP, "modified_by" uuid null default null, "modified_on" timestamptz not null default CURRENT_TIMESTAMP, "charset" varchar null default null, "filesize" int8 null default null, "width" int4 null default null, "height" int4 null default null, "duration" int4 null default null, "embed" varchar null default null, "description" text null default null, "location" text null default null, "tags" text null default null, "metadata" json null default null);');
    this.addSql('alter table "directus_files" add constraint "directus_files_pkey" primary key ("id");');

    this.addSql('create table "directus_flows" ("id" uuid not null default null, "name" varchar not null default null, "icon" varchar null default null, "color" varchar null default null, "description" text null default null, "status" varchar not null default \'active\', "trigger" varchar null default null, "accountability" varchar null default \'all\', "options" json null default null, "operation" uuid null default null, "date_created" timestamptz null default CURRENT_TIMESTAMP, "user_created" uuid null default null);');
    this.addSql('alter table "directus_flows" add constraint "directus_flows_pkey" primary key ("id");');
    this.addSql('alter table "directus_flows" add constraint "directus_flows_operation_unique" unique ("operation");');

    this.addSql('create table "directus_folders" ("id" uuid not null default null, "name" varchar not null default null, "parent" uuid null default null);');
    this.addSql('alter table "directus_folders" add constraint "directus_folders_pkey" primary key ("id");');

    this.addSql('create table "directus_migrations" ("version" varchar not null default null, "name" varchar not null default null, "timestamp" timestamptz null default CURRENT_TIMESTAMP);');
    this.addSql('alter table "directus_migrations" add constraint "directus_migrations_pkey" primary key ("version");');

    this.addSql('create table "directus_notifications" ("id" serial primary key, "timestamp" timestamptz not null default null, "status" varchar null default \'inbox\', "recipient" uuid not null default null, "sender" uuid null default null, "subject" varchar not null default null, "message" text null default null, "collection" varchar null default null, "item" varchar null default null);');

    this.addSql('create table "directus_operations" ("id" uuid not null default null, "name" varchar null default null, "key" varchar not null default null, "type" varchar not null default null, "position_x" int4 not null default null, "position_y" int4 not null default null, "options" json null default null, "resolve" uuid null default null, "reject" uuid null default null, "flow" uuid not null default null, "date_created" timestamptz null default CURRENT_TIMESTAMP, "user_created" uuid null default null);');
    this.addSql('alter table "directus_operations" add constraint "directus_operations_pkey" primary key ("id");');
    this.addSql('alter table "directus_operations" add constraint "directus_operations_resolve_unique" unique ("resolve");');
    this.addSql('alter table "directus_operations" add constraint "directus_operations_reject_unique" unique ("reject");');

    this.addSql('create table "directus_panels" ("id" uuid not null default null, "dashboard" uuid not null default null, "name" varchar null default null, "icon" varchar null default null, "color" varchar null default null, "show_header" bool not null default false, "note" text null default null, "type" varchar not null default null, "position_x" int4 not null default null, "position_y" int4 not null default null, "width" int4 not null default null, "height" int4 not null default null, "options" json null default null, "date_created" timestamptz null default CURRENT_TIMESTAMP, "user_created" uuid null default null);');
    this.addSql('alter table "directus_panels" add constraint "directus_panels_pkey" primary key ("id");');

    this.addSql('create table "directus_permissions" ("id" serial primary key, "role" uuid null default null, "collection" varchar not null default null, "action" varchar not null default null, "permissions" json null default null, "validation" json null default null, "presets" json null default null, "fields" text null default null);');

    this.addSql('create table "directus_presets" ("id" serial primary key, "bookmark" varchar null default null, "user" uuid null default null, "role" uuid null default null, "collection" varchar null default null, "search" varchar null default null, "layout" varchar null default \'tabular\', "layout_query" json null default null, "layout_options" json null default null, "refresh_interval" int4 null default null, "filter" json null default null, "icon" varchar not null default \'bookmark_outline\', "color" varchar null default null);');

    this.addSql('create table "directus_relations" ("id" serial primary key, "many_collection" varchar not null default null, "many_field" varchar not null default null, "one_collection" varchar null default null, "one_field" varchar null default null, "one_collection_field" varchar null default null, "one_allowed_collections" text null default null, "junction_field" varchar null default null, "sort_field" varchar null default null, "one_deselect_action" varchar not null default \'nullify\');');

    this.addSql('create table "directus_revisions" ("id" serial primary key, "activity" int4 not null default null, "collection" varchar not null default null, "item" varchar not null default null, "data" json null default null, "delta" json null default null, "parent" int4 null default null);');

    this.addSql('create table "directus_roles" ("id" uuid not null default null, "name" varchar not null default null, "icon" varchar not null default \'supervised_user_circle\', "description" text null default null, "ip_access" text null default null, "enforce_tfa" bool not null default false, "admin_access" bool not null default false, "app_access" bool not null default true);');
    this.addSql('alter table "directus_roles" add constraint "directus_roles_pkey" primary key ("id");');

    this.addSql('create table "directus_sessions" ("token" varchar not null default null, "user" uuid null default null, "expires" timestamptz not null default null, "ip" varchar null default null, "user_agent" varchar null default null, "share" uuid null default null);');
    this.addSql('alter table "directus_sessions" add constraint "directus_sessions_pkey" primary key ("token");');

    this.addSql('create table "directus_settings" ("id" serial primary key, "project_name" varchar not null default \'Directus\', "project_url" varchar null default null, "project_color" varchar null default null, "project_logo" uuid null default null, "public_foreground" uuid null default null, "public_background" uuid null default null, "public_note" text null default null, "auth_login_attempts" int4 null default 25, "auth_password_policy" varchar null default null, "storage_asset_transform" varchar null default \'all\', "storage_asset_presets" json null default null, "custom_css" text null default null, "storage_default_folder" uuid null default null, "basemaps" json null default null, "mapbox_key" varchar null default null, "module_bar" json null default null, "project_descriptor" varchar null default null, "translation_strings" json null default null, "default_language" varchar not null default \'en-US\');');

    this.addSql('create table "directus_shares" ("id" uuid not null default null, "name" varchar null default null, "collection" varchar null default null, "item" varchar null default null, "role" uuid null default null, "password" varchar null default null, "user_created" uuid null default null, "date_created" timestamptz null default CURRENT_TIMESTAMP, "date_start" timestamptz null default null, "date_end" timestamptz null default null, "times_used" int4 null default 0, "max_uses" int4 null default null);');
    this.addSql('alter table "directus_shares" add constraint "directus_shares_pkey" primary key ("id");');

    this.addSql('create table "directus_users" ("id" uuid not null default null, "first_name" varchar null default null, "last_name" varchar null default null, "email" varchar null default null, "password" varchar null default null, "location" varchar null default null, "title" varchar null default null, "description" text null default null, "tags" json null default null, "avatar" uuid null default null, "language" varchar null default null, "theme" varchar null default \'auto\', "tfa_secret" varchar null default null, "status" varchar not null default \'active\', "role" uuid null default null, "token" varchar null default null, "last_access" timestamptz null default null, "last_page" varchar null default null, "provider" varchar not null default \'default\', "external_identifier" varchar null default null, "auth_data" json null default null, "email_notifications" bool null default true);');
    this.addSql('alter table "directus_users" add constraint "directus_users_pkey" primary key ("id");');
    this.addSql('alter table "directus_users" add constraint "directus_users_external_identifier_unique" unique ("external_identifier");');
    this.addSql('alter table "directus_users" add constraint "directus_users_email_unique" unique ("email");');
    this.addSql('alter table "directus_users" add constraint "directus_users_token_unique" unique ("token");');

    this.addSql('create table "directus_webhooks" ("id" serial primary key, "name" varchar not null default null, "method" varchar not null default \'POST\', "url" varchar not null default null, "status" varchar not null default \'active\', "data" bool not null default true, "actions" varchar not null default null, "collections" varchar not null default null, "headers" json null default null);');

    this.addSql('alter table "directus_collections" add constraint "directus_collections_group_foreign" foreign key ("group") references "directus_collections" ("collection") on update no action on delete no action;');

    this.addSql('alter table "directus_dashboards" add constraint "directus_dashboards_user_created_foreign" foreign key ("user_created") references "directus_users" ("id") on update no action on delete set null;');

    this.addSql('alter table "directus_files" add constraint "directus_files_folder_foreign" foreign key ("folder") references "directus_folders" ("id") on update no action on delete set null;');
    this.addSql('alter table "directus_files" add constraint "directus_files_modified_by_foreign" foreign key ("modified_by") references "directus_users" ("id") on update no action on delete no action;');
    this.addSql('alter table "directus_files" add constraint "directus_files_uploaded_by_foreign" foreign key ("uploaded_by") references "directus_users" ("id") on update no action on delete no action;');

    this.addSql('alter table "directus_flows" add constraint "directus_flows_user_created_foreign" foreign key ("user_created") references "directus_users" ("id") on update no action on delete set null;');

    this.addSql('alter table "directus_folders" add constraint "directus_folders_parent_foreign" foreign key ("parent") references "directus_folders" ("id") on update no action on delete no action;');

    this.addSql('alter table "directus_notifications" add constraint "directus_notifications_recipient_foreign" foreign key ("recipient") references "directus_users" ("id") on update no action on delete cascade;');
    this.addSql('alter table "directus_notifications" add constraint "directus_notifications_sender_foreign" foreign key ("sender") references "directus_users" ("id") on update no action on delete no action;');

    this.addSql('alter table "directus_operations" add constraint "directus_operations_flow_foreign" foreign key ("flow") references "directus_flows" ("id") on update no action on delete cascade;');
    this.addSql('alter table "directus_operations" add constraint "directus_operations_reject_foreign" foreign key ("reject") references "directus_operations" ("id") on update no action on delete no action;');
    this.addSql('alter table "directus_operations" add constraint "directus_operations_resolve_foreign" foreign key ("resolve") references "directus_operations" ("id") on update no action on delete no action;');
    this.addSql('alter table "directus_operations" add constraint "directus_operations_user_created_foreign" foreign key ("user_created") references "directus_users" ("id") on update no action on delete set null;');

    this.addSql('alter table "directus_panels" add constraint "directus_panels_dashboard_foreign" foreign key ("dashboard") references "directus_dashboards" ("id") on update no action on delete cascade;');
    this.addSql('alter table "directus_panels" add constraint "directus_panels_user_created_foreign" foreign key ("user_created") references "directus_users" ("id") on update no action on delete set null;');

    this.addSql('alter table "directus_permissions" add constraint "directus_permissions_role_foreign" foreign key ("role") references "directus_roles" ("id") on update no action on delete cascade;');

    this.addSql('alter table "directus_presets" add constraint "directus_presets_role_foreign" foreign key ("role") references "directus_roles" ("id") on update no action on delete cascade;');
    this.addSql('alter table "directus_presets" add constraint "directus_presets_user_foreign" foreign key ("user") references "directus_users" ("id") on update no action on delete cascade;');

    this.addSql('alter table "directus_revisions" add constraint "directus_revisions_activity_foreign" foreign key ("activity") references "directus_activity" ("id") on update no action on delete cascade;');
    this.addSql('alter table "directus_revisions" add constraint "directus_revisions_parent_foreign" foreign key ("parent") references "directus_revisions" ("id") on update no action on delete no action;');

    this.addSql('alter table "directus_sessions" add constraint "directus_sessions_share_foreign" foreign key ("share") references "directus_shares" ("id") on update no action on delete cascade;');
    this.addSql('alter table "directus_sessions" add constraint "directus_sessions_user_foreign" foreign key ("user") references "directus_users" ("id") on update no action on delete cascade;');

    this.addSql('alter table "directus_settings" add constraint "directus_settings_project_logo_foreign" foreign key ("project_logo") references "directus_files" ("id") on update no action on delete no action;');
    this.addSql('alter table "directus_settings" add constraint "directus_settings_public_background_foreign" foreign key ("public_background") references "directus_files" ("id") on update no action on delete no action;');
    this.addSql('alter table "directus_settings" add constraint "directus_settings_public_foreground_foreign" foreign key ("public_foreground") references "directus_files" ("id") on update no action on delete no action;');
    this.addSql('alter table "directus_settings" add constraint "directus_settings_storage_default_folder_foreign" foreign key ("storage_default_folder") references "directus_folders" ("id") on update no action on delete set null;');

    this.addSql('alter table "directus_shares" add constraint "directus_shares_collection_foreign" foreign key ("collection") references "directus_collections" ("collection") on update no action on delete cascade;');
    this.addSql('alter table "directus_shares" add constraint "directus_shares_role_foreign" foreign key ("role") references "directus_roles" ("id") on update no action on delete cascade;');
    this.addSql('alter table "directus_shares" add constraint "directus_shares_user_created_foreign" foreign key ("user_created") references "directus_users" ("id") on update no action on delete set null;');

    this.addSql('alter table "directus_users" add constraint "directus_users_role_foreign" foreign key ("role") references "directus_roles" ("id") on update no action on delete set null;');

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
