export function getEmptyFields(fields) {
  return Object.entries(fields).reduce(
    (res, [k, v]) => (!v ? [...res, k] : res),
    []
  );
}

export function isProfileCompleted(fields) {
  const emptyFields = getEmptyFields(fields);
  return emptyFields.length === 0;
}

export function stripHTMLTags(html) {
  if (!html) return html;
  return html.replace(/<[^>]*>?/gm, "");
}

export function blobToBase64(blob) {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
}
