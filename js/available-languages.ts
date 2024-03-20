import french from "../lang/french"
import english from "../lang/english"

export const FRENCH = "fr"
export const ENGLISH = "en"
export const defaultLanguage =
  new URLSearchParams(location.search).get("lang") || FRENCH

export const languages = {
  [FRENCH]: french,
  [ENGLISH]: english,
}

window.currentLanguage = defaultLanguage
