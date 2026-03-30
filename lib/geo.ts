export async function getGeo(ip: string) {
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await res.json();

    return {
      lat: data.latitude,
      lng: data.longitude,
      country: data.country_name,
    };
  } catch {
    return null;
  }
}