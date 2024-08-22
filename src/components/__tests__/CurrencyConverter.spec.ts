import { mount } from '@vue/test-utils'
import CurrencyConverter from '../CurrencyConverter.vue'
import { describe, expect, it } from 'vitest'

describe('CurrencyConverter.vue', () => {
  it('renders correctly', async () => {
    const wrapper = mount(CurrencyConverter)
    await wrapper.vm.$nextTick()

    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.findAll('select').length).toBe(2)
    expect(wrapper.find('button').exists()).toBe(true)
    expect(wrapper.find('.text-4xl').exists()).toBe(true)
  })
})
