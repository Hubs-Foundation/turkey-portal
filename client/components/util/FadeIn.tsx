import React, { PropsWithChildren, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  classProp: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
  onComplete: PropTypes.func
}

type FadeInPropsT = PropTypes.InferProps<typeof propTypes>

export default function FadeIn(props: PropsWithChildren<FadeInPropsT>) {
  const [maxIsVisible, setMaxIsVisible] = useState(0)
  const { isVisible, classProp, onComplete } = props

  useEffect(() => {
    // Get Number of children to fade in
    let count = React.Children.count(props.children)

    // Animate all children out
    if (!isVisible) count = 0

    // Fire (optional) callback when all visible 
    if (count === maxIsVisible) {
      const timeout = setTimeout(() => {
        if (onComplete) onComplete()
      }, 500)
      return () => clearTimeout(timeout)
    }

    // Increment or decrement MaxIsVisible
    const addOrSubtractOne = count > maxIsVisible ? 1 : -1
    const timeout = setTimeout(() => {
      setMaxIsVisible((state) => state + addOrSubtractOne)
    }, 50)

    return () => clearTimeout(timeout)
  }, [
    maxIsVisible,
    isVisible,
    onComplete,
    props
  ])

  return (
    <div className={classProp ? classProp : ''}>
      {React.Children.map(props.children, (child, i) => {
        return (
          <div
            style={{
              transition: `opacity 500ms, transform 500ms`,
              transform: maxIsVisible > i ? "none" : "translateY(20px)",
              opacity: maxIsVisible > i ? 1 : 0,
            }}
          >
            {child}
          </div>
        )
      })}
    </div>
  )
}
