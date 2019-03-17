'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Event = use('App/Models/Event');
const EventTransformer = use('App/Transformers/EventTransformer');
/**
 * Resourceful controller for interacting with events
 */
class EventController {
  /**
   * Show a list of all events.
   * GET events
   *
   * @param {Request} ctx.request
   * @param {Transformer} transform
   */
  async index({ request, transform }) {
    const { page } = request.qs;

    if (page) {
      const paginated = await Event.query().paginate(page, 10);
      return transform.paginate(paginated, EventTransformer);
    } else {
      const events = await Event.all();
      return transform.collection(events, EventTransformer);
    }
  }

  /**
   * Create/save a new event.
   * POST events
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single event.
   * GET events/:id
   *
   * @param {Request} ctx.response
   * @param {object} params
   * @param {Transformer} transform
   */
  async show({ response, params, transform }) {
    const event = (await Event.query()
      .with('organizer')
      .where('id', params.id)
      .fetch()).first();

    return event
      ? transform.item(event, EventTransformer)
      : response.notFound();
  }

  /**
   * Update event details.
   * PUT or PATCH events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a event with id.
   * DELETE events/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = EventController;
