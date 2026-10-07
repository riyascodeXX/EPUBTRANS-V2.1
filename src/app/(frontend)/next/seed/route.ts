export async function POST(): Promise<Response> {
  return Response.json(
    { error: 'Template seeding is disabled. Manage approved EPUBTRANS content in the CMS.' },
    { status: 410 },
  )
}
