export interface ApiPayload {
  page: string;
  size?: string;
  search?: string;
}

export const getParams = (payload: ApiPayload) => {
  let param = `page=${payload.page}`;
  param += payload.size && `&size=${payload.size}`;
  param += payload.search && `&search=${payload.search}`;
  return param;
};
