import React, { JSXElementConstructor, PropsWithChildren, useEffect, useState } from 'react'

type FadeInPropsT = {
  delay?: number
  transitionDuration?: number
  wrapperTag?: JSXElementConstructor<any>
  childTag?: JSXElementConstructor<any>
  className?: string
  childClassName?: string
  visible?: boolean
  onComplete?: () => any
}

export default function FadeIn(props: PropsWithChildren<FadeInPropsT>) {
  const [maxIsVisible, setMaxIsVisible] = useState(0)
  const transitionDuration = typeof props.transitionDuration === 'number' ? props.transitionDuration : 400
  const delay = typeof props.delay === 'number' ? props.delay : 50
  const WrapperTag = props.wrapperTag || 'div'
  const ChildTag = props.childTag || 'div'
  const visible = typeof props.visible === 'undefined' ? true : props.visible

  useEffect(() => {
    let count = React.Children.count(props.children)

    // Animate all children out
    if (!visible) count = 0
  
    // We're done updating maxVisible, notify when animation is done
    if (count === maxIsVisible) {
      const timeout = setTimeout(() => {
        if (props.onComplete) props.onComplete()
      }, transitionDuration)
      return () => clearTimeout(timeout)
    }

    // Move maxIsVisible toward count
    const increment = count > maxIsVisible ? 1 : -1
    const timeout = setTimeout(() => {
      setMaxIsVisible(maxIsVisible + increment)
    }, delay)
    
    return () => clearTimeout(timeout)
  }, [
    delay,
    maxIsVisible,
    visible,
    transitionDuration,
    props
  ])

  return (
    <WrapperTag className={props.className}>
      {React.Children.map(props.children, (child, i) => {
        return (
          <ChildTag
            className={props.childClassName}
            style={{
              transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
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
