<template>
    <footer class="Footer">
        <div class="Footer__inner">
            <nuxt-link class="Footer__logo" to="/">Boatfront</nuxt-link>
            <aside class="Footer__aside">
                <ul class="Footer__nav">
                    <li
                        v-for="locale in availableLocales"
                        :key="locale.code"
                        class="Footer__nav-item"
                    >
                        <nuxt-link
                            :to="switchLocalePath(locale.code)"
                            class="Footer__link"
                            >{{ locale.name }}</nuxt-link
                        >
                    </li>
                </ul>
                <p class="Footer__copyright">{{ $t('FOOTER_COPYRIGHT') }}</p>
            </aside>
            <div v-if="$appVersion" class="Footer__version">
                v{{ $appVersion }}
            </div>
        </div>
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
