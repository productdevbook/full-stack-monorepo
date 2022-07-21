<route lang="yaml">
meta:
  auth: guest
</route>

<script setup lang="ts">
import {
  SchemaOf,
  boolean as yupBoolean,
  object as yupObject,
  string as yupString,
} from 'yup'

import { SplashScreen } from '@capacitor/splash-screen'

import {
  AdMob,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
} from '@capacitor-community/admob'
import { SignInInput } from '@oku/api'
const { login, authInit } = useAuth()
const router = useRouter()
const { t } = useI18n()
const version = ref(import.meta.env.VITE_APP_VERSION)
const schema: SchemaOf<SignInInput> = yupObject({
  email: yupString().required().email(),
  password: yupString()
    .required()
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      t('profile.settings.password_matches'),
    ),
  rememberMe: yupBoolean().required(),
  isCookies: yupBoolean().required(),
})

const { form, onInvalidSubmit } = useFormSection<SignInInput>(schema, {
  email: 'hi@productdevbook.com',
  password: '}c3!c+zs6~X+eJ)q',
  isCookies: false,
  rememberMe: false,
})

const { tError } = useToastWeb()

const isLoading = ref(false)
const userStore = useUserStore()
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
      router.push(res)
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

const fixIOS = () => {
  // fix: https://github.com/ionic-team/ionic-framework/issues/23335
  if (isPlatform('ios')) {
    const emailInput = document.getElementById('emailInput')
    const passwordInput = document.getElementById('passwordInput')
    if (emailInput) {
      emailInput.addEventListener('change', (ev: Event) => {
        requestAnimationFrame(() => {
          form.values.email = (ev.target as HTMLInputElement).value
        })
      })
    }
    if (passwordInput) {
      passwordInput.addEventListener('change', (ev: Event) => {
        requestAnimationFrame(() => {
          form.values.password = (ev.target as HTMLInputElement).value
        })
      })
    }
  }
}

async function banner(): Promise<void> {
  const options: BannerAdOptions = {
    adId: import.meta.env.VITE_AD_ID,
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 60,
    isTesting: true,
    // npa: true
  }
  return await AdMob.showBanner(options)
}

const { init } = useAppStore()
const nextLogin = () => {
  router.push('/app/home')
  setTimeout(async () => {
    if (isPlatform('capacitor')) {
      SplashScreen.hide()
      await banner()
      init()
    }
  }, 1000)
}

const checkLogin = async () => {
  const user = userStore.user
  if (user.id) {
    nextLogin()
  }
  else {
    SplashScreen.hide()
    fixIOS()
  }
}

onMounted(async () => {
  await authInit()
  await checkLogin()
})
</script>

<template>
  <IonPage>
    <IonContent :fullscreen="true">
      <div class="grid w-full p-4">
        <div class="mb-10">
          <img class="h-12 w-auto" src="/logo.png" alt="productdevbook">
          <h2 class="mt-6 text-2xl font-extrabold">
            Sign in to your account
          </h2>
          <p class="mt-2 text-sm text-gray-600">
            productdevbook mobile app
          </p>
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
          <div class="flex flex-col items-center justify-center">
            <div>
              <router-link
                to="/auth/signup"
                class="ion-margin-top text-muted-blue-500 font-semibold underline"
              >
                {{ t('login.create-new') }}
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
