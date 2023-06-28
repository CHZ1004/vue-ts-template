/** 根据系统变量获取url */
export function getBaseURL() {
  const { VITE_API_URL, VITE_API_PREFFIX } = import.meta.env;
  return `${VITE_API_URL}/${VITE_API_PREFFIX}`;
}
