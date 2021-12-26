import React from "react";
import { CSRFInput } from "./style";

/** 
    Django Documentation
    - https://docs.djangoproject.com/en/4.0/ref/csrf/
*/

export const getCookie = (name: string): string => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue!;
};

const csrfToken = getCookie("csrftoken");

export const CSRF = (): React.ReactElement => {
  return (
    <CSRFInput name="csrfmiddlewaretoken" value={csrfToken} type="hidden" />
  );
};

export default csrfToken;
