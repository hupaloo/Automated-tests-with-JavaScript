module.exports =
    class Header{
        get body(){
            return element(
                by.xpath('//rooms-root/rooms-nav-header')
            );
        }

        get logInBtn(){
            return this.body.element(
                by.xpath('.//button[contains(@data-ref, "user-controls-login-link")]')
            );
        }

        get userInfo(){
            return this.body.element(
                by.xpath('.//div[contains(@class, "user-controls__user-info")]')
            );
        }

        get userIcon(){
            return this.userInfo.element(
                by.xpath('.//div[contains(@class, "user-controls__user-portrait")]')
            );
        }

        get userName(){
            return this.userInfo.element(
                by.xpath('.//span[contains(@data-ref, "user-controls-user-label")]')
            );
        }
    };
