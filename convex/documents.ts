import {mutation, query} from "./_generated/server";
import {v} from "convex/values"
import {Doc, Id} from "./_generated/dataModel";

const checkUser = async (ctx:any) => {
	const identity = await ctx.auth.getUserIdentity()

	if(!identity){
		throw new Error('Not Authenticated')
	}

	return identity
}

export const getSearch = query({
	handler: async(ctx) => {
		const identity = await checkUser(ctx)
		const userId = identity.subject

		return await ctx.db.query('documents')
			.withIndex('by_user', (q) => q.eq('userId', userId))
			.filter((q) => q.eq(q.field('isArchived'), false))
			.order("desc")
			.collect()
	}
})

export const getTrash = query({
	handler: async(ctx) => {
		const identity = await checkUser(ctx)
		const userId = identity.subject

		return await ctx.db.query('documents')
			.withIndex('by_user', (q) => q.eq('userId', userId))
			.filter((q) => q.eq(q.field('isArchived'), true))
			.order("desc")
			.collect()
	}
})

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

export const restore = mutation({
	args: {id: v.id('documents')},
	handler: async(ctx,args) => {
		const identity = await checkUser(ctx)
		const userId = identity.subject

		const docExist = await ctx.db.get(args.id)
		if(!docExist){
			throw new Error('Document Not Found')
		}

		if(userId !== docExist.userId){
			throw new Error('Unauthorized')
		}

		const options: Partial<Doc<'documents'>> = {
			isArchived: false
		}

		if(docExist.parentDocument){
			const parent = await ctx.db.get(docExist.parentDocument)
			if(parent?.isArchived){
				options.parentDocument = undefined
			}
		}

		const recursiveRestore = async (docId: Id<'documents'>) => {
			const children = await ctx.db.query('documents')
				.withIndex('by_user_parent', (q) =>
					q.eq('userId', userId).eq('parentDocument', docId)
				).collect()

			// promises, use 'for' instead of .map or .foreach
			for(const child of children){
				await ctx.db.patch(child._id,{isArchived: true})
				await recursiveRestore(child._id)
			}
		}

		await recursiveRestore(args.id)
		return await ctx.db.patch(args.id,options)
	}
})

export const remove = mutation({
	args: {id: v.id('documents')},
	handler: async(ctx,args) => {
		const identity = await checkUser(ctx)
		const userId = identity.subject

		const docExist = await ctx.db.get(args.id)
		if(!docExist){
			throw new Error('Document Not Found')
		}

		if(userId !== docExist.userId){
			throw new Error('Unauthorized')
		}

		return await ctx.db.delete(args.id)
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

export const update = mutation({
	args:{
		id: v.id('documents'),
		title: v.optional(v.string()),
		content: v.optional(v.string()),
		coverImage: v.optional(v.string()),
		icon: v.optional(v.string()),
		isPublished: v.optional(v.boolean())
	},
	handler: async(ctx,args) => {
		const identity = await checkUser(ctx)
		const userId = identity.subject

		const {id, ...rest} = args

		const docExist = await ctx.db.get(args.id)
		if(!docExist){
			throw new Error('Document Not Found')
		}

		if(userId !== docExist.userId){
			throw new Error('Unauthorized')
		}

		return await ctx.db.patch(args.id,{...rest})
	}
})

export const getById = query({
	args:{docId: v.id('documents')},
	handler: async(ctx,args) => {

		const docExist = await ctx.db.get(args.docId)
		if(!docExist){
			throw new Error('Document Not Found')
		}

		if(docExist.isPublished && !docExist.isArchived){
			return docExist
		}

		return docExist
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

export const removeIcon = mutation({
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

		return await ctx.db.patch(args.id, {icon: undefined})
	}
})

export const removeCover = mutation({
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

		return await ctx.db.patch(args.id, {coverImage: undefined})
	}
})