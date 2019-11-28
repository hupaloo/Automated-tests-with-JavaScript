module.exports =
    class DetailFeedback {
        get body(){
            return element(
                by.xpath('//bs-modal-container')
            );
        }

        /**
         * Returns ElementFinder of arrow by its direction
         * @param {String} direction
         * @returns ElementFinder
         */
        getArrow(direction){
            return this.body.element(
                by.xpath(`.//button[contains(@data-ref, "testimonial-arrow-${direction}")]`)
            )
        }

        /**
         * Returns ElementFinder of detail feedback single item by it's ordinal number
         * @param {Integer} cardNumber
         * @returns ElementFinder
         */
        selectCard(cardNumber){
            return this.body.element(
                by.xpath(`.//rooms-slider-item[${cardNumber}]`)
            );
        }

        /**
         * Returns Promise<Integer> as a total number of all items in detail feedback
         * @returns {Promise<Integer>}
         */
        async numberOfCards(){
            return await this.body.all(
                by.xpath('.//rooms-slider-item')
            ).count();
        }

        /**
         * Returns ElementFinder of person name by items' ordinal number
         * @param {Integer} cardNumber
         * @returns ElementFinder
         */
        feedbackName(cardNumber) {
            return this.selectCard(cardNumber).element(
                by.xpath('.//div[contains(@class, "testimonial__name")]/span[1]')
            );
        }

        /**
         * Returns ElementFinder of person city by items' ordinal number
         * @param {Integer} cardNumber
         * @returns ElementFinder
         */
        feedbackCity(cardNumber){
            return this.selectCard(cardNumber).element(
                by.xpath('.//span[contains(@class, "text-s-regular")]')
            );
        }

        /**
         * Returns ElementFinder of person feedback text by items' ordinal number
         * @param {Integer} cardNumber
         * @returns ElementFinder
         */
        feedbackText(cardNumber) {
            return this.selectCard(cardNumber).element(
                by.xpath('.//div[contains(@class, "testimonial__content")]')
            );
        }

        get closeBtn(){
            return this.body.element(
                by.xpath('.//button[contains(@class, "testimonial__close")]')
            );
        }

        get feedbackArea(){
            return $('.modal-content');
        }
    };
