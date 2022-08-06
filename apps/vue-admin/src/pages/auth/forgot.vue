<route lang="yaml">
meta:
  auth: self
</route>

<script setup lang="ts">
import { ForgotPasswordInput } from '@oku/api/types/schema'
import { SchemaOf, object as yupObject, string as yupString } from 'yup'
// const router = useRouter()
const { t } = useI18n()
const schema: SchemaOf<ForgotPasswordInput> = yupObject({
  email: yupString().required().email(),
})

const { form, onInvalidSubmit } = useFormSection<ForgotPasswordInput>(schema, {
  email: 'hi@productdevbook.com',
})
const successSendEmail = ref(false)
const { mutate, loading, onDone } = useForgotPasswordMutation({
  variables: {
    data: {
      email: '',
    },
  },
})
onDone((res) => {
  if (res.data && res.data.forgotPassword)
    successSendEmail.value = true
})
const onSubmit = form.handleSubmit(async (values) => {
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
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Or
          {{ ' ' }}
          <a href="#" class="font-medium text-green-600 hover:text-green-500">
            start your 14-day free trial
          </a>
        </p>
      </div>
      <FormSection v-show="!successSendEmail" @oku-submit="onSubmit">
        <template #form>
          <div class="col-span-full">
            <FormInputWithValidation
              id="current_email"
              :placeholder="t('resetPassword.input')"
              name="email"
              type="text"
              :label="t('resetPassword.input')"
              autocomplete="email"
            />
          </div>
        </template>
        <template #actions>
          <div class="mb-8 w-full">
            <AtomButton
              attr-type="submit"
              block
              type="success"
              :loading="loading"
              :disabled="form.isSubmitting.value"
              :class="{ 'opacity-25': form.isSubmitting.value }"
              @keypress.enter="onSubmit"
            >
              {{ t('resetPassword.button') }}
            </AtomButton>
          </div>
        </template>
        <div class="flex flex-col items-center justify-center">
          <div>
            <router-link
              to="/auth/login"
              class="ion-margin-top text-muted-blue-500 font-semibold underline"
            >
              {{ t('login.login-in') }}
            </router-link>
          </div>

          <div class="mx-auto mt-4 text-center">
            <button class="mx-auto font-bold text-gray-500">
              {{ t('global.version') }}
            </button>
          </div>
        </div>
      </FormSection>
    </div>
  </div>
</template>
