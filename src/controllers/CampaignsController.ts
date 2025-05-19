import { Handler } from "express"
import prisma from "../database"
import { HttpError } from "../errors/HttpError"
import { CreateCampaignsRequestSchema, UpdateCampaignsRequestSchema } from "../schemas/CampaignsRequestSchema"

export class CampaignsController {

    index: Handler = async (req, res, next) => {
        try {
            const campaign = await prisma.campaign.findMany()
            res.json(campaign)
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateCampaignsRequestSchema.parse(req.body)
            const campaign = await prisma.campaign.create({
                data: body
            })
            res.status(201).json(campaign)

        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const campaign = await prisma.campaign.findUnique({
                where: { id: +req.params.id },
                include: {
                    leads: {
                        include: {
                            lead: true
                        }
                    }
                }
            })
            if (!campaign) throw new HttpError(404, "campanha não encontrada")
            res.json(campaign)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const body = UpdateCampaignsRequestSchema.parse(req.body)
            const id = +req.params.id
            const findCampaign = await prisma.campaign.findUnique({ where: { id } })
            if (!findCampaign) throw new HttpError(404, "campanha não encontrada")
            const campaign = await prisma.campaign.update({
                data: body,
                where: { id }
            })
            res.json(campaign)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = +req.params.id
            const findCampaign = await prisma.campaign.findUnique({ where: { id } })
            if (!findCampaign) throw new HttpError(404, "campanha não encontrada")
            await prisma.leadCampaign.deleteMany({ where: { campaignId: id } });
            const deletedCampaign = await prisma.campaign.delete({ where: { id } })
            console.log(deletedCampaign)
            res.json(deletedCampaign)
        } catch (error) {
            next(error)
        }
    }
}
