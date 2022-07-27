// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable eslint-comments/no-unlimited-disable */
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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

export type ForgotPasswordMutationVariables = Exact<{
  data: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  signIn: SignInInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', signIn: { __typename?: 'TokenResponse', refreshToken: any } };

export type ResetPasswordMutationVariables = Exact<{
  data: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: boolean };

export type SignupMutationVariables = Exact<{
  data: SignUpInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', name: string, username: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type CreateTokenNotificationMutationVariables = Exact<{
  data: CreateNotificationTokenInput;
}>;


export type CreateTokenNotificationMutation = { __typename?: 'Mutation', saveNotificationToken: { __typename?: 'NotificationToken', token: string, id: string, createdAt: any } };

export type GetUserInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserInfoQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string } };


export const ForgotPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"forgotPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ForgotPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"forgotPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"signIn"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignInInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"signIn"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const ResetPasswordDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ResetPasswordInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resetPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}]}]}}]} as unknown as DocumentNode<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SignupDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SignUpInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const CreateTokenNotificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createTokenNotification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateNotificationTokenInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveNotificationToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateTokenNotificationMutation, CreateTokenNotificationMutationVariables>;
export const GetUserInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]} as unknown as DocumentNode<GetUserInfoQuery, GetUserInfoQueryVariables>;