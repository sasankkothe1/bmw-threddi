export default class EventSearcher {

    static getSearchedEvents(events, searchString) {

        if (!events) return [];
        if (searchString===undefined) return events;

        return events.filter((event) => EventSearcher.filterEvent(event, searchString))
    }

    static filterEvent(event, searchString) {
        let lowerSearchString = searchString.toLowerCase();
        let plain_event = event['_source'];

        return lowerSearchString === "" ? true :
            this.basicFiltering(lowerSearchString, plain_event) ||
            this.searchQueryValidation(lowerSearchString, plain_event)
    }

    static searchQueryValidation(searchString, event) {
        let queries = searchString.split(":");
        let methods = ['>', '<', '<=', '>=', "=="];
        if (queries.length >= 3) {
            let field = queries[1];
            let method = methods.filter((method) => queries[2].includes(method)).pop();
            let parameter = queries[2].split(method)[1];
            return this.doQueryFiltering(field, method, parameter, event)
        } else return false;
    }

    static basicFiltering(searchString, event) {
        return event['hidden_information'].includes(searchString) ||
            event['description'].toLowerCase().includes(searchString) ||
            event['id'].includes(searchString)
    }

    static doQueryFiltering(field, method, parameter, event) {
        if (field && method && parameter && event) {
            switch (method) {
                case '>':
                    return event[field] > parseFloat(parameter);
                case '<':
                    return event[field] < parseFloat(parameter);
                case '>=':
                    return event[field] >= parseFloat(parameter);
                case '<=':
                    return event[field] <= parseFloat(parameter);
                case '==':
                    return event[field] === parseFloat(parameter);
                default:
                    return false;
            }
        }
    }

}