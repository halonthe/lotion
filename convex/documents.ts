import {mutation, query} from "./_generated/server";
import {v} from "convex/values"
import {Id} from "./_generated/dataModel";

const checkUser = async (ctx:any) => {
	const identity = await ctx.auth.getUserIdentity()

	if(!identity){
		throw new Error('Not Authenticated')
	}

	return identity
}

export const archive = mutation({
	args: {id: v.id('documents')},
	handler: async(ctx, args) => {
		const identity = await checkUser(ctx)
		const userId = identity.subject

		const docExist = await ctx.db.get(args.id)
		if(!docExist){
			throw new Error('Document Not Found')
		}

		if(userId !== docExist.userId){
			throw new Error('Unauthorized')
		}

		const recursiveArchive = async (docId: Id<'documents'>) => {
			const children = await ctx.db.query('documents')
				.withIndex('by_user_parent', (q) =>
					q.eq('userId', userId).eq('parentDocument', docId)
				).collect()

			// promises, use 'for' instead of .map or .foreach
			for(const child of children){
				await ctx.db.patch(child._id,{isArchived: true})
				await recursiveArchive(child._id)
			}
		}

		await recursiveArchive(args.id)
		return await ctx.db.patch(args.id,{isArchived: true})
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
				(q) => q.eq('userId', userId).eq('parentDocument', args.parentDocument))
			.filter((q) => q.eq(q.field('isArchived'), false))
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