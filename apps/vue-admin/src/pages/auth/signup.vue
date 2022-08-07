<route lang="yaml">
meta:
  auth: self
</route>

<script lang="ts" setup>
import { useMessage } from 'naive-ui'
import {
  SchemaOf,
  boolean as yupBoolean,
  object as yupObject,
  ref as yupRef,
  string as yupString,
} from 'yup'
import { useI18n } from 'vue-i18n'
import { SignUpInput } from '@oku/api/types/schema'

const $toast = useMessage()
const { t } = useI18n()

const schema: SchemaOf<SignUpInput> = yupObject({
  displayName: yupString().required(),
  email: yupString().required().email(),
  password: yupString()
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      t('accountPassword.password_matches'),
    ),
  confirmPassword: yupString()
    .required(t('signup.error_confirm_password'))
    .oneOf([yupRef('password')], t('signup.error_confirm_password')),
  name: yupString().required(),
  username: yupString().required(),
  isTermsAccepted: yupBoolean()
    .required(t('signup.error_terms'))
    .typeError(t('signup.error_terms')),
})

const { form, onInvalidSubmit } = useFormSection<SignUpInput>(schema, {
  displayName: 'test',
  email: 'hi@productdevbook.com',
  password: '}c3!c+zs6~X+eJ)q',
  confirmPassword: '}c3!c+zs6~X+eJ)q',
  name: 'test',
  username: 'test',
  isTermsAccepted: true,
})

const { mutate, loading, onDone, onError } = useSignupMutation({
  variables: {
    data: {} as any,
  },
})

onError((error) => {
  $toast.error(error.message)
})
onDone((data) => {
  $toast.success(t('signup.success'))
})

const onSubmit = form.handleSubmit((values) => {
  mutate({ data: values })
}, onInvalidSubmit)
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-24 w-auto" src="/logo-light.png" alt="appname">
        <h2 class="mt-6 text-center text-3xl font-extrabold">
          Signup
        </h2>
      </div>

      <FormSection class="w-full" @oku-submit="onSubmit">
        <template #form>
          <div class="col-span-full">
            <FormInputWithValidation
              id="current_display_name"
              name="displayName"
              type="text"
              :label="t('signup.display-name')"
              autocomplete="email"
            />
          </div>

          <div class="col-span-full">
            <FormInputWithValidation
              id="current_name"
              name="name"
              type="text"
              :label="t('signup.name')"
              autocomplete="name"
            />
          </div>

          <div class="col-span-full">
            <FormInputWithValidation
              id="current_username"
              name="username"
              type="text"
              :label="t('signup.username')"
              autocomplete="username"
            />
          </div>

          <div class="col-span-full">
            <FormInputWithValidation
              id="current_email"
              name="email"
              type="text"
              :label="t('signup.email')"
              autocomplete="email"
            />
          </div>

          <div class="col-span-full">
            <FormInputWithValidation
              id="password"
              name="password"
              type="password"
              :label="t('signup.password')"
              autocomplete="new-password"
            />
          </div>

          <div class="col-span-full">
            <FormInputWithValidation
              id="confirm_password"
              name="confirmPassword"
              type="password"
              :label="t('signup.confirm_password')"
              autocomplete="new-password"
            />
          </div>

          <div class="col-span-full flex flex-col">
            <div class="mb-6 flex items-center">
              <CheckboxWithValidation
                id="a_isTermsAccepted"
                name="isTermsAccepted"
                :label="t('signup.terms')"
              />
            </div>
          </div>
        </template>

        <template #actions>
          <div class="flex space-x-3">
            <div>
              <NButton
                attr-type="submit"
                type="success"
                :loading="loading"
                :disabled="loading"
                :class="{ 'opacity-25': loading }"
              >
                {{ t('signup.submit') }}
              </NButton>
            </div>
          </div>
        </template>
      </FormSection>

      <div class="flex w-full items-center justify-center text-sm">
        <router-link
          to="/auth/login"
          class="font-medium text-green-600 hover:text-green-500"
        >
          {{ t('signup.have_account_login') }}
        </router-link>
      </div>
    </div>
  </div>
</template>
