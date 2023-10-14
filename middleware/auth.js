import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser();
  const router = useRouter();

  if (!user.value && to.path === "/") {
    // navigateTo("/signup");
    router.push("/signup");
  } else if (user.value && to.path === "/login") {
    navigateTo("/");
    router.push("/");
  }
});
