module.exports = class Slider{
    get body() {
        return element(by.css('.home__testimonials-section'));
    }

    /**
     * Returns ElementFinder of arrow by its direction
     * @param {String} direction
     * @returns ElementFinder
     */
    getArrow(direction){
        return this.body.element(
            by.css(`.slider-arrow__${direction}`)
        )
    }

    get sliderElement() {
        return this.body.element(by.css('.slider-items.slider-items--animated'));
    }

    get feedbackArea(){
        return $('.testimonials__container');
    }

    /**
     * Returns Promise<Integer> as a total number of sliders in feedback
     * @returns {Promise<Integer>}
     */
    async slidersNumber(){
        return await this.body.all(
            by.xpath('.//rooms-slider-item')
        ).count();
    }

    /**
     * Returns ElementFinder of card in slider by its ordinal number
     * @param {Integer} sliderNumber
     * @returns ElementFinder
     */
    getSliderSection(sliderNumber){
        return this.body.element(
            by.xpath(`.//rooms-slider-item[${sliderNumber}]`)
        )
    }

    /**
     * Returns Promise<Integer> as a number of cards in one section by sections' ordinal number
     * @param {Integer} sliderNumber
     * @returns Promise<Integer>
     */
    async sliderSectionElementsNumber(sliderNumber){
        return await this.getSliderSection(sliderNumber).all(
            by.xpath('.//rooms-testimonial')
        ).count();
    }

    /**
     * Returns ElementFinder of 'See more' button by section and element position inside it
     * @param {Integer} sectionNumber
     * @param {Integer} elementNumber
     * @returns ElementFinder
     */
    sliderElementButton(sectionNumber, elementNumber){
        return this.getSliderSection(sectionNumber).element(
            by.xpath(`.//rooms-testimonial[${elementNumber}]//button[contains(@data-ref, "testimonial-button-see-more")]`)
        )
    }
};
