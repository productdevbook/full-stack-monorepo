export const languages = (languages: any) =>
  Object.entries(languages).map(([key, value]) => ({
    label: value,
    value: key,
  }))
