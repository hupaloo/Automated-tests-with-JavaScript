module.exports =
    class SearchOptions{

        get bodySearchArea(){
            return $('.new-search__filters.new-search__filters--desktop');
        }

        /**
         * Returns ElementFinder of box elements by containing text value
         * @param {String} boxName
         * @returns ElementFinder
         */
        getBox(boxName){
            return this.bodySearchArea.element(
                by.xpath(
                    `.//div[contains(@class, "new-search__filter-box") and ./label[contains(text(), "${boxName}")]]`
                )
            );
        }

        /**
         * Returns ArrayElementFinder of all star/rate elements by class value
         * @param {String} boxName
         * @returns ArrayElementFinder
         */
        getElements(boxName){
            return this.getBox(boxName).all(
                by.xpath(
                    './/rooms-chip//span[contains(@class, "chip-content")]'
                )
            );
        }

        /**
         * Returns Promise<Integer> of number of stars/marks depending on its box name
         * @param {String} boxName
         * @returns {Promise<Integer>}
         */
        async numberOfElems(boxName){
            return await this.getElements(boxName).count();
        }

        /**
         * Return Promise<boolean> 'true' if an element selected and 'false' if not
         * @param {ElementFinder} Element
         * @returns {Promise<boolean>}
         */
        async isElemChecked(Element) {
            return (await Element.getAttribute('class')).includes('selected');
        }
    };
