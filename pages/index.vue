<template>
    <div class="home">
        <div class="home__inner">
            <h1>Hey, i'm Paul.</h1>
            <p>A Front-end developer, hobbyist photographer and self-confessed tech nerd working at <a href="https://www.hp.com">HP</a> <del>in London</del> and WFH</p>
        </div>
    </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
    components: {
        Logo
    }
}
</script>

<style lang="scss">
.home {
    background: url('~static/header.jpeg') no-repeat 50% 50%;
    background-size: cover;
    color: #FFF;
    position: relative;
    overflow: hidden;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    &__inner {
        padding: 100px 20px;
        max-width: 60vw;
    }
}
</style>
