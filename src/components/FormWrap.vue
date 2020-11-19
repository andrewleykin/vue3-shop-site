<template>
  <form @submit.prevent="submitHandler">
    <div class="p-fluid">
      <slot />
    </div>
    <slot name="actions">
      <BButton label="Отправить" class="p-button-success" type="submit" />
    </slot>
  </form>
</template>

<script>
export default {
  name: 'FormWrap',
  emits: ['submited'],
  setup (props, { emit }) {
    const submitHandler = () => {
      emit('submited')
    }

    return {
      submitHandler
    }
  }
}
</script>
