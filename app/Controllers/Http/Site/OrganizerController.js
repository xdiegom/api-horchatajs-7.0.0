'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Organizer = use('App/Models/Organizer');
const OrganizerTransformer = use('App/Transformers/OrganizerTransformer');

/**
 * Resourceful controller for interacting with organizers
 */
class OrganizerController {
  /**
   * Show a list of all organizers.
   * GET organizers
   *
   * @param {Request} ctx.request
   * @param {Transformer} transform
   */
  async index({ request, transform }) {
    const { page } = request.qs;

    if (page) {
      const paginated = await Organizer.query().paginate(page, 10);
      return transform.paginate(paginated, OrganizerTransformer);
    } else {
      const organizers = await Organizer.all();
      return transform.collection(organizers, OrganizerTransformer);
    }
  }

  /**
   * Create/save a new organizer.
   * POST organizers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single organizer.
   * GET organizers/:id
   *
   * @param {Response} ctx.response
   * @param {object} params
   * @param {Transformer} transform
   */
  async show({ response, params, transform }) {
    const organizer = await Organizer.find(params.id);
    
    return organizer
      ? transform.item(organizer, OrganizerTransformer)
      : response.notFound();
  }

  /**
   * Update organizer details.
   * PUT or PATCH organizers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a organizer with id.
   * DELETE organizers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = OrganizerController;
