import cardTemplate from './show-card.html';
import showCardController from './show-card.controller';
class ShowCard {
    constructor() {
        this.restrict = 'E';
        this.bindToController= true,
        this.scope = {};
        this.template = cardTemplate;
        this.controller = showCardController;
        this.controllerAs='ctrl';
    }
    static directiveFactory() {
        ShowCard.instance = new ShowCard();
        return ShowCard.instance;
    }
}

export default ShowCard;