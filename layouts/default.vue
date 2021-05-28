<template>
    <div class="Wrapper">
        <nuxt />
        <!-- <Footer /> -->
    </div>
</template>

<script>
import Footer from '../components/Footer';

export default {
    components: {
        Footer
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
