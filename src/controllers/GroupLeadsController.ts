import { Handler } from "express";
import prisma from "../database";
import { Prisma } from "@prisma/client";
import { AddLeadsToGroupRequestSchema, GetGroupLeadsRequestSchema } from "../schemas/GroupsRequestSchema";
import { HttpError } from "../errors/HttpError";

export class GroupLeadsController {
    index: Handler = async (req, res, next) => {
        try {
            const groupId = +req.params.groupId
            const query = GetGroupLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query

            const where: Prisma.LeadWhereInput = {
                groups: { some: { id: groupId } }
            }
            if (name) where.name = { contains: name, mode: "insensitive" }
            if (status) where.status = status
            const leads = await prisma.lead.findMany({
                where,
                skip: (+page - 1) * +pageSize,
                take: +pageSize,
                orderBy: { [sortBy]: order },
                include: { groups: true }
            })
            const total = await prisma.lead.count({ where })
            res.json({
                leads,
                meta: { total, page: +page, pageSize: +pageSize, totalPages: Math.ceil(total / +pageSize) }
            })
        } catch (error) {
            next(error)
        }
    }
    addLeadToGroup: Handler = async (req, res, next) => {
        try {
            const { groupId } = req.params
            const body = AddLeadsToGroupRequestSchema.parse(req.body)
            const findLead = await prisma.lead.findUnique({
                where: { id: body.leadId }
            })
            if (!findLead) throw new HttpError(404, "lead não encontrado")
            const leadAdded = await prisma.group.update({
                where: {
                    id: +groupId
                },
                data: {
                    leads: {
                        connect: {
                            id: body.leadId
                        }
                    }
                }, include: { leads: true }
            })
            res.json(leadAdded)

        } catch (error) {
            next(error)
        }
    }
    delete: Handler = async (req, res, next) => {
        try {
            const { leadId, groupId } = req.params
            const findLead = await prisma.lead.findUnique({
                where: { id: +leadId }
            })
            if (!findLead) throw new HttpError(404, "lead não encontrado")
            const deletedLead = await prisma.group.update({
                where: { id: +groupId },
                data: { leads: { disconnect: { id: +leadId } } },
                include: { leads: true }
            })
            res.json(deletedLead)
        } catch (error) {
            next(error)
        }
    }
}