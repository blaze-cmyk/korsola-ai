const FUNCTIONS_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

export function videoDownloadFilename(prompt: string | undefined, id: string | undefined) {
  const slug = (prompt || 'video').slice(0, 40).replace(/[^a-z0-9]+/gi, '-').replace(/^-+|-+$/g, '') || 'video';
  const suffix = id ? `-${id.slice(0, 8)}` : '';
  return `${slug}${suffix}.mp4`;
}

export function proxiedVideoUrl(url: string, download?: string) {
  const qs = new URLSearchParams({ url });
  if (download) qs.set('download', download);
  return `${FUNCTIONS_BASE}/marketing-video-proxy?${qs.toString()}`;
}

export async function downloadVideoFile(url: string, filename: string) {
  const response = await fetch(proxiedVideoUrl(url, filename));
  if (!response.ok) throw new Error(`Download failed: ${response.status}`);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}