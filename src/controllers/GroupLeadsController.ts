import { Handler } from "express";
import { AddLeadsToGroupRequestSchema, GetGroupLeadsRequestSchema } from "../schemas/GroupsRequestSchema";
import { HttpError } from "../errors/HttpError";
import { GroupsRepository } from "../repositories/GroupsRepository";
import { LeadsRepository, LeadWhereParams } from "../repositories/LeadsRepository";

export class GroupLeadsController {
    constructor(
        private readonly groupsRepository: GroupsRepository,
        private readonly leadsRepository: LeadsRepository
    ) { }
    index: Handler = async (req, res, next) => {
        try {
            const groupId = +req.params.groupId
            const query = GetGroupLeadsRequestSchema.parse(req.query)
            const { page = "1", pageSize = "10", name, status, sortBy = "name", order = "asc" } = query
            const limit = Number(pageSize)
            const offset = (Number(page) - 1) * limit
            const where: LeadWhereParams = { groupId }

            if (name) where.name = { like: name, mode: "insensitive" }
            if (status) where.status = status
            const leads = await this.leadsRepository.find({
                where,
                sortBy,
                order,
                limit,
                offset,
                include: { groups: true }
            })
            const total = await this.leadsRepository.count(where)
            res.json({
                leads,
                meta: { total, page: +page, pageSize: limit, totalPages: Math.ceil(total / +pageSize) }
            })
        } catch (error) {
            next(error)
        }
    }
    addLeadToGroup: Handler = async (req, res, next) => {
        try {
            const { groupId } = req.params
            const { leadId } = AddLeadsToGroupRequestSchema.parse(req.body)
            const findLead = await this.leadsRepository.findById(leadId)
            if (!findLead) throw new HttpError(404, "lead não encontrado")
            const leadAdded = await this.groupsRepository.addLead(+groupId, leadId)
            res.json(leadAdded)

        } catch (error) {
            next(error)
        }
    }
    delete: Handler = async (req, res, next) => {
        try {
            const { leadId, groupId } = req.params
            const findLead = await this.leadsRepository.findById(+leadId)
            if (!findLead) throw new HttpError(404, "lead não encontrado")
            const deletedLead = await this.groupsRepository.removeLead(+groupId, +leadId)
            res.json(deletedLead)
        } catch (error) {
            next(error)
        }
    }
}