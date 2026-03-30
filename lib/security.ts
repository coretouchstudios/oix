export function isSuspiciousLogin(
  prevIp: string | null,
  newIp: string | null,
  prevUA: string | null,
  newUA: string | null
) {
  if (!prevIp || !prevUA) return false;

  const ipChanged = prevIp !== newIp;
  const deviceChanged = prevUA !== newUA;

  return ipChanged || deviceChanged;
}