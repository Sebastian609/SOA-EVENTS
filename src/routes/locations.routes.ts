import { Router } from 'express';
import { LocationController } from '../infrastructure/controller/locations.controller';

export class LocationsRoute {
    
    private readonly router: Router;
    private readonly locationController: LocationController;

    constructor(locationController: LocationController) {
        this.router = Router();
        this.locationController = locationController;
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        /**
         * @swagger
         * /events/locations:
         *   get:
         *     summary: Obtener todas las ubicaciones
         *     description: Retorna una lista de todas las ubicaciones en el sistema
         *     tags: [Locations]
         *     responses:
         *       200:
         *         description: Lista de ubicaciones obtenida exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Location'
         *       500:
         *         description: Error interno del servidor
         */
        this.router.get('/', (req, res) => this.locationController.getAllLocations(req, res));

        /**
         * @swagger
         * /events/locations/active:
         *   get:
         *     summary: Obtener ubicaciones activas
         *     description: Retorna una lista de todas las ubicaciones que están activas
         *     tags: [Locations]
         *     responses:
         *       200:
         *         description: Lista de ubicaciones activas obtenida exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               type: array
         *               items:
         *                 $ref: '#/components/schemas/Location'
         *       500:
         *         description: Error interno del servidor
         */
        this.router.get('/active', (req, res) => this.locationController.getActiveLocations(req, res));

        /**
         * @swagger
         * /events/locations/paginated:
         *   get:
         *     summary: Obtener ubicaciones paginadas
         *     description: Retorna una lista paginada de ubicaciones
         *     tags: [Locations]
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
         *         description: Lista paginada de ubicaciones obtenida exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               type: object
         *               properties:
         *                 data:
         *                   type: array
         *                   items:
         *                     $ref: '#/components/schemas/Location'
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
        this.router.get('/paginated', (req, res) => this.locationController.getPaginated.bind(this.locationController));

        /**
         * @swagger
         * /events/locations/name/{name}:
         *   get:
         *     summary: Buscar ubicación por nombre
         *     description: Busca una ubicación específica por su nombre
         *     tags: [Locations]
         *     parameters:
         *       - in: path
         *         name: name
         *         required: true
         *         schema:
         *           type: string
         *         description: Nombre de la ubicación a buscar
         *     responses:
         *       200:
         *         description: Ubicación encontrada exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Location'
         *       404:
         *         description: Ubicación no encontrada
         *       500:
         *         description: Error interno del servidor
         */
        this.router.get('/name/:name', (req, res) => this.locationController.getLocationByName(req, res));

        /**
         * @swagger
         * /events/locations/{id}:
         *   get:
         *     summary: Obtener ubicación por ID
         *     description: Retorna una ubicación específica por su ID
         *     tags: [Locations]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la ubicación
         *     responses:
         *       200:
         *         description: Ubicación encontrada exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Location'
         *       404:
         *         description: Ubicación no encontrada
         *       500:
         *         description: Error interno del servidor
         */
        this.router.get('/:id', (req, res) => this.locationController.getLocationById(req, res));

        /**
         * @swagger
         * /events/locations:
         *   post:
         *     summary: Crear nueva ubicación
         *     description: Crea una nueva ubicación en el sistema
         *     tags: [Locations]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/CreateLocationDto'
         *     responses:
         *       201:
         *         description: Ubicación creada exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Location'
         *       400:
         *         description: Datos de entrada inválidos
         *       500:
         *         description: Error interno del servidor
         */
        this.router.post('/', (req, res) => this.locationController.createLocation(req, res));

        /**
         * @swagger
         * /events/locations/{id}:
         *   put:
         *     summary: Actualizar ubicación
         *     description: Actualiza una ubicación existente por su ID
         *     tags: [Locations]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la ubicación a actualizar
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             $ref: '#/components/schemas/UpdateLocationDto'
         *     responses:
         *       200:
         *         description: Ubicación actualizada exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Location'
         *       404:
         *         description: Ubicación no encontrada
         *       400:
         *         description: Datos de entrada inválidos
         *       500:
         *         description: Error interno del servidor
         */
        this.router.put('/:id', (req, res) => this.locationController.updateLocation(req, res));

        /**
         * @swagger
         * /events/locations/{id}:
         *   delete:
         *     summary: Eliminar ubicación
         *     description: Elimina una ubicación del sistema (soft delete)
         *     tags: [Locations]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la ubicación a eliminar
         *     responses:
         *       200:
         *         description: Ubicación eliminada exitosamente
         *       404:
         *         description: Ubicación no encontrada
         *       500:
         *         description: Error interno del servidor
         */
        this.router.delete('/:id', (req, res) => this.locationController.deleteLocation(req, res));

        /**
         * @swagger
         * /events/locations/{id}/activate:
         *   patch:
         *     summary: Activar ubicación
         *     description: Activa una ubicación que estaba desactivada
         *     tags: [Locations]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la ubicación a activar
         *     responses:
         *       200:
         *         description: Ubicación activada exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Location'
         *       404:
         *         description: Ubicación no encontrada
         *       500:
         *         description: Error interno del servidor
         */
        this.router.patch('/:id/activate', (req, res) => this.locationController.activateLocation(req, res));

        /**
         * @swagger
         * /events/locations/{id}/deactivate:
         *   patch:
         *     summary: Desactivar ubicación
         *     description: Desactiva una ubicación activa
         *     tags: [Locations]
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         schema:
         *           type: integer
         *         description: ID de la ubicación a desactivar
         *     responses:
         *       200:
         *         description: Ubicación desactivada exitosamente
         *         content:
         *           application/json:
         *             schema:
         *               $ref: '#/components/schemas/Location'
         *       404:
         *         description: Ubicación no encontrada
         *       500:
         *         description: Error interno del servidor
         */
        this.router.patch('/:id/deactivate', (req, res) => this.locationController.deactivateLocation(req, res));
    }

    public getRouter(): Router {
        return this.router;
    }
}
