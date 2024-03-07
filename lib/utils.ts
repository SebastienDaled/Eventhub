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