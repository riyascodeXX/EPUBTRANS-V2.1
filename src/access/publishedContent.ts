import type { Access } from 'payload'
export const publishedContent: Access = ({req}) => req.user ? true : {status:{equals:'published'}}
