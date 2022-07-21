<script setup lang="ts">
const { getIsPro } = useAppStore()
// const {token, getUser} = useAuth()
</script>

<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle size="large">
          Tab 1
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent color="light">
      <IonButton router-link="/asdasdas">
        asd
      </IonButton>
      {{ getIsPro }}
      <div class="text-blue-500 dark:text-yellow-500" />
    </IonContent>
  </IonPage>
</template>

<route lang="yaml">
meta:
  option: tabs
</route>
