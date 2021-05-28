import packageJson from '../package.json';

export default (_, inject) => {
    inject('appVersion', packageJson.version);
};
