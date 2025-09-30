/* Early theme script to apply dark/light based on localStorage or prefers-color-scheme */
"use client"

export default function ThemeScript() {
  return (
    <script
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
;(() => {
  try {
    const stored = localStorage.getItem('tm_theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const theme = stored || (prefersDark ? 'dark' : 'light')
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  } catch {}
})()
        `.trim(),
      }}
    />
  )
}
