class CookiesPolicy {
    get body() {
        return element(
            by.xpath('//rooms-cookies-policy[contains(@class, "cookies-policy")]')
        );
    }

    get closeButton() {
        return this.body.element(
            by.xpath('.//span[contains(@class, "icon-18")]')
        );
    }
}

module.exports = CookiesPolicy;
