import { ref } from 'vue';

const toasts = ref([]);
let toastId = 0;

export function useToast() {
  const addToast = (toast) => {
    const id = toastId++;
    toasts.value.push({ id, ...toast });
    return id;
  };

  const removeToast = (id) => {
    const index = toasts.value.findIndex(t => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const success = (title, message, duration = 4000) => {
    return addToast({ type: 'success', title, message, duration });
  };

  const error = (title, message, duration = 4000) => {
    return addToast({ type: 'error', title, message, duration });
  };

  const warning = (title, message, duration = 4000) => {
    return addToast({ type: 'warning', title, message, duration });
  };

  const info = (title, message, duration = 4000) => {
    return addToast({ type: 'info', title, message, duration });
  };

  return {
    toasts,
    success,
    error,
    warning,
    info,
    removeToast
  };
}