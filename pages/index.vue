<template>
    <div class="Home">
        <header class="Banner">
        <div class="Banner__inner">
            <aside class="Banner__banner">
                <img src="~static/avatar.jpeg" class="Banner__avatar" />
            </aside>
            <section class="Banner__content">
                <h1>Paul Cooper</h1>
                <p>
                    <a href="https://en.wikipedia.org/wiki/London" title="London, UK">London</a> based Front End Developer, hobbyist photographer and self-confessed
                    tech nerd working at <a href="https://www.hp.com" title="Hewlett Packard">HP</a>
                </p>
            </section>
        </div>
        </header>
        <div class="Content">
            <p>In a nutshell, i’m an ambitious and passionate front end developer. I strive to produce beautiful products that inspire and delight. I’ve a little over a decade of industry experience in both design and development. I’ve worked with great people, at some innovative companies for some industry leading brands.</p>
            <ul class="BrandList">
                <li class="BrandList__item">
                    <img src="~/assets/svg/google.svg" />
                </li>
                <li class="BrandList__item">
                    <img src="~/assets/svg/barclays.svg" />
                </li>
                <li class="BrandList__item">
                    <img src="~/assets/svg/tesco.svg" />
                </li>
                <li class="BrandList__item">
                    <img src="~/assets/svg/cruk.svg" />
                </li>
                <li class="BrandList__item">
                    <img src="~/assets/svg/att.svg" />
                </li>
                <li class="BrandList__item">
                    <img src="~/assets/svg/pret.svg" />
                </li>
                <li class="BrandList__item">
                    <img src="~/assets/svg/youtube.svg" />
                </li>
                <li class="BrandList__item">
                    <img src="~/assets/svg/redbull.svg" />
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
.Home {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.Banner {
    color: #fff;
    position: relative;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    &:after {
        position: absolute;
        content: ' ';
        background: url('~static/header.jpeg') no-repeat 50% 50%;
        background-size: cover;
        clip-path: polygon(
            0 0,
            100% 0,
            100% 100%,
            0 calc(100% - 4vw)
        );
        z-index: -1;
        width: 100%;
        height: calc(100% + 4vw);
    }

    &__inner {
        padding: 40px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;

        @media all and (min-width: 600px) {
            flex-direction: row;
            align-items: center;
            text-align: left;
            padding: 80px 40px;
        }

        @media all and (min-width: 1000px) {
            max-width: 960px;
            padding: 150px 60px;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;

        a {
            color: inherit;
        }
    }

    &__banner {
        max-width: 20vw;

        @media all and (min-width: 600px) {
            max-width: 16vw;
            margin-right: 6vw;
        }

        @media all and (min-width: 1000px) {
            max-width: 12vw;
            margin-right: 3vw;
        }

        img {
            max-width: 100%;
            border-radius: 50%;
        }
    }
}

.BrandList {
    margin-top: 2rem;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem 4rem;

    @media all and (min-width: 500px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-gap: 2rem 2rem;
    }

    @media all and (min-width: 600px) {
        grid-gap: 2rem 4rem;
    }

    @media all and (min-width: 800px) {
        margin-top: 4rem;
        grid-gap: 2rem 6rem;
    }

    &__item {
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            max-width: 100%;
            max-height: 100%;
        }
    }
}
</style>
