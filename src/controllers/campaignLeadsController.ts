import { Handler } from "express";
import prisma from "../database";
import { Prisma } from "@prisma/client";
import { GetCampaignLeadsRequestSchema } from "../schemas/CampaignsRequestSchema";

export class CampaignLeadsController {
    index: Handler = async (req, res, next) => {
        try {
            const campaignId = +req.params.campaignId
            const query = GetCampaignLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query
            const where: Prisma.LeadWhereInput = {
                LeadCampaign: {
                    some: { campaignId }
                }
            }
            if (name) where.name = { contains: name, mode: "insensitive" }
            if (status) where.LeadCampaign = { some: { status } }

            const leads = await prisma.lead.findMany({
                where,
                orderBy: { [sortBy]: order },
                skip: (+page - 1) * +pageSize,
                take: +pageSize,
                include: {
                    LeadCampaign: {
                        select: {
                            campaignId: true,
                            leadId: true,
                            status: true
                        }
                    }
                }
            })
            const total = await prisma.lead.count({ where })
            res.json({
                leads,
                meta: {
                    page: +page,
                    pageSize: +pageSize,
                    total,
                    totalPages: Math.ceil(total / +pageSize)
                }
            })
        } catch (error) {
            next(error)
        }
    }
    create: Handler = async (req, res, next) => {

    }
    update: Handler = async (req, res, next) => {

    }
    delete: Handler = async (req, res, next) => {

    }
}