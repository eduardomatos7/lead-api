import { Handler } from "express"
import prisma from "../database"
import { HttpError } from "../errors/HttpError"
import { CreateCampaignsRequestSchema, UpdateCampaignsRequestSchema } from "../schemas/CampaignsRequestSchema"
import { CampaignsRepository } from "../repositories/CampaignsRepository"

export class CampaignsController {
    constructor(private readonly campaignsRepository: CampaignsRepository) { }

    index: Handler = async (req, res, next) => {
        try {
            const campaign = await this.campaignsRepository.find()
            res.json(campaign)
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateCampaignsRequestSchema.parse(req.body)
            const campaign = await this.campaignsRepository.create(body)
            res.status(201).json(campaign)

        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const campaign = await this.campaignsRepository.findById(+req.params.id)
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
            const campaign = await this.campaignsRepository.updateById(id, body)
            if (!campaign) throw new HttpError(404, "campanha não encontrada")
            res.json(campaign)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = +req.params.id
            const deletedCampaign = await this.campaignsRepository.deleteById(id)
            if (!deletedCampaign) throw new HttpError(404, "campanha não encontrada")
            console.log(deletedCampaign)
            res.json(deletedCampaign)
        } catch (error) {
            next(error)
        }
    }
}
