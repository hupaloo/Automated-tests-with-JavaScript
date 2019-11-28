module.exports=
    class Calendar{
        get calendarArea(){
            return element(
                by.xpath('//rooms-tooltip[./div[contains(@class, "tooltip__container")]]')
            );
        }

        get externalArea(){
            return $('.cdk-overlay-backdrop-showing');
        }

        /**
         * Returns ElementFinder of month table by its' ordinal number
         * @param {Integer} tableNumber
         * @returns ElementFinder
         */
        getTable(tableNumber){
            return this.calendarArea.element(
                by.xpath(`//rooms-calendar[${tableNumber}]//tbody`)
            );
        }

        /**
         * Returns ArrayElementFinder of all dates in calendar table (selecting table by its number)
         * @param {Integer} tableNumber
         * @returns ArrayElementFinder
         */
        getActiveDates(tableNumber){
            return this.getTable(tableNumber).all(
                by.xpath('.//td//div[(contains(@class, "calendar-body__cell")) and not(contains(@class, "disabled"))]')
            );
        }

        /**
         * Returns ArrayElementFinder of all dates in calendar table (selecting table by its number)
         * @param {Integer} tableNumber
         * @returns ArrayElementFinder
         */
        getActiveDate(tableNumber){
            return this.getActiveDates(tableNumber).all(
                by.xpath('.//ancestor::td')
            );
        }

        /**
         * @param {ElementFinder} Element
         * @returns {Promise<boolean>}
         */
        async isDisabled(Element) {
            return (await Element.getAttribute('class')).includes('disabled');
        }

        /**
         * Returns ElementFinder of element by its position
         * @param {String} position
         * @returns ElementFinder
         */
        calendarInfo(position){
            return this.calendarArea.element(
                by.css(`.calendar__info-${position}`)
            )
        }

        /**
         * Returns ElementFinder of arrow by its direction
         * @param {String} direction
         * @returns ElementFinder
         */
        getArrow(direction){
            return this.calendarArea.element(
                by.css(`.m-toggle__button--${direction}`)
            )
        }

        /**
         * Returns ElementFinder of arrow by its direction
         * @param {String} direction
         * @returns ElementFinder
         */
        getMainArrow(direction){
            return this.calendarArea.element(
                by.css(`.calendar__arrow--${direction}`)
            )
        }

        get topMonthsBar(){
            return this.calendarArea.$$('.m-toggle__months__item');
        }

        get topMonths(){
            return this.calendarArea.$$('.m-toggle__month');
        }

        get mainMonths(){
            return this.calendarArea.$$('.calendar__month-name');
        }
    };
