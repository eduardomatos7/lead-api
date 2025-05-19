import { Router } from "express"
import { LeadsController } from "../controllers/LeadsController"
import { GroupsController } from "../controllers/GroupsController"
import { CampaignsController } from "../controllers/CampaignsController"
import { CampaignLeadsController } from "../controllers/campaignLeadsController"
import { GroupLeadsController } from "../controllers/GroupLeadsController "

const router = Router()

const leadsController = new LeadsController()
const groupsController = new GroupsController()
const campaignsController = new CampaignsController()
const campaignLeadsController = new CampaignLeadsController()
const groupLeadsController = new GroupLeadsController()

router.get('/leads', leadsController.index)
router.post('/leads', leadsController.create)
router.get("/leads/:id", leadsController.show)
router.put("/leads/:id", leadsController.update)
router.delete("/leads/:id", leadsController.delete)

router.get("/groups", groupsController.index)
router.post("/groups", groupsController.create)
router.get("/groups/:id", groupsController.show)
router.put("/groups/:id", groupsController.update)
router.delete("/groups/:id", groupsController.delete)

router.get("/groups/:groupId/leads", groupLeadsController.index)
router.post("/groups/:groupId/leads", groupLeadsController.addLeadToGroup)
router.delete("/groups/:groupId/leads/:leadId", groupLeadsController.delete)

router.get("/campaigns", campaignsController.index)
router.get("/campaigns/:id", campaignsController.show)
router.post("/campaigns", campaignsController.create)
router.put("/campaigns/:id", campaignsController.update)
router.delete("/campaigns/:id", campaignsController.delete)

router.get("/campaigns/:campaignId/leads", campaignLeadsController.index)
router.post("/campaigns/:campaignId/leads", campaignLeadsController.create)
router.put("/campaigns/:campaignId/leads/:leadId", campaignLeadsController.update)
router.delete("/campaigns/:campaignId/leads/:leadId", campaignLeadsController.delete)

router.get('/', async (req, res, next) => {
    try {
        res.json({ message: "Hello World" })
    } catch (error) {
        next(error)
    }
})

export default router