<script setup lang="ts">
import { ref } from 'vue';
import baseConfigRaw from '../base.conf?raw';

const benefits = [
    ['Decision support', 'Clear comparisons and practical guidance help you choose the right next step.'],
    ['Continuous accountability', 'Stay informed from the first conversation to the final walkthrough.'],
    ['Expert guidance', 'Helpful resources and trusted local pros for every stage of the job.']
];

const projects = [
    ['Kitchen Remodel', 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=1200&q=85'],
    ['Bathroom Remodel', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85'],
    ['Flooring', 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85'],
    ['Roofing', 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=85']
];

const guides = [
    ['2025 kitchen remodel costs', 'Understand the details that change a renovation quote.'],
    ['Project timeline 101', 'Know what to expect before work begins.'],
    ['Contractor hiring checklist', 'The questions worth asking before you hire.'],
    ['Know the red flags', 'Avoid surprises and protect your project.']
];

type Category = { id: string; name: string };

const baseConfig = JSON.parse(baseConfigRaw) as { taxonomy?: { categories?: Category[] } };
const categories = baseConfig.taxonomy?.categories ?? [];
const selectedCategory = ref('');
const zipcode = ref('');
const router = useRouter();

const categorySlug = (category: string) => category
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[_\s]+/g, '-')
    .replace(/[^a-z0-9-]+/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

const startProject = () => {
    if (!selectedCategory.value || !/^\d{5}$/.test(zipcode.value)) return;

    router.push({
        path: `/${categorySlug(selectedCategory.value)}`,
        query: { zipcode: zipcode.value }
    });
};
</script>

<template>
    <div class="min-h-screen overflow-x-hidden bg-white font-sans text-slate-950">
        <section class="relative isolate overflow-hidden bg-yellow-300">
            <div class="mx-auto grid max-w-7xl items-end gap-7 px-5 pb-0 pt-12 sm:px-8 lg:grid-cols-[.95fr_1.05fr]">
                <div class="pb-10 lg:pb-20">
                    <p class="text-[10px] font-black tracking-[0.2em] text-slate-700">YOUR HOME PROJECT, SIMPLIFIED</p>
                    <h1 class="mt-5 max-w-lg text-5xl font-black leading-[.96] tracking-tight sm:text-6xl">A better way
                        to hire for your home</h1>
                    <p class="mt-6 max-w-md text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">You are in
                        control from the first conversation to the final walkthrough. Compare trusted local contractors
                        for the job you want done.</p>
                    <div class="mt-8 flex flex-wrap gap-3">
                        <NuxtLink
                            class="bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800"
                            to="/form/">Get started</NuxtLink>
                        <a class="border border-slate-950 bg-yellow-200 px-5 py-3 text-sm font-black transition hover:bg-white"
                            href="#projects">Explore projects</a>
                    </div>
                </div>
                <div class="relative h-80 sm:h-[440px]">
                    <div class="absolute right-0 top-0 h-[87%] w-[88%] bg-yellow-100"></div>
                    <img class="absolute bottom-0 right-[-1.25rem] h-[93%] w-[96%] object-cover shadow-2xl sm:right-0"
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=90"
                        alt="Modern home exterior">
                    <div
                        class="absolute bottom-5 left-0 max-w-48 border-l-4 border-yellow-400 bg-white p-3 shadow-lg sm:left-5 sm:p-4">
                        <p class="text-[9px] font-black tracking-[.16em] text-slate-500">BUILT FOR HOMEOWNERS</p>
                        <p class="mt-1 text-sm font-black leading-5">Clear choices for every project.</p>
                    </div>
                </div>
            </div>

            <div class="relative z-10 mx-auto -mb-11 max-w-6xl px-5 sm:px-8">
                <div
                    class="grid divide-y divide-slate-200 bg-white px-5 py-3 shadow-xl sm:grid-cols-4 sm:divide-x sm:divide-y-0">
                    <div v-for="item in ['Fast matching', 'Vetted pros', 'Licensed & insured', 'Managed choices']"
                        :key="item" class="flex items-center gap-3 py-3 sm:px-3"><span
                            class="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan-50 text-xs font-black text-cyan-700">✓</span><span
                            class="text-xs font-bold">{{ item }}</span></div>
                </div>
            </div>
        </section>

        <main>
            <section class="mx-auto max-w-7xl px-5 pb-20 pt-28 sm:px-8">
                <div class="mx-auto max-w-2xl text-center">
                    <p class="text-[10px] font-black tracking-[.2em] text-orange-500">WHY CHOOSE US</p>
                    <h2 class="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Where homeowner confidence comes
                        first</h2>
                </div>
                <div class="mt-12 grid gap-10 md:grid-cols-3">
                    <article v-for="([title, text], index) in benefits" :key="title"><span
                            class="text-5xl font-black text-slate-100">0{{ index + 1 }}</span>
                        <h3 class="mt-2 text-base font-black">{{ title }}</h3>
                        <p class="mt-3 text-sm leading-6 text-slate-600">{{ text }}</p><a
                            class="mt-4 inline-block text-xs font-black text-cyan-700" href="#quote">Start your project
                            +</a><img class="mt-6 aspect-[4/3] w-full object-cover"
                            :src="['https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=750&q=80', 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=750&q=80', 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=750&q=80'][index]"
                            :alt="title">
                    </article>
                </div>
            </section>

            <section class="relative isolate overflow-hidden bg-slate-900"><img
                    class="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
                    src="https://images.unsplash.com/photo-1600585152915-d208bec867a1?auto=format&fit=crop&w=1800&q=85"
                    alt="Bright modern living room">
                <div class="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
                    <div class="max-w-xl border-2 border-white p-7 text-white sm:p-10">
                        <p class="text-2xl font-black leading-tight sm:text-3xl">We're proudly connecting homeowners
                            with <span class="text-cyan-300">trusted contractors.</span> We have rigorous standards and
                            top-rated experts.</p>
                        <div class="mt-8 flex flex-wrap gap-7 text-yellow-300">
                            <div><b class="block text-2xl">1M+</b><span
                                    class="text-[9px] font-black tracking-wider">PROJECTS COMPLETED</span></div>
                            <div><b class="block text-2xl">98%</b><span
                                    class="text-[9px] font-black tracking-wider">WOULD RECOMMEND</span></div>
                            <div><b class="block text-2xl">500K+</b><span
                                    class="text-[9px] font-black tracking-wider">HAPPY HOMEOWNERS</span></div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="mx-auto max-w-7xl px-5 py-20 sm:px-8">
                <div class="mx-auto max-w-xl text-center">
                    <p class="text-[10px] font-black tracking-[.2em] text-orange-500">HOW IT WORKS</p>
                    <h2 class="mt-3 text-3xl font-black tracking-tight">Simple steps to hire the right contractor</h2>
                </div>
                <div class="mt-12 grid gap-4 md:grid-cols-3">
                    <article
                        v-for="(step, index) in ['Describe your project', 'Hire with confidence', 'Compare quotes & reviews']"
                        :key="step" class="relative min-h-48 border border-slate-200 p-7"><span
                            class="absolute right-5 top-2 text-5xl font-black text-slate-100">0{{ index + 1
                            }}</span><span
                            class="grid h-7 w-7 place-items-center bg-blue-950 text-xs font-black text-white">{{ index +
                            1 }}</span>
                        <h3 class="mt-9 text-base font-black">{{ step }}</h3>
                        <p class="mt-3 text-sm leading-6 text-slate-600">Tell us what you need and get the information
                            to move forward with clarity.</p>
                    </article>
                </div>
                <div class="mt-8 text-center">
                    <NuxtLink
                        class="inline-block bg-yellow-300 px-6 py-3 text-sm font-black transition hover:bg-yellow-400"
                        to="/form/">Get a quote today +</NuxtLink>
                </div>
            </section>

            <section id="projects" class="bg-yellow-200 px-5 py-20 sm:px-8">
                <div class="mx-auto max-w-7xl">
                    <div class="mx-auto max-w-xl text-center">
                        <p class="text-[10px] font-black tracking-[.2em] text-orange-500">BROWSE PROJECTS</p>
                        <h2 class="mt-3 text-3xl font-black tracking-tight">Explore by project</h2>
                    </div>
                    <div class="mt-10 grid gap-3 md:grid-cols-2">
                        <article v-for="([title, image], index) in projects" :key="title"
                            class="group relative min-h-56 overflow-hidden md:min-h-64"
                            :class="index === 0 ? 'md:row-span-2 md:min-h-[524px]' : ''"><img
                                class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                :src="image" :alt="title">
                            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 to-transparent"></div>
                            <div class="absolute bottom-0 left-0 p-6 text-white">
                                <h3 class="text-xl font-black">{{ title }}</h3>
                                <p class="mt-1 text-xs">Find local pros for your next renovation</p>
                            </div><span
                                class="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-white text-sm font-black">+</span>
                        </article>
                    </div>
                </div>
            </section>

            <section class="mx-auto max-w-7xl px-5 py-20 sm:px-8">
                <div class="mx-auto max-w-xl text-center">
                    <p class="text-[10px] font-black tracking-[.2em] text-orange-500">HOMEOWNER RESOURCES</p>
                    <h2 class="mt-3 text-3xl font-black tracking-tight">Expert guidance for your project</h2>
                </div>
                <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <article v-for="([title, text], index) in guides" :key="title"
                        class="relative min-h-56 overflow-hidden border border-slate-200 p-6"
                        :class="index % 2 === 0 ? 'bg-yellow-300' : 'bg-white'"><span
                            class="absolute -right-4 -top-5 text-8xl font-black text-white/50">0{{ index + 1 }}</span>
                        <h3 class="relative max-w-40 text-base font-black leading-5">{{ title }}</h3>
                        <p class="relative mt-5 text-xs leading-5 text-slate-700">{{ text }}</p><a
                            class="absolute bottom-6 text-xs font-black text-cyan-800" href="#quote">Read guide +</a>
                    </article>
                </div>
            </section>
        </main>

        <section id="quote" class="bg-neutral-900 text-white">
            <div class="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1fr]">
                <div>
                    <p class="text-[10px] font-black tracking-[.2em] text-yellow-300">GET STARTED TODAY</p>
                    <h2 class="mt-3 max-w-sm text-3xl font-black leading-tight">Your next home project starts here</h2>
                    <p class="mt-4 max-w-md text-sm leading-6 text-slate-400">Get matched with trusted contractors in your area today. No hassle, no obligation.</p>
                    <ul class="mt-7 space-y-3 text-sm text-slate-200">
                        <li>✓ 100% free to get started</li>
                        <li>✓ No obligation, zero-risk</li>
                        <li>✓ Trusted & verified contractors</li>
                    </ul>
                </div>
                <form class="bg-white p-6 text-slate-950 shadow-2xl" @submit.prevent="startProject">
                    <p class="text-lg font-black">Get your free quote</p>
                    <label class="mt-5 block text-xs font-bold">
                        Project type
                        <select v-model="selectedCategory" class="mt-2 w-full border-b border-slate-300 bg-white px-0 py-2 text-sm outline-none focus:border-cyan-700" required>
                            <option disabled value="">Select a project</option>
                            <option v-for="category in categories" :key="category.id + category.name" :value="category.name">
                                {{ category.name }}
                            </option>
                        </select>
                    </label>
                    <label class="mt-4 block text-xs font-bold">
                        Zip code
                        <input v-model="zipcode" class="mt-2 w-full border-b border-slate-300 px-0 py-2 text-sm outline-none focus:border-cyan-700" inputmode="numeric" maxlength="5" pattern="[0-9]{5}" placeholder="10001" required type="text">
                    </label>
                    <button class="mt-6 block w-full bg-yellow-300 px-4 py-3 text-center text-sm font-black transition hover:bg-yellow-400" type="submit">
                        Get a quote +
                    </button>
                    <p class="mt-3 text-[10px] leading-4 text-slate-500">By continuing, you agree to receive helpful project updates.</p>
                </form>
            </div>
        </section>
    </div>
</template>
