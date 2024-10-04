<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 class="text-3xl font-bold mb-6 text-red-600">Pomodoro Timer</h1>
      <div class="text-6xl font-bold mb-8 text-red-500">{{ formatTime(time) }}</div>
      <div class="flex justify-center space-x-4">
        <button
          @click="toggleTimer"
          class="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
        >
          <component :is="isActive ? PauseIcon : PlayIcon" class="h-6 w-6 inline" />
        </button>
        <button
          @click="resetTimer"
          class="bg-red-200 text-red-800 px-6 py-2 rounded-full hover:bg-red-300 transition-colors"
        >
          <ArrowPathIcon class="h-6 w-6 inline" />
        </button>
      </div>
      <div class="mt-8 text-red-700">
        <ClockIcon class="h-6 w-6 inline mr-2" />
        Focus on your task!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
import { PlayIcon, PauseIcon, ArrowPathIcon, ClockIcon } from '@heroicons/vue/24/solid'

const time = ref(25 * 60)
const isActive = ref(false)
let interval

const toggleTimer = () => {
  isActive.value = !isActive.value
  if (isActive.value && time.value > 0) {
    interval = setInterval(() => {
      time.value--
      if (time.value === 0) {
        isActive.value = false
        clearInterval(interval)
      }
    }, 1000)
  } else {
    clearInterval(interval)
  }
}

const resetTimer = () => {
  clearInterval(interval)
  time.value = 25 * 60
  isActive.value = false
}

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}

onUnmounted(() => {
  clearInterval(interval)
})
</script>