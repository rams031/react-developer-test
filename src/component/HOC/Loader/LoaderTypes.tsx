// Types
type interceptorProps = (WrappedComponent: any) => (props: any) => JSX.Element

interface loaderProps {
    show?: boolean
}

interface errorProps {
    errorOnLoad?: boolean
}

export type { interceptorProps, loaderProps, errorProps }