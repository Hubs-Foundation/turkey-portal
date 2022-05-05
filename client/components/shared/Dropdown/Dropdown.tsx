import { ReactNode, useState } from 'react'
import styles from './Dropdown.module.scss'
import FadeIn from '../../util/FadeIn'

type AlignmentT = 'left' | 'right'
type DropdownProps = {
  cta: ReactNode,
  content: ReactNode,
  classProp?: string,
  alignment?: AlignmentT
}

const Dropdown = ({ cta, content, classProp, alignment }: DropdownProps) => {

  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const handleOpen = () => {
    setIsVisible((state) => !state)
    setIsOpen((state) => !state)
  }

  const handleClose = () => {
    setIsOpen((state) => !state)
    const timeout = setTimeout(() => {
      setIsVisible((state) => !state)
    }, 500)
    clearTimeout(timeout)
  }

  return (
    <div className={`${classProp} ${styles.dropdown_wrapper}`}>
      {/* CTA */}
      <div onClick={isVisible ? handleClose : handleOpen}>
        {cta}
      </div>

      {/* Dropdown Custom Content */}
      <FadeIn visible={isOpen}>
        {isVisible && (
          <div className={`${styles.content_wrapper} ${alignment === 'right' ? 'u-right-absolute' : 'u-left-absolute'}`}>
            {content}
          </div>
        )}
      </FadeIn>

    </div>
  )
}

export default Dropdown