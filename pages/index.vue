<template>
    <div class="Home">
        <header class="Masthead">
            <div class="Masthead__inner">
                <img src="~static/avatar.jpeg" class="Masthead__avatar" alt="Paul Cooper Profile Picture" />
                <section class="Masthead__content">
                    <h1>Paul Cooper</h1>
                    <i18n path="HOME_SUMMARY" tag="p">
                        <template v-slot:location>
                            <a href="https://en.wikipedia.org/wiki/London" :title="$t('LOCATION')">{{ $t('LOCATION_SHORT') }}</a>
                        </template>
                        <template v-slot:company>
                            <a href="https://www.hp.com" title="Hewlett Packard">HP</a>
                        </template>
                    </i18n>
                </section>
            </div>
        </header>
        <div class="Content">
            <p>{{ $t('HOME_BODY') }}</p>
            <ul class="BrandList">
                <li class="BrandList__item">
                    <img src="~/assets/svg/google.svg" alt="Google" />
                </li>
                <li class="BrandList__item">
                    <img src="~/assets/svg/barclays.svg" alt="Tesco" />
                </li>
                <li class="BrandList__item">
                    <img src="~/assets/svg/tesco.svg" alt="Tesco" />
                </li>
                <li class="BrandList__item">
                    <img src="~/assets/svg/cruk.svg" alt="Cancer Research UK" />
                </li>
                <li class="BrandList__item">
                    <img src="~/assets/svg/att.svg" alt="AT&T" />
                </li>
                <li class="BrandList__item">
                    <img src="~/assets/svg/youtube.svg" alt="YouTube" />
                </li>
                <li class="BrandList__item BrandList__item--square">
                    <img src="~/assets/svg/hp.svg" alt="Hewlett Packard" />
                </li>
                <li class="BrandList__item">
                    <img src="~/assets/svg/redbull.svg" alt="Red Bull" />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
    components: {
        Logo,
    },
}
</script>

<style lang="scss">

</style>
