// Shared across components/pages and preserved through client-side navigation.
export const collectData = (formData: any = {}) => {
  const data = useState<Record<string, any>>('collectedData', () => ({}));
  data.value = { ...formData, ...data.value };
  return data;
}