import { Lead } from "@prisma/client";
import { CreateLeadAttributes, FindLeadsParams, LeadsRepository, LeadWhereParams } from "../LeadsRepository";
import prisma from "../../database";

export class PrismaLeadsRepository implements LeadsRepository {
    async find(params: FindLeadsParams): Promise<Lead[]> {
        return prisma.lead.findMany({
            where: {
                name: {
                    contains: params.where?.name?.like,
                    equals: params.where?.name?.equals,
                    mode: params.where?.name?.mode
                },
                status: params.where?.status,
                groups: {
                    some: {
                        id: params.where?.groupId
                    }
                },
                LeadCampaign: {
                    some: {
                        campaignId: params.where?.campaignId
                    }
                }
            },
            orderBy: { [params.sortBy ?? "name"]: params.order },
            skip: params.offset,
            take: params.limit,
            include: {
                groups: params.include?.groups,
                LeadCampaign: params.include?.LeadCampaign
            }
        })
    }

    async findById(id: number): Promise<Lead | null> {
        return prisma.lead.findUnique({
            where: { id },
            include: {
                LeadCampaign: true,
                groups: true
            }
        })
    }

    async count(where: LeadWhereParams): Promise<number> {
        return prisma.lead.count({
            where: {
                name: {
                    contains: where?.name?.like,
                    equals: where?.name?.equals,
                    mode: where?.name?.mode
                },
                status: where?.status,
                groups: {
                    some: {
                        id: where?.groupId
                    }
                },
                LeadCampaign: {
                    some: {
                        campaignId: where?.campaignId
                    }
                }
            },

        })
    }

    async create(attributes: CreateLeadAttributes): Promise<Lead> {
        return prisma.lead.create({ data: attributes })
    }

    async updateById(id: number, attributes: Partial<CreateLeadAttributes>): Promise<Lead> {
        return prisma.lead.update({
            where: { id },
            data: attributes
        })
    }

    async deleteById(id: number): Promise<Lead> {
        return prisma.lead.delete({ where: { id } })
    }
}
