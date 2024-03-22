export function searchLoader ({request}: {request: Request}): string {
  const searchParams = new URL(request.url).searchParams
  const search = searchParams.get('search') || ""
  return search
}