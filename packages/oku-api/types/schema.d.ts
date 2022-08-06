// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable eslint-comments/no-unlimited-disable */
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
  JWT: any;
};

export type City = {
  __typename?: 'City';
  archived: Scalars['Boolean'];
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  disabled: Scalars['Boolean'];
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  userSettings?: Maybe<Array<UserSetting>>;
};

export type Country = {
  __typename?: 'Country';
  capital: Scalars['String'];
  cities: Array<City>;
  currency: Scalars['String'];
  currencyName: Scalars['String'];
  currencySymbol: Scalars['String'];
  emoji: Scalars['String'];
  emojiU: Scalars['String'];
  id: Scalars['ID'];
  iso2: Scalars['String'];
  iso3: Scalars['String'];
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  name: Scalars['String'];
  native: Scalars['String'];
  numericCode: Scalars['String'];
  phoneCode: Scalars['String'];
  region: Scalars['String'];
  states: Array<State>;
  subRegion: Scalars['String'];
  timeZones: Scalars['String'];
  tld: Scalars['String'];
  userSettings: Array<UserSetting>;
};

export type CreateNotificationTokenInput = {
  /** Example field (placeholder) */
  deviceId: Scalars['String'];
  /** Example field (placeholder) */
  token: Scalars['String'];
};

export type Currency = {
  __typename?: 'Currency';
  archived: Scalars['Boolean'];
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  disabled: Scalars['Boolean'];
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  userSettings: Array<UserSetting>;
};

export type ExampleInput = {
  info: Scalars['JSON'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type Menu = {
  __typename?: 'Menu';
  archived: Scalars['Boolean'];
  childMenus?: Maybe<Array<Menu>>;
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  disabled: Scalars['Boolean'];
  hidden: Scalars['Boolean'];
  icon: Scalars['String'];
  id: Scalars['ID'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  order: Scalars['Int'];
  pageMenus?: Maybe<Array<PageMenu>>;
  parentMenu?: Maybe<Menu>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  forgotPassword: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  refreshToken: TokenResponse;
  resetPassword: Scalars['Boolean'];
  saveNotificationToken: NotificationToken;
  sendNotificationToken: Scalars['Boolean'];
  signIn: TokenResponse;
  signUp: User;
  terminateSession: Scalars['Boolean'];
};


export type MutationForgotPasswordArgs = {
  data: ForgotPasswordInput;
};


export type MutationRefreshTokenArgs = {
  data: RefreshTokenInput;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationSaveNotificationTokenArgs = {
  data: CreateNotificationTokenInput;
};


export type MutationSendNotificationTokenArgs = {
  data: SendNotificationInput;
};


export type MutationSignInArgs = {
  data: SignInInput;
};


export type MutationSignUpArgs = {
  data: SignUpInput;
};


export type MutationTerminateSessionArgs = {
  data: TerminateSessionInput;
};

export type NotificationToken = {
  __typename?: 'NotificationToken';
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  deviceId: Scalars['String'];
  disabled: Scalars['Boolean'];
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  token: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Page = {
  __typename?: 'Page';
  archived: Scalars['Boolean'];
  columns?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  disabled: Scalars['Boolean'];
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  isOrganization: Scalars['Boolean'];
  isPublic: Scalars['Boolean'];
  isSql: Scalars['Boolean'];
  name: Scalars['String'];
  pageMenus?: Maybe<Array<PageMenu>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  url: Scalars['String'];
};

export type PageMenu = {
  __typename?: 'PageMenu';
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  disabled: Scalars['Boolean'];
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  menu?: Maybe<Menu>;
  page?: Maybe<Page>;
  roles?: Maybe<Array<PageMenuRole>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PageMenuRole = {
  __typename?: 'PageMenuRole';
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  disabled: Scalars['Boolean'];
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  pageMenu?: Maybe<Page>;
  role?: Maybe<Role>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  example: Scalars['String'];
  me: User;
  sessions: Array<Session>;
};


export type QueryExampleArgs = {
  data: ExampleInput;
};

export type RefreshTokenInput = {
  refreshToken: Scalars['String'];
};

export type ResetPasswordInput = {
  code: Scalars['String'];
  password: Scalars['String'];
  repeatPassword: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  disabled: Scalars['Boolean'];
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  pageMenus?: Maybe<Array<PageMenuRole>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  users?: Maybe<Array<User>>;
};

export type SendNotificationInput = {
  /** Example field (placeholder) */
  body: Scalars['String'];
  /** Example field (placeholder) */
  title: Scalars['String'];
  /** Example field (placeholder) */
  token: Scalars['String'];
};

export type Session = {
  __typename?: 'Session';
  /** Session creation date */
  createdDate?: Maybe<Scalars['DateTime']>;
  /** Device info */
  device?: Maybe<UserAgent>;
  /** Device IP */
  ip: Scalars['String'];
  /** Jit */
  jit: Scalars['String'];
};

export type SignInInput = {
  email: Scalars['String'];
  isCookies?: InputMaybe<Scalars['Boolean']>;
  password: Scalars['String'];
  rememberMe?: InputMaybe<Scalars['Boolean']>;
};

export type SignUpInput = {
  confirmPassword: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  isTermsAccepted: Scalars['Boolean'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type SiteLanguage = {
  __typename?: 'SiteLanguage';
  archived: Scalars['Boolean'];
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  disabled: Scalars['Boolean'];
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userSettings: Array<UserSetting>;
};

export type SiteTheme = {
  __typename?: 'SiteTheme';
  archived: Scalars['Boolean'];
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  disabled: Scalars['Boolean'];
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  name: SiteThemeEnum;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userSettings: Array<UserSetting>;
};

/** This site theme. */
export type SiteThemeEnum =
  | 'auto'
  | 'dark'
  | 'light';

export type State = {
  __typename?: 'State';
  country: Array<Country>;
  countryCode: Scalars['String'];
  countryName: Scalars['String'];
  id: Scalars['ID'];
  latitude: Scalars['String'];
  longitude: Scalars['String'];
  name: Scalars['String'];
  stateCode: Scalars['String'];
  type?: Maybe<Scalars['String']>;
  userSettings: Array<UserSetting>;
};

export type Subject = {
  __typename?: 'Subject';
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  disabled: Scalars['Boolean'];
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type TerminateSessionInput = {
  jti: Scalars['String'];
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  /** JWT access token */
  accessToken: Scalars['JWT'];
  /** JWT refresh token */
  refreshToken: Scalars['JWT'];
};

export type User = {
  __typename?: 'User';
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  /** User devices */
  devices?: Maybe<Array<UserDevice>>;
  disabled: Scalars['Boolean'];
  /** Example field (display name) */
  displayName: Scalars['String'];
  /** Example field (email) */
  email: Scalars['String'];
  /** Example field (emailVerified) */
  emailVerified?: Maybe<Scalars['DateTime']>;
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  /** Example field (placeholder) */
  image?: Maybe<Scalars['String']>;
  /** Example field (placeholder) */
  isTermsAccepted: Scalars['String'];
  /** last login time */
  lastLoginAt?: Maybe<Scalars['DateTime']>;
  /** Last login IP */
  lastLoginIp?: Maybe<Scalars['String']>;
  /** Example field (name) */
  name: Scalars['String'];
  /** User notification tokens */
  notificationToken?: Maybe<Array<NotificationToken>>;
  providerAccountId?: Maybe<Scalars['String']>;
  roles?: Maybe<Array<Role>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userSetting: UserSetting;
  /** Example field (username) */
  username: Scalars['String'];
};

export type UserAgent = {
  __typename?: 'UserAgent';
  browser?: Maybe<UserAgentBrowser>;
  cpu: UserAgentCpu;
  device?: Maybe<UserAgentDevice>;
  engine: UserAgentEngine;
  os: UserAgentOs;
  ua: Scalars['String'];
};

export type UserAgentBrowser = {
  __typename?: 'UserAgentBrowser';
  /** Browser major */
  major?: Maybe<Scalars['String']>;
  /** Browser name */
  name?: Maybe<Scalars['String']>;
  /** Browser version */
  version?: Maybe<Scalars['String']>;
};

export type UserAgentCpu = {
  __typename?: 'UserAgentCPU';
  /** CPU architecture */
  architecture?: Maybe<Scalars['String']>;
};

export type UserAgentDevice = {
  __typename?: 'UserAgentDevice';
  /** Device model */
  model?: Maybe<Scalars['String']>;
  /** Device type */
  type?: Maybe<Scalars['String']>;
  /** Device vendor */
  vendor?: Maybe<Scalars['String']>;
};

export type UserAgentEngine = {
  __typename?: 'UserAgentEngine';
  /** Engine name */
  name?: Maybe<Scalars['String']>;
  /** Engine version */
  version?: Maybe<Scalars['String']>;
};

export type UserAgentOs = {
  __typename?: 'UserAgentOS';
  /** OS name */
  name?: Maybe<Scalars['String']>;
  /** OS version */
  version?: Maybe<Scalars['String']>;
};

export type UserDevice = {
  __typename?: 'UserDevice';
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  disabled: Scalars['Boolean'];
  /** device fingerprint */
  fingerprint: Scalars['String'];
  /** Device first login time */
  firstLoginAt?: Maybe<Scalars['DateTime']>;
  /** Device first login IP */
  firstLoginIp?: Maybe<Scalars['String']>;
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  /** last login time */
  lastLoginAt?: Maybe<Scalars['DateTime']>;
  /** Last login IP */
  lastLoginIp?: Maybe<Scalars['String']>;
  /** device name */
  name: Scalars['String'];
  /** login token jit */
  token?: Maybe<Scalars['String']>;
  /** Equipment type */
  type: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** owning user */
  user: User;
  /** device UA */
  userAgent: UserAgent;
};

export type UserSetting = {
  __typename?: 'UserSetting';
  archived: Scalars['Boolean'];
  city?: Maybe<City>;
  country?: Maybe<Country>;
  createdAt: Scalars['DateTime'];
  currency?: Maybe<Currency>;
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  disabled: Scalars['Boolean'];
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  siteLanguage?: Maybe<SiteLanguage>;
  siteTheme?: Maybe<SiteTheme>;
  state?: Maybe<State>;
  timezone?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** User devices */
  user?: Maybe<Array<User>>;
};
