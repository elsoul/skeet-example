import React from 'react'

type State = {
  error?: Error | null
}

type Props = {
  children: React.ReactNode
  showRetry: React.ReactNode
  logout: () => void
}

export default class DashboardErrorBoundary extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { error: error }
  }

  componentDidCatch(error: Error) {
    console.error(this.state.error)
    console.error(error)
    if (
      error?.message.includes('Signature has expired') ||
      error?.message.includes('You need to login!') ||
      error?.message.includes('Signature verification raised') ||
      error?.message.includes('Invalid or Missing Token')
    ) {
      this.props.logout()
    }
  }

  render() {
    if (this.state.error) {
      return this.props.showRetry
    }
    return this.props.children
  }
}
