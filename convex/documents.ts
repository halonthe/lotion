import {mutation, query} from "./_generated/server";
import {v} from "convex/values"

const checkUser = async (ctx:any) => {
	const identity = await ctx.auth.getUserIdentity()

	if(!identity){
		throw new Error('Not Authenticated')
	}

	return identity
}

export const get = query({
	handler: async (ctx) => {
		await checkUser(ctx)
		return await ctx.db.query('documents').collect()
	}
})

export const getSidebar = query({
	args:{
		parentDocument: v.optional(v.id('documents'))
	},
	handler: async(ctx, args) => {
		const identity = await checkUser(ctx)

		const userId = identity.subject

		return await ctx.db.query('documents')
			.withIndex('by_user_parent',
				(q: any) => q.eq('userId', userId).eq('parentDocument', args.parentDocument))
			.filter((q: any) => q.eq(q.field('isArchived'), false))
			.order("desc")
			.collect()
	}
})

export const create = mutation({
	args: {
		title: v.string(),
		parentDocument: v.optional(v.id('documents'))
	},
	handler: async(ctx,args) => {
		const identity = await checkUser(ctx)

		const userId = identity.subject

		return await ctx.db.insert('documents', {
			title: args.title,
			parentDocument: args.parentDocument,
			userId: userId,
			isArchived: false,
			isPublished: false,
		})
	}
})