<route lang="yaml">
meta:
  auth: guest
</route>

<script setup lang="ts">
import { SchemaOf, object as yupObject, string as yupString } from 'yup'
import { ForgotPasswordInput } from '@oku/api'

const { t } = useI18n()
const version = ref(import.meta.env.VITE_APP_VERSION)
const schema: SchemaOf<ForgotPasswordInput> = yupObject({
  email: yupString().required().email(),
})

const { form, onInvalidSubmit } = useFormSection<ForgotPasswordInput>(schema, {
  email: 'hi@productdevbook.com',
})
const successSendEmail = ref(false)
const { mutate, loading, onDone } = useForgotPasswordMutation({})
onDone((res) => {
  if (res.data && res.data.forgotPassword)
    successSendEmail.value = true
})
const onSubmit = form.handleSubmit(async (values) => {
  mutate({ data: values })
}, onInvalidSubmit)
const router = useRouter()
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
                {{ t('global.version') }} {{ version }}
              </button>
            </div>
          </div>
        </FormSection>
        <div v-show="successSendEmail">
          <div class="text-center">
            <h4 class="mb-10">
              {{ t('forgot.check_email') }}
            </h4>
            <AtomButton
              block
              type="success"
              @click="router.push('/auth/login')"
            >
              {{ t('login.login-in') }}
            </AtomButton>
          </div>
        </div>
      </div>
    </IonContent>
  </IonPage>
</template>
