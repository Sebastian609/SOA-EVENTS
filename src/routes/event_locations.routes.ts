import { Router } from 'express';
import { EventLocationController } from '../infrastructure/controller/event_locations.controller';

export class EventLocationsRoute {
    private readonly router: Router;
    private readonly eventLocationController: EventLocationController;

    constructor(eventLocationController: EventLocationController) {
        this.router = Router();
        this.eventLocationController = eventLocationController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        /**
         * @swagger
         * /events/event-locations:
         *   get:
         *     summary: Obtener todas las ubicaciones de eventos
         *     description: Retorna una lista de todas las ubicaciones de eventos en el sistema
         *     tags: [EventLocations]
         *     responses:
         *       200:
         *         description: Lista de ubicaciones de eventos obtenida exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/EventLocation'
         *       500:
         *         description: Error interno del servidor
         */
        this.router.get('/', (req, res) => this.eventLocationController.getAllEventLocations(req, res));

        /**
         * @swagger
         * /events/event-locations/paginated:
         *   get:
         *     summary: Obtener ubicaciones de eventos paginadas
         *     description: Retorna una lista paginada de ubicaciones de eventos
         *     tags: [EventLocations]
         *     parameters:
         *       - in: query
         *         name: page
         *         schema:
         *           type: integer
         *           default: 1
         *         description: Número de página
         *       - in: query
         *         name: limit
         *         schema:
         *           type: integer
         *           default: 10
         *         description: Número de elementos por página
         *     responses:
         *       200:
         *         description: Lista paginada de ubicaciones de eventos obtenida exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 data:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/EventLocation'
         *                 total:
         *                   type: integer
         *                 page:
         *                   type: integer
         *                 limit:
         *                   type: integer
         *                 totalPages:
         *                   type: integer
         *       500:
         *         description: Error interno del servidor
         */
        this.router.post('/paginated', (req, res) => this.eventLocationController.getPaginated.bind(this.eventLocationController)(req, res));

        /**
         * @swagger
         * /events/event-locations/event/{eventId}:
         *   get:
         *     summary: Obtener ubicaciones por evento
         *     description: Retorna todas las ubicaciones asociadas a un evento específico
         *     tags: [EventLocations]
         *     parameters:
         *       - in: path
         *         name: eventId
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID del evento
         *     responses:
         *       200:
         *         description: Lista de ubicaciones del evento obtenida exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/EventLocation'
         *       404:
         *         description: Evento no encontrado
         *       500:
         *         description: Error interno del servidor
         */
        this.router.get('/event/:eventId', (req, res) => this.eventLocationController.getByEvent(req, res));

        /**
         * @swagger
         * /events/event-locations/location/{locationId}:
         *   get:
         *     summary: Obtener eventos por ubicación
         *     description: Retorna todos los eventos asociados a una ubicación específica
         *     tags: [EventLocations]
         *     parameters:
         *       - in: path
         *         name: locationId
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la ubicación
         *     responses:
         *       200:
         *         description: Lista de eventos de la ubicación obtenida exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/EventLocation'
         *       404:
         *         description: Ubicación no encontrada
         *       500:
         *         description: Error interno del servidor
         */
        this.router.get('/location/:locationId', (req, res) => this.eventLocationController.getByLocation(req, res));

        /**
         * @swagger
         * /events/event-locations/event/{eventId}/active:
         *   get:
         *     summary: Obtener ubicaciones activas por evento
         *     description: Retorna todas las ubicaciones activas asociadas a un evento específico
         *     tags: [EventLocations]
         *     parameters:
         *       - in: path
         *         name: eventId
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID del evento
         *     responses:
         *       200:
         *         description: Lista de ubicaciones activas del evento obtenida exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/EventLocation'
         *       404:
         *         description: Evento no encontrado
         *       500:
         *         description: Error interno del servidor
         */
        this.router.get('/event/:eventId/active', (req, res) => this.eventLocationController.getActiveByEvent(req, res));

        /**
         * @swagger
         * /events/event-locations/{id}:
         *   get:
         *     summary: Obtener ubicación de evento por ID
         *     description: Retorna una ubicación de evento específica por su ID
         *     tags: [EventLocations]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la ubicación de evento
         *     responses:
         *       200:
         *         description: Ubicación de evento encontrada exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/EventLocation'
         *       404:
         *         description: Ubicación de evento no encontrada
         *       500:
         *         description: Error interno del servidor
         */
        this.router.get('/:id', (req, res) => this.eventLocationController.getEventLocationById(req, res));

        /**
         * @swagger
         * /events/event-locations:
         *   post:
         *     summary: Crear nueva ubicación de evento
         *     description: Crea una nueva ubicación de evento en el sistema
         *     tags: [EventLocations]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/CreateEventLocationDto'
         *     responses:
         *       201:
         *         description: Ubicación de evento creada exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/EventLocation'
         *       400:
         *         description: Datos de entrada inválidos
         *       500:
         *         description: Error interno del servidor
         */
        this.router.post('/', (req, res) => this.eventLocationController.createEventLocation(req, res));

        /**
         * @swagger
         * /events/event-locations/{id}:
         *   put:
         *     summary: Actualizar ubicación de evento
         *     description: Actualiza una ubicación de evento existente por su ID
         *     tags: [EventLocations]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la ubicación de evento a actualizar
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/UpdateEventLocationDto'
         *     responses:
         *       200:
         *         description: Ubicación de evento actualizada exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/EventLocation'
         *       404:
         *         description: Ubicación de evento no encontrada
         *       400:
         *         description: Datos de entrada inválidos
         *       500:
         *         description: Error interno del servidor
         */
        this.router.put('/:id', (req, res) => this.eventLocationController.updateEventLocation(req, res));

        /**
         * @swagger
         * /events/event-locations/{id}:
         *   delete:
         *     summary: Eliminar ubicación de evento
         *     description: Elimina una ubicación de evento del sistema (soft delete)
         *     tags: [EventLocations]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la ubicación de evento a eliminar
         *     responses:
         *       200:
         *         description: Ubicación de evento eliminada exitosamente
         *       404:
         *         description: Ubicación de evento no encontrada
         *       500:
         *         description: Error interno del servidor
         */
        this.router.delete('/:id', (req, res) => this.eventLocationController.deleteEventLocation(req, res));

        /**
         * @swagger
         * /events/event-locations/{id}/activate:
         *   patch:
         *     summary: Activar ubicación de evento
         *     description: Activa una ubicación de evento que estaba desactivada
         *     tags: [EventLocations]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la ubicación de evento a activar
         *     responses:
         *       200:
         *         description: Ubicación de evento activada exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/EventLocation'
         *       404:
         *         description: Ubicación de evento no encontrada
         *       500:
         *         description: Error interno del servidor
         */
        this.router.patch('/:id/activate', (req, res) => this.eventLocationController.activate(req, res));

        /**
         * @swagger
         * /events/event-locations/{id}/deactivate:
         *   patch:
         *     summary: Desactivar ubicación de evento
         *     description: Desactiva una ubicación de evento activa
         *     tags: [EventLocations]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la ubicación de evento a desactivar
         *     responses:
         *       200:
         *         description: Ubicación de evento desactivada exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/EventLocation'
         *       404:
         *         description: Ubicación de evento no encontrada
         *       500:
         *         description: Error interno del servidor
         */
        this.router.patch('/:id/deactivate', (req, res) => this.eventLocationController.deactivate(req, res));

        /**
         * @swagger
         * /events/event-locations/{id}/available:
         *   get:
         *     summary: Verificar disponibilidad de ubicación de evento
         *     description: Verifica si una ubicación de evento está disponible (activa y no eliminada)
         *     tags: [EventLocations]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la ubicación de evento a verificar
         *     responses:
         *       200:
         *         description: Estado de disponibilidad verificado exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 isAvailable:
         *                   type: boolean
         *                   description: Indica si la ubicación de evento está disponible
         *       404:
         *         description: Ubicación de evento no encontrada
         *       500:
         *         description: Error interno del servidor
         */
        this.router.get('/:id/available', (req, res) => this.eventLocationController.isAvailable(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }
}
