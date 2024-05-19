import Cookies from "js-cookie";

export const authJsonHeader = (file?: boolean) => {
  const cookieState = Cookies.get("token");
  const token = cookieState ? JSON.parse(cookieState) : "";
  return {
    "Content-Type": file ? "multipart/form-data" : "Application/json",
    Accept: "Application/json",
    Authorization: `Bearer ${token}`,
  };
};

export default function transformFormData<T>(payload: T, put?: boolean) {
  const formData = new FormData();
  for (const property in payload) {
    formData.append(property, payload[property] as string | Blob);
  }
  if (put) formData.append("_method", "put");

  return formData;
}
