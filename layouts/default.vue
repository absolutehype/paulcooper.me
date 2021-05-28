<template>
    <div class="wrapper">
        <nuxt />
        <Footer />
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
.wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>
