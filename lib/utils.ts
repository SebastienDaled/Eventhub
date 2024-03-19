export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(input: string) {
  return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${input}`
}

export function Timer(fn, t) {
  let timerObj = setInterval(fn, t);

  this.stop = function() {
    if (timerObj) {
      clearInterval(timerObj);
      timerObj = null;
    }
    return this;
  }

  this.start = function() {
    if (!timerObj) {
      this.stop();
      timerObj = setInterval(fn, t);
    }
    return this;
  }

  this.reset = function(newT = t) {
    t = newT;
    return this.stop().start();
  }
}

if (typeof window !== "undefined" && localStorage.getItem('shoppingCart') === null) {
  localStorage.setItem('shoppingCart', "[]")
}

// get site language
export function getSiteLanguage() {
  return process.env.NEXT_PUBLIC_SITE_LANGUAGE
}

export const timeAgo = (date) => {
  const currentDate = new Date();
  const commentDate = new Date(date);
  const timeAgo = currentDate.getTime() - commentDate.getTime();
  const seconds = timeAgo / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = weeks / 4;
  const years = months / 12;

  if (seconds < 60) {
    return `${Math.floor(seconds)} seconds ago`;
  } else if (minutes < 60) {
    return `${Math.floor(minutes)} minutes ago`;
  } else if (hours < 24) {
    return `${Math.floor(hours)} hours ago`;
  } else if (days < 7) {
    return `${Math.floor(days)} days ago`;
  } else if (weeks < 4) {
    return `${Math.floor(weeks)} weeks ago`;
  } else if (months < 12) {
    return `${Math.floor(months)} months ago`;
  } else {
    return `${Math.floor(years)} years ago`;
  }
}

export const decodeToken = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  return JSON.parse(jsonPayload);
};

export const getJWT = (context) => {
  const cookies = context.req.headers.cookie;
  const token = cookies.split(';').filter((cookie) => cookie.includes('token'))
  const jwt = token[0].replace('token=', '');

  return jwt;
}
export const getUid = (context) => {
  const cookies = context.req.headers.cookie;
  const uid = cookies.split(';').filter((cookie) => cookie.includes('uid'))
  const id = uid[0].replace('uid=', '');

  return id;
}

export const getUserIdFromJWT = (jwt) => {
  const decoded = decodeToken(jwt);
  return decoded.drupal.uid;
}