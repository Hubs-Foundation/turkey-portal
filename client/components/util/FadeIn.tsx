import React, { JSXElementConstructor, PropsWithChildren, useEffect, useState } from 'react'

type FadeInPropsT = {
  wrapperTag?: JSXElementConstructor<any>
  childTag?: JSXElementConstructor<any>
  className?: string
  childClassName?: string
  visible?: boolean
  onComplete?: () => any
}

export default function FadeIn(props: PropsWithChildren<FadeInPropsT>) {
  const [maxIsVisible, setMaxIsVisible] = useState(0)
  const visible = typeof props.visible === 'undefined' ? true : props.visible
  const WrapperTag = props.wrapperTag || 'div'
  const ChildTag = props.childTag || 'div'

  useEffect(() => {
    let count = React.Children.count(props.children)

    // Animate all children out
    if (!visible) count = 0

    // Done updating maxVisible, notify when animation is done
    if (count === maxIsVisible) {
      const timeout = setTimeout(() => {
        if (props.onComplete) props.onComplete()
      }, 500)
      return () => clearTimeout(timeout)
    }

    // Move maxIsVisible toward count
    const increment = count > maxIsVisible ? 1 : -1
    const timeout = setTimeout(() => {
      setMaxIsVisible((state) => state + increment)
    }, 50)

    return () => clearTimeout(timeout)
  }, [
    maxIsVisible,
    visible,
    props
  ])

  return (
    <WrapperTag className={props.className}>
      {React.Children.map(props.children, (child, i) => {
        return (
          <ChildTag
            className={props.childClassName}
            style={{
              transition: `opacity 500ms, transform 500ms`,
              transform: maxIsVisible > i ? "none" : "translateY(20px)",
              opacity: maxIsVisible > i ? 1 : 0,
            }}
          >
            {child}
          </ChildTag>
        )
      })}
    </WrapperTag>
  )
}
