import { useForm } from 'vee-validate'
import type { Ref } from 'vue'
import type { SchemaOf } from 'yup'

type MaybeRef<T> = Ref<T> | T
export function useFormSection<T>(
  schema: MaybeRef<SchemaOf<T> | undefined>,
  initialValues?: MaybeRef<T>,
) {
  const { ...options } = useForm({
    validationSchema: schema,
    initialValues,
  })
  function onInvalidSubmit<T>({ errors }: { errors: T }): void {
    const fieldName = Object.keys(errors)[0]
    const fieldEl: HTMLInputElement | null = document.querySelector(
      `#${fieldName}`,
    )
    fieldEl?.focus?.()
    fieldEl?.scrollIntoView()
  }

  return {
    form: options,
    onInvalidSubmit,
  }
}
export default useFormSection
