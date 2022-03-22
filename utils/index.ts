/**
 * Locks scrolling of the whole page.
 * @param value `true` to lock, `false` to unlock.
 */
export function scrollLock(value: boolean): void {
  document.documentElement.style.overflow = value ? "hidden" : "unset";
}
