module.exports =
    class MainPage{
        get calendarForm(){
            return element(
                by.xpath('.//rooms-date-range/div[contains(@class, "date-range")]')
            );
        }

        get checkInField(){
            return this.calendarForm.element(
                by.xpath('.//div[contains(@class, "date-range__cell") and ./div[contains(@data-ref, "checkin")]]')
            );
        }

        get checkOutField(){
            return this.calendarForm.element(
                by.xpath('.//div[contains(@class, "date-range__cell") and ./div[contains(@data-ref, "checkout")]]')
            );
        }

        get checkInDate(){
            return this.checkInField.element(
                by.xpath('.//div[contains(@data-ref, "date-range-checkin-date")]')
            );
        }

        get checkOutDate(){
            return this.checkOutField.element(
                by.xpath('.//div[contains(@data-ref, "date-range-checkout-date")]')
            );
        }

        get nightsNumber(){
            return this.calendarForm.element(
                by.xpath('.//div[contains(@class, "date-range__info")]//span[contains(@data-ref, "date-range-nights-counter")]')
            );
        }

        /**
         * Returns Promise<String> of max date error message text
         * @returns Promise<String>
         */
        async nightsNumberErrorMsg(){
            return await $('.checkin-checkout__date-range-error-label').getText();
        }

        get refineYourSearchBtn(){
            return $('.new-search__refine-button');
        }

        get maxStayErrorMsg(){
            return $('.checkin-checkout__date-range-error-label');
        }
    };
