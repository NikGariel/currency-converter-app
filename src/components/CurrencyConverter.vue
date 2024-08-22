<template>
  <div class="container mx-auto p-4">
    <div class="form-control">
      <label class="label">
        <span class="label-text">Amount</span>
      </label>
      <input
        v-model.number="amount"
        class="input input-bordered"
        placeholder="Enter amount"
        type="number"
      />
    </div>

    <div class="form-control mt-4">
      <div class="flex gap-2 w-full">
        <!-- Выбор первой валюты -->
        <select v-model="fromCurrency" class="select select-bordered flex-1 text-center text-2xl">
          <option v-for="(rate, currency) in rates" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>

        <!-- Кнопка смены местами валют -->
        <button class="btn btn-outline flex-1 text-3xl" @click="swapCurrencies">⇄</button>

        <!-- Выбор второй валюты -->
        <select v-model="toCurrency" class="select select-bordered flex-1 text-center text-2xl">
          <option v-for="(rate, currency) in rates" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
      </div>
    </div>

    <div class="mt-4 w-full flex justify-center items-center">
      <span class="text-4xl mx-auto">{{
        tweened.number.toLocaleString('ru-RU', { style: 'currency', currency: toCurrency })
      }}</span>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import gsap from 'gsap'
import { getRates } from '../api/currencyApi'

export default {
  setup() {
    const rates = ref({})
    const amount = ref(0)

    let defaultCurrency = 'USD'
    if (typeof navigator !== 'undefined') {
      const userLocale = navigator.language || navigator.userLanguage || 'en-US'
      defaultCurrency =
        new Intl.NumberFormat(userLocale, { style: 'currency', currency: 'USD' }).resolvedOptions()
          .currency || 'USD'
    }

    const fromCurrency = ref(defaultCurrency)
    const toCurrency = ref('EUR')
    const tweened = reactive({ number: 0 })

    const convertedAmount = computed(() => {
      if (rates.value[fromCurrency.value] && rates.value[toCurrency.value]) {
        return (
          (amount.value / rates.value[fromCurrency.value]) *
          rates.value[toCurrency.value]
        ).toFixed(2)
      }
      return 0
    })

    const swapCurrencies = () => {
      const temp = fromCurrency.value
      fromCurrency.value = toCurrency.value
      toCurrency.value = temp
    }

    watch(convertedAmount, (newVal) => {
      gsap.to(tweened, { duration: 0.5, number: parseFloat(newVal) || 0 })
    })

    const fetchRates = async () => {
      rates.value = await getRates()
    }

    onMounted(() => {
      fetchRates()
    })

    return {
      rates,
      amount,
      fromCurrency,
      toCurrency,
      tweened,
      swapCurrencies
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
}
</style>
