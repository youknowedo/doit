import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoadEvent } from "./$types";

export const load = async ({ parent, params }: LayoutServerLoadEvent) => {
    const { session } = await parent();

    if (!session?.user?.id) {
        throw redirect(302, "/login");
    }
    const board = await prisma.board.findUnique({
        where: {
            id: params.boardId,
            userId: session.user.id
        },
        select: {
            id: true,
            name: true,
            tasks: true
        }
    });

    if (!board) {
        throw redirect(302, "/app");
    }

    return { board };
}
