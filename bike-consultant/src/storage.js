const BIKE_KEY = "motora_bikes";
const FAV_KEY = "motora_favourites";
const USER_KEY = "motora_user";

export function getLocalBikes() {
  return JSON.parse(localStorage.getItem(BIKE_KEY) || "[]");
}

export function saveLocalBikes(bikes) {
  localStorage.setItem(BIKE_KEY, JSON.stringify(bikes));
}

export function getFavourites() {
  return JSON.parse(localStorage.getItem(FAV_KEY) || "[]");
}

export function saveFavourites(ids) {
  localStorage.setItem(FAV_KEY, JSON.stringify(ids));
}

export function getStoredUser() {
  return JSON.parse(localStorage.getItem(USER_KEY) || "null");
}

export function saveStoredUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearStoredUser() {
  localStorage.removeItem(USER_KEY);
}
