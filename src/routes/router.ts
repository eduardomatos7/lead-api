import { Router } from "express"
import { LeadsController } from "../controllers/LeadsController"

const router = Router()

const leadsController = new LeadsController()
router.get('/leads', leadsController.index)
router.post('/leads', leadsController.create)
router.get("/leads/:id", leadsController.show)
router.put("/leads/:id", leadsController.update)
router.delete("/leads/:id", leadsController.delete)

router.get('/', async (req, res, next) => {
    try {
        res.json({ message: "Hello World" })
    } catch (error) {
        next(error)
    }
})

export default router