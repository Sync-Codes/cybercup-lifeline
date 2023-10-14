<template>
  <div class="text-white">G</div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

useHead({
  title: "LifeLine",
});

const db = useSupabaseClient();
const router = useRouter();

async function getData() {

}

onMounted(async () => {
  console.log("mounted");
  getData();
});
</script>
