<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>{{ isSignIn ? 'Sign In' : 'Sign Up' }}</h2>

      <form @submit.prevent="handleSubmit">
        <input v-model="email" type="email" placeholder="Email" required />

        <input v-model="password" type="password" placeholder="Password" required />

        <input
          v-if="!isSignIn"
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          required
        />

        <button type="submit">
          {{ isSignIn ? 'Sign In' : 'Sign Up' }}
        </button>
      </form>

      <p class="toggle">
        {{ isSignIn ? "Don't have an account?" : 'Already have an account?' }}
        <span @click="toggleForm">
          {{ isSignIn ? 'Sign Up' : 'Sign In' }}
        </span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isSignIn = ref(true)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

function toggleForm() {
  isSignIn.value = !isSignIn.value
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
}

function handleSubmit() {
  if (!isSignIn.value && password.value !== confirmPassword.value) {
    alert('Passwords do not match!')
    return
  }

  if (isSignIn.value) {
    // Ici, tu peux appeler une API de login
    console.log('Sign in with:', email.value, password.value)
  } else {
    // Ici, tu peux appeler une API de register
    console.log('Sign up with:', email.value, password.value)
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: #f2f2f2;
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.auth-card form {
  display: flex;
  flex-direction: column;
}

.auth-card input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}

.auth-card button {
  background: #42b883;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

.auth-card button:hover {
  background: #369b6d;
}

.toggle {
  text-align: center;
  margin-top: 1rem;
}

.toggle span {
  color: #42b883;
  cursor: pointer;
  margin-left: 0.3rem;
}
</style>
