import { Handler } from "express";
import { CreateGroupRequestSchema, UpdateGroupRequestSchema } from "../schemas/GroupsRequestSchema";
import { HttpError } from "../errors/HttpError";
import { GroupsRepository } from "../repositories/GroupsRepository";

export class GroupsController {
    constructor(private readonly groupsRepository: GroupsRepository) { }

    index: Handler = async (req, res, next) => {
        try {
            const groups = await this.groupsRepository.find()
            res.json(groups)
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) => {
        try {
            const body = CreateGroupRequestSchema.parse(req.body)
            const group = await this.groupsRepository.create(body)
            res.status(201).json(group)

        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next) => {
        try {
            const id = +req.params.id
            const group = await this.groupsRepository.findById(id)
            if (!group) throw new HttpError(404, "grupo não encontrado")
            res.json(group)
        } catch (error) {
            next(error)
        }
    }

    update: Handler = async (req, res, next) => {
        try {
            const body = UpdateGroupRequestSchema.parse(req.body)
            const id = +req.params.id
            const group = await this.groupsRepository.updateById(id, body)
            if (!group) throw new HttpError(404, "grupo não encontrado")
            res.json(group)
        } catch (error) {
            next(error)
        }
    }

    delete: Handler = async (req, res, next) => {
        try {
            const id = +req.params.id
            const groupDeleted = await this.groupsRepository.deleteById(id)
            if (!groupDeleted) throw new HttpError(404, "grupo não encontrado")
            res.json(groupDeleted)
        } catch (error) {
            next(error)
        }
    }
}