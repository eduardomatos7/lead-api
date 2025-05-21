import { Handler } from "express";
import { AddLeadRequestSchema, GetCampaignLeadsRequestSchema, UpdateLeadStatusRequestSchema } from "../schemas/CampaignsRequestSchema";
import { CampaignsRepository } from "../repositories/CampaignsRepository";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository";

export class CampaignLeadsController {
    constructor(
        private readonly campaignsRepository: CampaignsRepository,
        private readonly leadsRepository: LeadsRepository
    ) { }
    index: Handler = async (req, res, next) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const query = GetCampaignLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

            const limit = Number(pageSize)
            const offset = (Number(page) - 1) * limit

            const where: LeadWhereParams = { campaignId, campaignStatus: status }

            if (name) where.name = { like: name, mode: "insensitive" }

            const leads = await this.leadsRepository.find({
                where,
                sortBy,
                order,
                limit,
                offset,
                include: { LeadCampaign: true }
            })

            const total = await this.leadsRepository.count(where)

            res.json({
                leads,
                meta: {
                    page: Number(page),
                    pageSize: limit,
                    total,
                    totalPages: Math.ceil(total / limit)
                }
            })


        } catch (error) {
            next(error)
        }
    }
    create: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.campaignId
            const { leadId, status = "New" } = AddLeadRequestSchema.parse(req.body)
            await this.campaignsRepository.addLead({ campaignId, leadId, status })

            res.status(201).end()

        } catch (error) {
            next(error)
        }
    }
    update: Handler = async (req, res, next) => {
        try {
            const { status } = UpdateLeadStatusRequestSchema.parse(req.body)
            const campaignId = Number(req.params.campaignId)
            const leadId = Number(req.params.leadId)
            await this.campaignsRepository.updateLeadStatus({ campaignId, leadId, status })
            res.json({ message: "status do lead atualizado com sucesso" })
        } catch (error) {
            next(error)
        }
    }
    delete: Handler = async (req, res, next) => {
        try {
            const campaignId = Number(req.params.campaignId)
            const leadId = Number(req.params.leadId)
            await this.campaignsRepository.removeLead(campaignId, leadId)
            res.json({ message: "lead removido da campanha com sucesso" })
        } catch (error) {
            next(error)
        }
    }
}