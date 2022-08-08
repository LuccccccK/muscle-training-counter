// JWT から Email を抽出します
export const extractEmail = (credential: string): string => {
  const jsonPayload = decode(credential);
  const json = JSON.parse(jsonPayload);
  return json.email;
}

// JWT を Json 形式に decode します
const decode = (credential: string): string => {
  var base64Url = credential.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  console.log('jsonPayload' + jsonPayload);
  return jsonPayload;
}
