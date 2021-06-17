<template>
    <div class="Wrapper">
        <nuxt />
        <Footer />
    </div>
</template>

<script>
import Footer from '../components/Footer';

export default {
    components: {
        Footer
    },
    head () {
        return this.$nuxtI18nHead()
    }
};
</script>

<style lang="scss">
.Wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
}
</style>
