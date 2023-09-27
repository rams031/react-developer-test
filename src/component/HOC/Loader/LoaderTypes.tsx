// Types
type interceptorProps = (WrappedComponent: any) => (props: any) => JSX.Element

interface loaderProps {
    show?: boolean
}

export type { interceptorProps, loaderProps }