'use strict';

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract');
const EventOrganizerTransformer = use('App/Transformers/EventOrganizerTransformer');
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
      start_date: model.start_date,
      end_date: model.end_date,
      starts_at: model.start_hour,
      ends_at: model.end_hour
    };
  }

  includeOrganizer(event) {
    return this.item(event.getRelated('organizer'), EventOrganizerTransformer);
  }
}

module.exports = EventTransformer;
