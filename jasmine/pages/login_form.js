module.exports =
    class Login{
        get body(){
            return element(
                by.xpath('//bs-modal-container//div[contains(@class, "modal-content")]')
            );
        }

        get closeBtn(){
            return this.body.element(
                by.xpath('.//div[contains(@class, "my-ryanair-popup__modal__close-btn")]')
            );
        }

        get loginForm(){
            return this.body.element(
                by.xpath('.//form[contains(@class, "content__form")]')
            )
        }

        get emailInput(){
            return this.loginForm.element(
                by.xpath('.//input[contains(@type, "email")]')
            );
        }

        get passwordInput(){
            return this.loginForm.element(
                by.xpath('.//input[contains(@type, "password")]')
            );
        }

        get loginBtn(){
            return this.loginForm.element(
                by.xpath('.//button[contains(@data-ref, "signup_login_cta")]')
            );
        }
    };
