<script setup>
useHead({
  title: "LifeLine - Register",
});

const client = useSupabaseAuthClient();
const db = useSupabaseClient();
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
    });
    router.push("/");

    // adding new user to database
    db.from("users")
      .insert([
        {
          first_name: firstName.value,
          last_name: lastName.value,
          email: email.value,
        },
      ])
      .select()
      .then((data) => {
        console.log("db data:", data);
      });

    console.log("signup", data);
    if (error) throw error;
  } catch (error) {
    errorMessage.value = error.message;
  }
}
async function signUpWithGoogle() {
  console.log("you are at signup google");

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
async function signInWithEmail() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
}
</script>

<template>
  <div class="flex items-center justify-center">
    <main
      class="bg-white shadow-lg rounded-md w-[32%] min-h-[60vh] mt-5 p-10 space-y-5 last:space-y-2"
    >
      <h1 class="font-satoshi text-3xl font-bold text-center mb-[3rem]">
        <svg
          width="181"
          height="128"
          viewBox="0 0 181 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 127C46.6667 126.333 143.2 111 160 55C181 -15 97 -8 93.5 23.5C90 55 138 127 181 127"
            stroke="#000"
          />
        </svg>
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
        <Icon class="mr-1" name="mdi:google" /> Sign up with Google
      </button>

      <p class="w-full text-center text-sm text-black mt-6 font-satoshi">
        Already registered?
        <nuxt-link to="/login">
          <span
            class="font-semibold hover:underline hover:text-[#6C63FF] ease-in-out transition-all duration-300"
            >Login</span
          >
        </nuxt-link>
      </p>
    </main>
  </div>
</template>
