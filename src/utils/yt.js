export const getYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  const match = url?.match(regex)
  return match ? match[1] : null
}

export const getYouTubeThumbnail = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
