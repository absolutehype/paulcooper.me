export default function ({ app, store }) {
    // on change locale
    app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
        // debugger;
        // console.log('beforeLanguageSwitch', oldLocale, newLocale);
        app.i18n.setLocaleCookie(newLocale);
    };
}
