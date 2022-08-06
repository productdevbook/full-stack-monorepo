<route lang="yaml">
meta:
  auth: self
</route>

<script lang="ts" setup>
import type { SchemaOf } from 'yup'
import { boolean, object, string } from 'yup'
import type { SignInInput } from '@oku/api'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const { t } = useI18n()
const { login } = useAuth()
const { tError } = useToastWeb()

// const router = useRouter()

const schema: SchemaOf<SignInInput> = markRaw(
  object().shape({
    email: string().required().email(),
    password: string()
      .required()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        t('accountPassword.password_matches'),
      ),
    rememberMe: boolean().required(),
    isCookies: boolean().required(),
  }),
)

const { form, onInvalidSubmit } = useFormSection<SignInInput>(schema, {
  email: 'hi@productdevbook.com',
  password: '}c3!c+zs6~X+eJ)q',
  isCookies: false,
  rememberMe: false,
})
const isLoading = ref(false)
const onSubmit = form.handleSubmit(async (values) => {
  await login({
    data: {
      query: `
    mutation Mutation($signIn: SignInInput!) {
  signIn(data: $signIn) {
    accessToken
    refreshToken
  }
}
    `,
      variables: {
        signIn: {
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe,
        },
      },
    },
  },
  {
    onSuccess: (res) => {
      // router.push(res)
    },
    onLoading: (res) => {
      isLoading.value = res
    },
    onError: (error) => {
      tError(error[0].message)
    },
    onUser: (user) => {
      userStore.user = user
    },
  })
}, onInvalidSubmit)
</script>

<template>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <router-link to="/">
          <img class="mx-auto h-24 w-auto" src="/logo-light.png" alt="appname">
        </router-link>
        <h2 class="mt-6 text-center text-3xl font-extrabold">
          Sign in to your account
        </h2>
      </div>

      <FormSection @oku-submit="onSubmit">
        <template #form>
          <div class="col-span-full">
            <FormInputWithValidation
              id="current_email"
              name="email"
              type="text"
              :label="t('login.email')"
              autocomplete="email"
            />
          </div>

          <div class="col-span-full">
            <FormInputWithValidation
              id="password"
              name="password"
              type="password"
              :label="t('login.password')"
              autocomplete="new-password"
            />
          </div>
          <div class="col-span-full flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              >
              <label
                for="remember-me"
                class="ml-2 block text-sm text-gray-900 dark:text-gray-200"
              >
                {{ t('login.remember') }}
              </label>
            </div>

            <div class="text-sm">
              <router-link
                to="/auth/forgot"
                class="font-medium text-green-600 hover:text-green-500"
              >
                {{ t('forgot.heading') }}
              </router-link>
            </div>
          </div>
        </template>
        <template #actions>
          <div class="mb-8 w-full">
            <NButton
              attr-type="submit"
              block
              type="success"
              :loading="isLoading"
              :disabled="form.isSubmitting.value"
              :class="{ 'opacity-25': form.isSubmitting.value }"
              @keypress.enter="onSubmit"
            >
              {{ t('signup.submit') }}
            </NButton>
          </div>
        </template>
      </FormSection>

      <div class="w-full">
        <router-link to="/auth/signup">
          <AtomButton
            attr-type="button"
            secondary
            size="large"
            type="success"
            block
          >
            {{ t('login.signup') }}
          </AtomButton>
        </router-link>
      </div>
    </div>
  </div>
</template>
