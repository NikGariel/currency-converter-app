<template>
  <div class="app">
    <h1 class="text-4xl font-bold text-center my-8">Currency Converter</h1>
    <CurrencyConverter />
  </div>
</template>

<script>
import CurrencyConverter from './components/CurrencyConverter.vue'

export default {
  components: {
    CurrencyConverter
  }
}
</script>
