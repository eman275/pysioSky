type SetState<T> = React.Dispatch<React.SetStateAction<T>>

declare module '*.svg' {
  const content: string
  export default content
}

type ValueOf<T> = T[keyof T]
