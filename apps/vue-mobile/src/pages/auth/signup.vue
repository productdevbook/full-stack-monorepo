<route lang="yaml">
meta:
  auth: guest
</route>

<script setup lang="ts">
import { SignUpInput } from '@oku/api'
import {
  SchemaOf,
  boolean as yupBoolean,
  object as yupObject,
  ref as yupRef,
  string as yupString,
} from 'yup'

const { t } = useI18n()
const dev = import.meta.env.DEV
const router = useRouter()
const version = ref(import.meta.env.VITE_APP_VERSION)

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
    .oneOf([true], t('signup.error_terms')),
})

const { form, onInvalidSubmit } = useFormSection<SignUpInput>(
  schema,
  dev
    ? {
        displayName: 'test',
        email: 'hi@productdevbook.com',
        password: '}c3!c+zs6~X+eJ)q',
        confirmPassword: '}c3!c+zs6~X+eJ)q',
        name: 'test',
        username: 'test',
        isTermsAccepted: true,
      }
    : ({} as any),
)

const { mutate, loading, onDone } = useSignupMutation({
  variables: {
    data: {} as any,
  },
})

onDone((data) => {
  useToast(t('signup.success'), { color: 'success' })
  router.push('/auth/login')
})

const onSubmit = form.handleSubmit((values) => {
  mutate({ data: values })
}, onInvalidSubmit)
</script>

<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <div class="grid w-full p-4">
        <div class="mb-10">
          <img class="h-12 w-auto" src="/logo.png" alt="Workflow">
          <h2 class="mt-6 text-2xl font-extrabold">
            Signup to start using the app
          </h2>
          <p class="mt-2 text-sm">
            productdevbook mobile app
          </p>
        </div>
        <FormSection @oku-submit="onSubmit">
          <template #form>
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

            <div class="col-span-full">
              <FormCheckboxWithValidation
                id="a_isTermsAccepted"
                name="isTermsAccepted"
                :label="t('signup.terms')"
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
                {{ t('signup.submit') }}
              </NButton>
            </div>
          </template>

          <div class="mb-10 flex w-full flex-col items-center justify-center">
            <div>
              <router-link
                to="/auth/login"
                class="ion-margin-top text-muted-blue-500 font-semibold underline"
              >
                {{ t('signup.have_account_login') }}
              </router-link>
            </div>
            <div class="mx-auto mt-4 text-center">
              <button class="text-dusk-500 mx-auto font-bold">
                Version {{ version }}
              </button>
            </div>
          </div>
        </FormSection>
      </div>
    </IonContent>
  </IonPage>
</template>
