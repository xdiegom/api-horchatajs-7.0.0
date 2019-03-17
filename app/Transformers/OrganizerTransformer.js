'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * OrganizerTransformer class
 *
 * @class OrganizerTransformer
 * @constructor
 */
class OrganizerTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform (model) {
    return {
     id: model.id,
     name: model.name,
     description: model.description
    }
  }
}

module.exports = OrganizerTransformer
