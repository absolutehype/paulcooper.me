<template>
    <footer class="Footer">
        <ul class="Footer__inner">
            <li
                v-for="locale in availableLocales"
                :key="locale.code"
                class="Footer__nav-item"
            >
                <nuxt-link
                    :to="switchLocalePath(locale.code)"
                    :hreflang="locale.code"
                    class="Footer__link"
                    >{{ locale.name }}</nuxt-link
                >
            </li>
        </ul>
        <span v-if="$appVersion" class="Footer__version">
            v{{ $appVersion }}
        </span>
    </footer>
</template>

<script>
export default {
    computed: {
        availableLocales() {
            return this.$i18n.locales;
        },
        currentLocale() {
            return this.$i18n.locale;
        }
    }
};
</script>

<style></style>
