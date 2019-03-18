'use strict';

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract');
const EventOrganizerTransformer = use('App/Transformers/EventOrganizerTransformer');
const moment = require('moment');

/**
 * EventTransformer class
 *
 * @class EventTransformer
 * @constructor
 */
class EventTransformer extends TransformerAbstract {
  defaultInclude() {
    return ['organizer'];
  }

  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      id: model.id,
      title: model.title,
      description: model.description,
      start_date: moment(model.start_date).utc().format('DD-MM-YYYY'),
      end_date: moment(model.end_date).utc().format('DD-MM-YYYY'),
      starts_at: moment(model.start_hour, "HH:mm").format("hh:mm a"),
      ends_at: moment(model.end_hour, "HH:mm").format("hh:mm a"),
    };
  }

  includeOrganizer(event) {
    return this.item(event.getRelated('organizer'), EventOrganizerTransformer);
  }
}

module.exports = EventTransformer;
