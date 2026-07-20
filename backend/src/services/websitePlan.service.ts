import prisma from "../lib/prisma";
import { WebsitePlanInput } from "../types/websitePlan.types";

export const createWebsitePlan = async (
  data: WebsitePlanInput
) => {
  return prisma.websitePlan.create({
    data
  });
};