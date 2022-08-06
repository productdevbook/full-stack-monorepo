// THIS FILE IS GENERATED, DO NOT EDIT!
/* eslint-disable eslint-comments/no-unlimited-disable */
/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
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
  disabled: Scalars['Boolean'];
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  name: Scalars['String'];
  name_en?: Maybe<Scalars['String']>;
  pageMenus?: Maybe<Array<PageMenuRole>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userRoles: Array<UserRole>;
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
  is_terms_accepted: Scalars['String'];
  /** last login time */
  lastLoginAt?: Maybe<Scalars['DateTime']>;
  /** Last login IP */
  lastLoginIp?: Maybe<Scalars['String']>;
  /** Example field (name) */
  name: Scalars['String'];
  /** User notification tokens */
  notificationToken?: Maybe<Array<NotificationToken>>;
  providerAccountId?: Maybe<Scalars['String']>;
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

export type UserRole = {
  __typename?: 'UserRole';
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  deleted: Scalars['Boolean'];
  deletedAt?: Maybe<Scalars['DateTime']>;
  disabled: Scalars['Boolean'];
  hidden: Scalars['Boolean'];
  id: Scalars['ID'];
  role: Role;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
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


export type GetUserInfoQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, email: string, username: string } };


export const ForgotPasswordDocument = gql`
    mutation forgotPassword($data: ForgotPasswordInput!) {
  forgotPassword(data: $data)
}
    `;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useForgotPasswordMutation({
 *   variables: {
 *     data: // value for 'data'
 *   },
 * });
 */
export function useForgotPasswordMutation(options: VueApolloComposable.UseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>>) {
  return VueApolloComposable.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($signIn: SignInInput!) {
  signIn(data: $signIn) {
    refreshToken
  }
}
    `;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginMutation({
 *   variables: {
 *     signIn: // value for 'signIn'
 *   },
 * });
 */
export function useLoginMutation(options: VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginMutation, LoginMutationVariables>>) {
  return VueApolloComposable.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginMutation, LoginMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($data: ResetPasswordInput!) {
  resetPassword(data: $data)
}
    `;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useResetPasswordMutation({
 *   variables: {
 *     data: // value for 'data'
 *   },
 * });
 */
export function useResetPasswordMutation(options: VueApolloComposable.UseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>>) {
  return VueApolloComposable.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
}
export type ResetPasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const SignupDocument = gql`
    mutation signup($data: SignUpInput!) {
  signUp(data: $data) {
    name
    username
  }
}
    `;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useSignupMutation({
 *   variables: {
 *     data: // value for 'data'
 *   },
 * });
 */
export function useSignupMutation(options: VueApolloComposable.UseMutationOptions<SignupMutation, SignupMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<SignupMutation, SignupMutationVariables>>) {
  return VueApolloComposable.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
}
export type SignupMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<SignupMutation, SignupMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLogoutMutation();
 */
export function useLogoutMutation(options: VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LogoutMutation, LogoutMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LogoutMutation, LogoutMutationVariables>;
export const CreateTokenNotificationDocument = gql`
    mutation createTokenNotification($data: CreateNotificationTokenInput!) {
  saveNotificationToken(data: $data) {
    token
    id
    createdAt
  }
}
    `;

/**
 * __useCreateTokenNotificationMutation__
 *
 * To run a mutation, you first call `useCreateTokenNotificationMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateTokenNotificationMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateTokenNotificationMutation({
 *   variables: {
 *     data: // value for 'data'
 *   },
 * });
 */
export function useCreateTokenNotificationMutation(options: VueApolloComposable.UseMutationOptions<CreateTokenNotificationMutation, CreateTokenNotificationMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateTokenNotificationMutation, CreateTokenNotificationMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateTokenNotificationMutation, CreateTokenNotificationMutationVariables>(CreateTokenNotificationDocument, options);
}
export type CreateTokenNotificationMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateTokenNotificationMutation, CreateTokenNotificationMutationVariables>;
export const GetUserInfoDocument = gql`
    query GetUserInfo {
  me {
    id
    email
    username
  }
}
    `;

/**
 * __useGetUserInfoQuery__
 *
 * To run a query within a Vue component, call `useGetUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserInfoQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetUserInfoQuery();
 */
export function useGetUserInfoQuery(options: VueApolloComposable.UseQueryOptions<GetUserInfoQuery, GetUserInfoQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUserInfoQuery, GetUserInfoQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUserInfoQuery, GetUserInfoQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, {}, options);
}
export function useGetUserInfoLazyQuery(options: VueApolloComposable.UseQueryOptions<GetUserInfoQuery, GetUserInfoQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetUserInfoQuery, GetUserInfoQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetUserInfoQuery, GetUserInfoQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetUserInfoQuery, GetUserInfoQueryVariables>(GetUserInfoDocument, {}, options);
}
export type GetUserInfoQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetUserInfoQuery, GetUserInfoQueryVariables>;