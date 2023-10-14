<script setup>
useHead({
  title: "LifeLine - Login",
});

const client = useSupabaseAuthClient();
const router = useRouter();

const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const errorMessage = ref(null);
const successMessage = ref(null);

async function signUpWithEmail() {
  try {
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
    });
    router.push("/");
    console.log("signup", data);
    if (error) throw error;
  } catch (error) {
    errorMessage.value = error.message;
  }
}
async function signUpWithGoogle() {
  try {
    const { data, error } = await client.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    router.push("/");
    console.log("signup", data);
    if (error) throw error;
  } catch (error) {
    errorMessage.value = error.message;
  }
}
</script>

<template>
  <div class="flex items-center justify-center">
    <main
      class="bg-white rounded-md w-[32%] min-h-[60vh] mt-5 p-10 space-y-5 last:space-y-2"
    >
      <h1 class="font-satoshi text-3xl font-bold text-center mb-[3rem]">
        Welcome to LifeLine
      </h1>
      <form
        @submit.prevent="signUpWithEmail"
        class="flex flex-col m-auto font-satoshi"
      >
        <label class="font-semibold mb-2" for="email">Email</label>
        <input
          type="email"
          placeholder="john.doe@example.com"
          @keyup.enter="signUpWithEmail"
          v-model="email"
          class="p-3 bg-gray-100 border-[2px] border-gray-300 rounded focus:outline-none focus:border-purple-300 mb-5"
        />
        <label class="font-semibold mb-2" for="password">Password</label>
        <input
          type="password"
          placeholder="Must be atleast 8 characters"
          @keyup.enter="signUpWithEmail"
          v-model="password"
          class="p-3 bg-gray-100 border-[2px] border-gray-300 rounded focus:outline-none focus:border-purple-300 mb-5"
        />
        <div class="names flex justify-between">
          <div class="flex flex-col">
            <label class="font-semibold mb-2" for="firstName">First Name</label>
            <input
              type="name"
              placeholder="John"
              @keyup.enter="signUpWithEmail"
              v-model="firstName"
              class="p-3 bg-gray-100 border-[2px] border-gray-300 rounded focus:outline-none focus:border-purple-300 mb-5"
            />
          </div>
          <div class="flex flex-col">
            <label class="font-semibold mb-2" for="lastName">Last Name</label>
            <input
              type="name"
              placeholder="Doe"
              @keyup.enter="signUpWithEmail"
              v-model="lastName"
              class="p-3 bg-gray-100 border-[2px] border-gray-300 rounded focus:outline-none focus:border-purple-300 mb-5"
            />
          </div>
        </div>
        <div
          class="text-green-500 font-mono text-sm font-medium mb-3"
          v-if="successMessage"
        >
          {{ successMessage }}
        </div>
        <div class="text-red-500 font-mono font-medium mb-3" v-else>
          {{ errorMessage }}
        </div>
        <button
          type="submit"
          class="p-3 bg-[#6C63FF] text-white rounded hover:bg-gray-900 focus:outline-none focus:ring focus:border-blue-300 w-full font-satoshi ease-in-out delay-100 transition-all duration-200"
        >
          Continue with Email
        </button>
      </form>
      <div class="flex items-center space-x-4">
        <hr class="flex-1 border-gray-300" />
        <div class="text-gray-500 font-bold">OR</div>
        <hr class="flex-1 border-gray-300" />
      </div>
      <!-- Add your social sign-up buttons here -->

      <button
        @click="signUpWithGoogle"
        class="p-3 bg-[#6C63FF] text-white rounded hover:bg-gray-900 focus:outline-none focus:ring focus:border-blue-300 w-full font-satoshi ease-in-out delay-100 transition-all duration-200"
      >
        <Icon class="mr-1" name="mdi:google" /> Sign in with Google
      </button>

      <p class="w-full text-center text-sm text-black mt-6 font-satoshi">
        Haven't registered yet?
        <nuxt-link to="/login">
          <span
            class="font-semibold hover:underline hover:text-[#6C63FF] ease-in-out transition-all duration-300"
            >Register</span
          >
        </nuxt-link>
      </p>
    </main>
  </div>
</template>
