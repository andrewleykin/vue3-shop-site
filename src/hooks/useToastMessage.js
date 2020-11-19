import { useToast } from 'primevue/usetoast'

export function useToastMessage (life = 2000) {
  const toast = useToast()

  const errorToast = (message) => {
    toast.add({ severity: 'error', summary: 'Error', detail: message, life })
  }

  return { errorToast }
}
