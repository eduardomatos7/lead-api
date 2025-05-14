import { Router } from "express"

const router = Router()
router.get('/', async (req, res, next) => {
    try {
        res.json({ message: "Hello World" })
    } catch (error) {
        next(error)
    }
})

export default router