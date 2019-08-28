export default {
  // LOGIN_STATUS: '/api/auth/login_status/',
  USER_ME: '/api/user/me',
  YOUTUBE_CHANNELS: '/api/youtube/channels',
  POST_LIST: '/api/posts',
  POST_DETAIL: (postId: string) => `/api/posts/${postId}`,
  POST_LIKE: (postId: string) => `/api/posts/${postId}/like`,
};
