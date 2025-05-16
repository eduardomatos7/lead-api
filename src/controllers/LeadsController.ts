import { Handler } from "express";
import prisma from "../database";
import { CreateLeadRequestSchema, UpdateLeadRequestSchema } from "../schemas/LeadsRequestSchema";
import { HttpError } from "../errors/HttpError";

export class LeadsController {
    index: Handler = async (req, res, next) => {
        try {
            const leads = await prisma.lead.findMany()
            res.json(leads)
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateLeadRequestSchema.parse(req.body)
            const newLead = await prisma.lead.create({
                data: body
            })
            res.status(201).json(newLead)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const { id } = req.params
            const lead = await prisma.lead.findUnique({
                where: {
                    id: +id
                },
                include: {
                    groups: true,
                    LeadCampaign: true
                }
            })
            if (!lead) throw new HttpError(404, "lead não encontrado")
            res.json(lead)

        } catch (error) {
            next(error)
        }
    }
    delete: Handler = async (req, res, next) => {
        try {
            const id = +req.params.id
            const leadDeleted = await prisma.lead.delete({
                where: { id }
            })
            if (!leadDeleted) throw new HttpError(404, "Lead não encontrado")
            res.json(leadDeleted)


        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        const id = Number(req.params.id)
        const body = UpdateLeadRequestSchema.parse(req.body)
        const leadExists = await prisma.lead.findUnique({ where: { id } })
        if (!leadExists) throw new HttpError(404, "Lead não encontrado")
        const updatedLead = await prisma.lead.update({
            where: { id },
            data: body
        })
        res.status(200).json(updatedLead)
    }
}