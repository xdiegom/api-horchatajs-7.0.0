'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * EventOrganizerTransformer class
 *
 * @class EventOrganizerTransformer
 * @constructor
 */
class EventOrganizerTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
      id: model.id,
      name: model.name
     }
  }
}

module.exports = EventOrganizerTransformer
