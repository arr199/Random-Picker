interface List {
  text: string
  id: string
  selected: boolean
  background: string
}

interface Toaster {
  text: string
  id: string
  type: string

}

declare module '*.svg' {
  const content: string
  export default content
}
