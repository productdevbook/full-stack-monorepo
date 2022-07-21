<route lang="yaml">
meta:
  auth: guest
</route>

<script setup lang="ts">
import { SchemaOf, object as yupObject, string as yupString } from 'yup'
import { ResetPasswordInput } from '@oku/api'

const passwordMatchRegexp
    = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const version = ref(import.meta.env.VITE_APP_VERSION)
const schema: SchemaOf<ResetPasswordInput> = yupObject({
  password: yupString()
    .required()
    .matches(passwordMatchRegexp, t('resetPassword.password_match_regexp')),
  repeatPassword: yupString()
    .required()
    .matches(passwordMatchRegexp, t('resetPassword.password_match_regexp')),
  code: yupString().required(t('code_required')),
})

const { form, onInvalidSubmit } = useFormSection<ResetPasswordInput>(schema, {
  code: route.query.code as string,
  password: '',
  repeatPassword: '',
})

const success = ref(false)

const { mutate, loading, onDone } = useResetPasswordMutation({})
onDone((res) => {
  if (res.data && res.data.resetPassword)
    router.push('/auth/login')
})
const onSubmit = form.handleSubmit(async (values) => {
  mutate({
    data: {
      ...values,
      code: route.query.code as string,
    },
  })
}, onInvalidSubmit)
</script>

<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <div class="grid w-full p-4">
        <div class="mb-10">
          <img class="h-12 w-auto" src="/logo.png" alt="Workflow">
          <h2 class="mt-6 text-2xl font-extrabold">
            {{ t('forgot.heading') }}
          </h2>
          <p class="mt-2 text-sm opacity-50">
            {{ t('forgot.sub_heading') }}
          </p>
        </div>
        <FormSection v-show="!success" @oku-submit="onSubmit">
          <template #form>
            <div class="col-span-full">
              <FormInputWithValidation
                id="current_code"
                :placeholder="t('resetPassword.input')"
                name="code"
                type="text"
                :label="t('resetPassword.input')"
              />
            </div>
            <div class="col-span-full">
              <FormInputWithValidation
                id="current_email"
                :placeholder="t('resetPassword.new_password')"
                name="password"
                type="text"
                :label="t('resetPassword.new_password')"
                autocomplete="password"
              />
            </div>
            <div class="col-span-full">
              <FormInputWithValidation
                id="current_repeat_password"
                :placeholder="t('resetPassword.confirm_password')"
                name="repeatPassword"
                type="text"
                :label="t('resetPassword.confirm_password')"
                autocomplete="password"
              />
            </div>
          </template>
          <template #actions>
            <div class="mb-8 w-full">
              <NButton
                attr-type="submit"
                block
                type="success"
                :loading="loading"
                :disabled="form.isSubmitting.value"
                :class="{ 'opacity-25': form.isSubmitting.value }"
                @keypress.enter="onSubmit"
              >
                {{ t('resetPassword.change_password') }}
              </NButton>
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
              <button class="text-dusk-500 mx-auto font-bold">
                Version {{ version }}
              </button>
            </div>
          </div>
        </FormSection>
        <OkuButton> asdas </OkuButton>
        <div v-show="success">
          <div class="text-center">
            <h2 class="text-2xl font-extrabold text-gray-900">
              {{ t('forgot.check_email') }}
            </h2>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>
